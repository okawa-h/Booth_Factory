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
	private static var _jTrashArrow : JQuery;
  private static var _Status      : Bool;

  /* =======================================================================
  Init
  ========================================================================== */
  public static function init():Void {

    _jTrash      = new JQuery('#trash');
    _jTrashBox   = _jTrash.find('.trash-box');
    _jTrashArrow = _jTrash.find('.trash-arrow');
    _Status      = false;

  }

  /* =======================================================================
  On Obj
  ========================================================================== */
  public static function onObj(target:JQuery):Void {

    if (judgeOnObj(target)) {

      TweenMaxHaxe.to(_jTrashBox, 1, {scaleX:1.2, scaleY:1.2, ease:Elastic.easeOut});

    } else {

      TweenMaxHaxe.to(_jTrashBox, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});

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

    if (!_Status) {

      _jTrashArrow.hide();
      _jTrashBox.hide();

    }

  }

  /* =======================================================================
  Show
  ========================================================================== */
  public static function show():Void {

    TweenMaxHaxe.set(_jTrashArrow,{y:60});
    _jTrashBox.show();
    _jTrashArrow.show();
    TweenMaxHaxe.to(_jTrashArrow , 0.8 , {y:-30,repeat:-1,yoyo : true,ease: Circ.easeOut});

  }

      /* =======================================================================
      Delete Object
      ========================================================================== */
      private static function deleteObj(target:JQuery):Void {

      	if (judgeOnObj(target)) {

          _Status = true;
          var id : String = target.data('id');
          target.css('z-index','10000');

          TweenMaxHaxe.to(target, 0.2, {scaleX:0.7, scaleY:0.7, ease:Elastic.easeOut});
          TweenMaxHaxe.to(target, 0.3,{y:-30,delay:0.2});
          TweenMaxHaxe.to(target, 0.3,{y:130,delay:0.5,onComplete:function() {

            target.remove();
            Manager.setCounter();
            Mainmenu.clearDrop(id);
            _Status = false;

          }});

          TweenMaxHaxe.to(_jTrashBox, 0.5, {y:15,ease:Elastic.easeIn,delay:0.5});
          TweenMaxHaxe.to(_jTrashBox, 0.8, {y:0,scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1,onComplete:function() {

            if (Manager._DragObj == null) {
              _jTrashBox.hide();
              _jTrashArrow.hide(); 
            }

          }});


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
