package src.animate;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;

class AnimationTrash {

	private static var _jTrash     :JQuery;
	private static var _jTrashBox  :JQuery;
	private static var _jTrashArrow:JQuery;

  public static function init(jTrash,jTrashBox,jTrashArrow):Void {

    _jTrash      = jTrash;
    _jTrashBox   = jTrashBox;
    _jTrashArrow = jTrashArrow;
    
    	hover();

  }

  private static function hover() {

  	_jTrashBox.on('mouseover',function(event:JqEvent) {
  		TweenMaxHaxe.to(_jTrash, 1, {scaleX:1.3, scaleY:1.3, ease:Elastic.easeOut});
    });

     _jTrashBox.on('mouseleave',function(event:JqEvent) {
  		TweenMaxHaxe.to(_jTrash, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});
    });

  }

  public static function hide() {

    _jTrashBox.delay(3000).hide();

  }

  public static function deleteObj(target:JQuery) {

    TweenMaxHaxe.to(target, 0.6, {scaleX:3.0, scaleY:3.0, ease:Elastic.easeOut,onComplete:function() {
      target.remove();
    }});

  }

}
