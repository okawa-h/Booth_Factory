package src.view;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Quart;
import tween.easing.Expo;

class Intro {

    private static var _jIntro : JQuery;
    private static var _jTtl   : JQuery;
    private static var _jLoad  : JQuery;
    private static var _jMater : JQuery;

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        var introSwitch : Bool = false;

        _jIntro = new JQuery('#intro');
        _jTtl   = _jIntro.find('h1');
        _jLoad  = _jIntro.find('.intro-metar');
        _jMater = _jLoad.find('span');

        if (introSwitch) {

            timeline();

        } else {

            hide();
            domEffect();

        }

    }

        /* =======================================================================
        Time Line
        ========================================================================== */
        private static function timeline():Void {

            TweenMaxHaxe.set(_jTtl,{opacity:0,y:-50});
            TweenMaxHaxe.to(_jTtl,2,{opacity:1,y:0,ease:Expo.easeOut,delay:0});

            TweenMaxHaxe.set(_jLoad,{y:-50});
            TweenMaxHaxe.to(_jLoad,1.8,{opacity:1,y:0,ease:Expo.easeOut,delay:0.4});
            TweenMaxHaxe.to(_jMater,1.5,{width:_jLoad.width(),ease:Quart.easeOut,delay:1.4,
                onComplete:function() {

                    _jIntro.fadeOut(1000,function() {

                        hide();
                        domEffect();

                    });
                }
            });

        }

            /* =======================================================================
            hide intro
            ========================================================================== */
            private static function hide():Void {

                _jIntro.hide();

            }

            /* =======================================================================
            Dom Effect
            ========================================================================== */
            private static function domEffect():Void {

                fadeIn(new JQuery('#header'));
                fadeUp(new JQuery('#footer'),0.4);
                fadeUp(new JQuery('#mainmenu'),0.4);
                fadeLeft(new JQuery('#sidemenu-left'),0.2);
                fadeRight(new JQuery('#sidemenu-right'),0.2);
                fadeDown(new JQuery('#mainboard'),0.6);

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

}
