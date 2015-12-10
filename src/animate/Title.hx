package src.animate;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Circ;

class Title {

  private static var _jTitle: JQuery;

  public static function init():Void {

  	_jTitle = new JQuery('#header').find('h1');
  	view();

  }

  private static function view():Void {

  	TweenMaxHaxe.to(_jTitle , 0.5 , {top:"-50px",repeat: 3,yoyo : true,ease: Circ.easeOut});


  }
  
}
