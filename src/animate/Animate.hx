package src.animate;

import js.JQuery;
import src.operation.Drag;
import src.animate.Title;
import tween.TweenMaxHaxe;
import tween.TimelineMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Expo;
import jp.saken.utils.Dom;

class Animate {

  private static var _jMenu: JQuery;
  private static var _jArea: JQuery;
  private static var _jBtn : JQuery;

  private static var _timeline: TimelineMaxHaxe;

  public static function init(jMenu:JQuery,jArea:JQuery):Void {

    _jMenu = jMenu;
    _jArea = jArea;

    //setup();
    // Title.init();

  }

      /* =======================================================================
      Set Up
      ========================================================================== */
      private static function setup():Void {

      	var leftMenu     :JQuery = new JQuery('#sidemenu-left').find('li');
      	var rightMenu    :JQuery = new JQuery('#sidemenu-right').find('div');
      	var rightListMenu:JQuery = new JQuery('#sidemenu-right').find('li');

        TweenMaxHaxe.staggerFromTo(cast(leftMenu), 1 , {x:-300} , {x:0,ease : Elastic.easeInOut,
          onComplete:function(){

        	  TweenMaxHaxe.staggerFromTo(cast(rightMenu), 0.5 , {x:300} , {x:0,ease : Elastic.easeInOut} , 0.2);
            
          }
        }, 0.2);

      }

  /* =======================================================================
  Vibration Obj
  ========================================================================== */
  public static function vibrationObj(target:JQuery):Void {

    _timeline = new TimelineMaxHaxe({repeat:-1})
    .to(target,0.001,{'transform':'rotate(0.4deg) translate(1px,-1px)'},'')
    .to(target,0.001,{'transform':'rotate(0.8deg) translate(0px,1px)'},'')
    .to(target,0.001,{'transform':'rotate(0.4deg) translate(-1px,0)'},'')
    .to(target,0.001,{'transform':'rotate(0deg) translate(0,0)'},'')
    .to(target,0.001,{'transform':'rotate(-0.4deg) translate(1px,0)'},'')
    .to(target,0.001,{'transform':'rotate(-0.8deg) translate(0,1px)'},'')
    .to(target,0.001,{'transform':'rotate(-0.4deg) translate(-1px,-1px)'},'')
    .to(target,0.001,{'transform':'rotate(0deg) translate(0,0)'},'');

  }

  /* =======================================================================
  Stop Timeline
  ========================================================================== */
  public static function stopTimeline(target:JQuery):Void {

    _timeline.pause();
    _timeline.to(target,0.001,{'transform':'rotate(0deg) translate(0,0)'},'');

  }

  /* =======================================================================
  Hover
  ========================================================================== */
  public static function hoverObject(_jAreaObj:JQuery):Void {

    _jAreaObj.on('mouseover',function(event:JqEvent) {

      TweenMaxHaxe.to(JQuery.cur, 1, {scaleX:1.05, scaleY:1.05, ease:Elastic.easeOut});

    });

    _jAreaObj.on('mouseleave',function(event:JqEvent) {

      TweenMaxHaxe.to(JQuery.cur, 0, {scaleX:1, scaleY:1, ease:Expo.easeOut});

    });

  }
  
}
