package src.animate;

import js.JQuery;
import src.operation.Drag;
import src.animate.Mainmenu;
import src.animate.Title;
import tween.TweenMaxHaxe;
import tween.TimelineMaxHaxe;
import tween.easing.Elastic;
import jp.saken.utils.Dom;

class Animate {

  private static var _jMenu: JQuery;
  private static var _jArea: JQuery;
  private static var _jBtn : JQuery;

  public static function init(jMenu:JQuery,jArea:JQuery):Void {

    _jMenu = jMenu;
    _jArea = jArea;

    //setup();
    Mainmenu.init(_jMenu);
    Title.init();
    // Dom.jWindow.on('click',function(event:JqEvent) {
    //   vibrationItem(Drag._catchTarget);
    // });

  }

  private static function setup():Void {

  	var leftMenu     :JQuery = new JQuery('#sidemenu-left').find('li');
  	var rightMenu    :JQuery = new JQuery('#sidemenu-right').find('div');
  	var rightListMenu:JQuery = new JQuery('#sidemenu-right').find('li');

    TweenMaxHaxe.staggerFromTo(cast(leftMenu), 1 , {x:-300} , {x:0,ease : Elastic.easeInOut,onComplete:function(){
    	TweenMaxHaxe.staggerFromTo(cast(rightMenu), 0.5 , {x:300} , {x:0,ease : Elastic.easeInOut} , 0.2);
    } } , 0.2);

  }

  public static function vibrationItem(target:JQuery):Void {

    untyped var timeline:TimelineMaxHaxe = new TimelineMaxHaxe({repeat:-1});
    untyped timeline.to(target,0.001,{'transform':'rotate(0.4deg) translate(1px,-1px)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(0.8deg) translate(0px,1px)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(0.4deg) translate(-1px,0)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(0deg) translate(0,0)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(-0.4deg) translate(1px,0)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(-0.8deg) translate(0,1px)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(-0.4deg) translate(-1px,-1px)'});
    untyped timeline.to(target,0.001,{'transform':'rotate(0deg) translate(0,0)'});

    target.on('mouseup',function(event:JqEvent) {
      untyped timeline.pause();
      untyped timeline.to(target,0.001,{'transform':'rotate(0deg) translate(0,0)'});
    });

  }
  
}
