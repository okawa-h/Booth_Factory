package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Circ;
import tween.easing.Elastic;
import src.Manager;
import src.view.Mainmenu;


class Trash {

	private static var _jTrash     :JQuery;
	private static var _jTrashBox  :JQuery;
	private static var _jTrashArrow:JQuery;

  /* =======================================================================
  Init
  ========================================================================== */
  public static function init():Void {

    _jTrash      = new JQuery('#trash');
    _jTrashBox   = _jTrash.find('.trash-box');
    _jTrashArrow = _jTrash.find('.trash-arrow');

    _jTrashBox.on('mouseover',function(event:JqEvent) {

      TweenMaxHaxe.to(_jTrash, 1, {scaleX:1.2, scaleY:1.2, ease:Elastic.easeOut});

      untyped _jTrashBox.off('mouseup');

      _jTrashBox.on('mouseup',function(event:JqEvent) {

        deleteObj(Manager._DragObj,event);

      });

    });

     _jTrashBox.on('mouseleave',function(event:JqEvent) {

      TweenMaxHaxe.to(_jTrash, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});

    });

  }

  /* =======================================================================
  View
  ========================================================================== */
  public static function show():Void {

    _jTrashBox.show();
    _jTrashArrow.show(function() {
    	//TweenMaxHaxe.to(_jTrashArrow , 0.5 , {top:"-25%",repeat: -1,yoyo : true,ease: Circ.easeOut});
    });

  }

  /* =======================================================================
  None
  ========================================================================== */
  public static function hide(target:JQuery = null):Void {

    if (target == null) {

      _jTrashBox.hide();

    } else {

      _jTrashBox.delay(3000).hide();

    }
    
    _jTrashArrow.hide();

  }

  /* =======================================================================
  Delete Object
  ========================================================================== */
  public static function deleteObj(target:JQuery,event:JqEvent):Void {

  	var judge:Bool = judgeDelete(event);
    
  	if (judge) {

      var id : String = target.data('id');
      Mainmenu.clearDrop(id);

      //TweenMaxHaxe.to(target, 0.6, {scaleX:2.0, scaleY:2.0, ease:Elastic.easeOut,onComplete:function() {
        target.remove();
      //}});

    }

  }

		  /* =======================================================================
		  Object Delete
		  ========================================================================== */
		  private static function judgeDelete(event:JqEvent):Bool {

		  	var y:Float = 0;
		  	var x:Float = 0;

		  	untyped y = event.clientY;
		  	untyped x = event.clientX;

		    var top   :Float = _jTrashBox.offset().top;
		    var left  :Float = _jTrashBox.offset().left;
		    var bottom:Float = top + _jTrashBox.height();
		    var right :Float = left + _jTrashBox.width();

		    var judge = if (y > top && bottom > y && x > left && right > x ) true else false;

		    return judge;
		  }

}
