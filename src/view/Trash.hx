package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Circ;
import src.Manager;
import src.animate.AnimationTrash;


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

    AnimationTrash.init(_jTrash,_jTrashBox,_jTrashArrow);

  }

  /* =======================================================================
  View
  ========================================================================== */
  public static function view():Void {

    _jTrashBox.fadeIn();
    _jTrashArrow.fadeIn(function() {
    	TweenMaxHaxe.to(_jTrashArrow , 0.5 , {top:"-25%",repeat: -1,yoyo : true,ease: Circ.easeOut});
    });

  }

  /* =======================================================================
  None
  ========================================================================== */
  public static function none(target:JQuery = null):Void {

    if (target == null) {
      _jTrashBox.hide();
    } else {
      AnimationTrash.hide();
    }
    
    _jTrashArrow.hide();

  }

  /* =======================================================================
  Object Delete
  ========================================================================== */
  public static function objDelete(target:JQuery,event:JqEvent):Void {

  	var judge:Bool = judgeDelete(event);
  	if (judge) AnimationTrash.deleteObj(target);

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
