package src.view;

import js.jquery.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Expo;

class Intro {

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        fadeIn(new JQuery('#header'),0.4);
        fadeLeft(new JQuery('#sidemenu-left'),0.6);
        fadeRight(new JQuery('#sidemenu-right'),0.6);
        fadeUp(new JQuery('#footer'),0.8);
        fadeUp(new JQuery('#mainmenu'),0.8);
        fadeDown(new JQuery('#mainboard'),1);

    }

            /* =======================================================================
            Fade In
            ========================================================================== */
            private static function fadeIn(target:JQuery,i:Float = 0):Void {

                TweenMaxHaxe.set(target,{y: '-50px'});
                TweenMaxHaxe.to(target,1,{opacity:1,y:0,ease:Expo.easeOut,delay:i});

            }

            /* =======================================================================
            Fade Down
            ========================================================================== */
            private static function fadeDown(target:JQuery,i:Float = 0):Void {

                TweenMaxHaxe.set(target,{marginTop: '-50px'});
                TweenMaxHaxe.to(target,1,{opacity:1,marginTop:0,ease:Expo.easeOut,delay:i});

            }

            /* =======================================================================
            Fade Up
            ========================================================================== */
            private static function fadeUp(target:JQuery,i:Float = 0):Void {

                TweenMaxHaxe.set(target,{marginBottom: '-50px'});
                TweenMaxHaxe.to(target,1,{opacity:1,marginBottom:0,ease:Expo.easeOut,delay:i});

            }

            /* =======================================================================
            Fade L
            ========================================================================== */
            private static function fadeLeft(target:JQuery,i:Float = 0):Void {

                TweenMaxHaxe.set(target,{marginLeft: '-50px'});
                TweenMaxHaxe.to(target,1,{opacity:1,marginLeft:0,ease:Expo.easeOut,delay:i});

            }

            /* =======================================================================
            Fade R
            ========================================================================== */
            private static function fadeRight(target:JQuery,i:Float = 0):Void {

                TweenMaxHaxe.set(target,{marginRight: '-50px'});
                TweenMaxHaxe.to(target,1,{opacity:1,marginRight:0,ease:Expo.easeOut,delay:i});

            }

            /* =======================================================================
            On Btn
            ========================================================================== */
            private static function onBtn():Void {

                // var jTar : JQuery = _jBtn.find('span');
                // TweenMaxHaxe.to(jTar,0.4,{css:{rotation:360},repeat:-1,ease:tween.easing.Power0.easeOut});

                // _jBtn.on('mouseleave',function(event:Event) {

                //     TweenMaxHaxe.to(jTar,0,{css:{rotation:0},ease:Expo.easeOut});
                //     _jBtn.unbind('mouseleave');

                // });

            }

}
