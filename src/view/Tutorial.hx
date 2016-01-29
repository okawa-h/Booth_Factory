package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Quart;
import tween.easing.Expo;

class Tutorial {

    private static var _jTutorial : JQuery;
    private static var _jTtl      : JQuery;
    private static var _jBox      : JQuery;
    private static var _jImg      : JQuery;
    private static var _jText     : JQuery;
    private static var _jBtn      : JQuery;

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        _jTutorial = new JQuery('#tutorial');
        _jTtl      = _jTutorial.find('h1');
        _jBox      = _jTutorial.find('.tutorial');
        _jImg      = _jBox.find('.tutorial-img');
        _jText     = _jBox.find('.tutorial-text');
        _jBtn      = _jTutorial.find('.start-btn');

        timeline();

        Dom.jWindow.on('keydown',function(event:JqEvent){

            if (event.keyCode == 32) {
                _jBtn.mousedown();
                _jBtn.mouseover();
            }

        });

        Dom.jWindow.on('touchstart',function(event:JqEvent){

            hide();
            Dom.jWindow.unbind('touchstart');

        });

        _jBtn.on('mousedown',function(event:JqEvent) {

            hide();
            Dom.jWindow.unbind('keydown');

        });

        _jBtn.on('mouseover',function(event:JqEvent) {

            onBtn();

        });

    }

        /* =======================================================================
        Time Line
        ========================================================================== */
        private static function timeline():Void {

            TweenMaxHaxe.set(_jTtl,{y:-50});
            TweenMaxHaxe.to(_jTtl,2,{opacity:1,y:0,ease:Expo.easeOut,delay:0});

            TweenMaxHaxe.set(_jImg,{y:-50});
            TweenMaxHaxe.to(_jImg,1.8,{opacity:1,y:0,ease:Expo.easeOut,delay:0.4});
            TweenMaxHaxe.set(_jText,{y:-50});
            TweenMaxHaxe.to(_jText,1.8,{opacity:1,y:0,ease:Expo.easeOut,delay:0.8});
            TweenMaxHaxe.set(_jBtn,{y:-50});
            TweenMaxHaxe.to(_jBtn,1.8,{opacity:1,y:0,ease:Expo.easeOut,delay:1.2});

        }

            /* =======================================================================
            Hide
            ========================================================================== */
            private static function hide():Void {

                TweenMaxHaxe.to(_jTutorial,20,{y:100,ease:Expo.easeOut});
                _jTutorial.fadeOut(1000,function() {

                    _jTutorial.remove();
                    domEffect();

                });

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

            /* =======================================================================
            On Btn
            ========================================================================== */
            private static function onBtn():Void {

                var jTar : JQuery = _jBtn.find('span');
                TweenMaxHaxe.to(jTar,1,{css:{rotation:360},ease:Expo.easeOut});

                _jBtn.on('mouseleave',function(event:JqEvent) {

                    TweenMaxHaxe.to(jTar,1,{css:{rotation:0},ease:Expo.easeOut});
                    _jBtn.unbind('mouseleave');

                });

            }

}
