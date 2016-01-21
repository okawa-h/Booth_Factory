package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Circ;
import tween.easing.Elastic;
import src.Manager;
import src.view.mainmenu.Mainmenu;


class Trash {

	private static var _jTrash      : JQuery;
	private static var _jTrashBox   : JQuery;
  private static var _jTrashFront : JQuery;
	private static var _jTrashArrow : JQuery;
  private static var _jTrashBg    : JQuery;
  private static var _ArrowAnimate: TweenMaxHaxe;
  private static var _isGrabbed   : Bool;

  /* =======================================================================
  Init
  ========================================================================== */
  public static function init():Void {

    _jTrash      = new JQuery('#trash');
    _jTrashBox   = _jTrash.find('.trash-box');
    _jTrashFront = _jTrash.find('.trash-front');
    _jTrashArrow = _jTrash.find('.trash-arrow');
    _jTrashBg    = _jTrash.find('.trash-bg');
    _isGrabbed      = false;

  }

  /* =======================================================================
  On Obj
  ========================================================================== */
  public static function onObj(target:JQuery):Void {

    if (judgeOnObj(target)) {

      target.css({opacity:'0'});
      TweenMaxHaxe.to(_jTrashBox, 1, {scaleX:1.4, scaleY:1.4, ease:Elastic.easeOut});
      TweenMaxHaxe.to(_jTrashFront, 1, {scaleX:1.4, scaleY:1.4, ease:Elastic.easeOut});
      TweenMaxHaxe.to(_jTrashBg,1,{scaleX:0.95, scaleY:0.95, ease:Elastic.easeOut});

    } else {

      target.css({opacity:'1'});
      TweenMaxHaxe.to(_jTrashBox, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});
      TweenMaxHaxe.to(_jTrashFront, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});
      TweenMaxHaxe.to(_jTrashBg,1,{scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});

    }

  }

  /* =======================================================================
  Leave Obj
  ========================================================================== */
  public static function leaveObj(target:JQuery):Void {

    deleteObj(target);

  }

  /* =======================================================================
  Hide
  ========================================================================== */
  public static function hide():Void {

    if (!_isGrabbed) {

      TweenMaxHaxe.to(_jTrashArrow,0.05,{y:60,
        onComplete:function() {

          _jTrashArrow.hide();
          TweenMaxHaxe.set(_jTrashArrow,{y:0});

        }
      });

      TweenMaxHaxe.to(_jTrashFront,0.05,{y:60,
        onComplete:function() {

          _jTrashFront.hide();
          TweenMaxHaxe.set(_jTrashFront,{y:0});

        }
      });

      TweenMaxHaxe.to(_jTrashBox,0.05,{y:60,
        onComplete:function() {

          _jTrashBox.hide();
          _jTrashBg.stop().fadeOut(100);
          TweenMaxHaxe.set(_jTrashBox,{y:0});
          if (_ArrowAnimate != null) _ArrowAnimate.pause(0);

        }
      });

    }

  }

  /* =======================================================================
  Show
  ========================================================================== */
  public static function show():Void {

    TweenMaxHaxe.set(_jTrashArrow,{y:60});

    _jTrashArrow.show();
    _jTrashBox.show();
    _jTrashFront.show();
    _jTrashBg.stop().fadeIn(100);

    TweenMaxHaxe.to(_jTrashBox,0.05,{y:-30,
      onComplete:function() {

        TweenMaxHaxe.to(_jTrashBox,0.05,{y:0});

      }
    });

    TweenMaxHaxe.to(_jTrashFront,0.05,{y:-30,
      onComplete:function() {

        TweenMaxHaxe.to(_jTrashFront,0.05,{y:0});

      }
    });

    //TweenMaxHaxe.to(_jTrashBg,0.8,{y:10,x:10,width:180,height:180,repeat:-1,yoyo : true});

    _ArrowAnimate = TweenMaxHaxe.to(_jTrashArrow , 0.8 , {y:30,repeat:-1,yoyo : true,ease: Circ.easeOut});

  }

      /* =======================================================================
      Delete Object
      ========================================================================== */
      private static function deleteObj(target:JQuery):Void {

      	if (judgeOnObj(target)) {

          _isGrabbed = true;
          var id : String = target.data('id');
          target.css({'z-index':'3000'}).css({opacity:'1'});

          var trashW : Int = _jTrashBox.width();
          if (trashW < target.width()) {
            //target.find('img').css({'width':'100%'});
            TweenMaxHaxe.to(target, 0.2, {scaleX:0.6, scaleY:0.7});
            //TweenMaxHaxe.to(target, 0.2, {width:trashW - 10});
          }

          var trashTop : Int = _jTrashBox.offset().top;
          var trashBtm : Int = trashTop + _jTrashBox.height();
          var tarBtm   : Int = target.offset().top + target.height();
          var btmDiff  : Int = trashBtm - tarBtm;
          var top      : Int = -200 - btmDiff;

          var left : Float = target.parent().width()/2 - target.width()/2;
          TweenMaxHaxe.to(target, 0.2,{y: top,left: left,delay:0.2});
          TweenMaxHaxe.to(target, 0.1,{y: 0,delay:0.5,
            onComplete:function() {

              target.remove();
              Manager.setCounter();
              Mainmenu.clearDrop(id);
              _isGrabbed = false;

            }
          });

          TweenMaxHaxe.to(_jTrashBox, 0.5, {y:15,ease:Elastic.easeIn,delay:0.4});
          TweenMaxHaxe.to(_jTrashFront, 0.5, {y:15,ease:Elastic.easeIn,delay:0.4});
          TweenMaxHaxe.to(_jTrashBg, 1,{scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1});
          TweenMaxHaxe.to(_jTrashFront, 0.8, {y:0,scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1});
          TweenMaxHaxe.to(_jTrashBox, 0.8, {y:0,scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1,
            onComplete:function() {

              if (Manager._DragObj == null) {

                hide();

              }

            }
          });


        }
      }

  /* =======================================================================
  Object Delete
  ========================================================================== */
  public static function judgeOnObj(target:JQuery):Bool {

  	var y : Float = target.offset().top;
    var h : Float = y + target.height();
  	var x : Float = target.offset().left;
    var w : Float = x + target.width();

    var top    : Float = _jTrashBox.offset().top;
    var left   : Float = _jTrashBox.offset().left;
    var bottom : Float = top + _jTrashBox.height();
    var right  : Float = left + _jTrashBox.width();

    var judge  : Bool = ( top < h && left < w && bottom > y && right > x ) ? true : false;

    return judge;
  }

}
