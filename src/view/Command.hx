package src.view;

import js.jquery.JQuery;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Circ;

class Intro {

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        var input  : Array<Int> = [];
        var konami : Array<Int> = [38,38,40,40,37,39,37,39,66,65];

        Dom.jWindow.on('keyup',function(event:Event) {

            input.push(event.keyCode);
            var arrayStr : String = input.join('');
            if (arrayStr.indexOf(konami.join('')) >= 0) {

                input = [];
                changeMouse();
                
            }

        });

    }

                /* =======================================================================
                himitu
                ========================================================================== */
                private static function changeMouse():Void {

                    Dom.jBody.addClass('secretMode');
                    TweenMaxHaxe.set(Dom.jBody , {scaleX:0.9, scaleY:0.9});
                    TweenMaxHaxe.to(Dom.jBody , 0.8 , {scaleX:1.1, scaleY:1.1,repeat:-1,yoyo : true,ease: Circ.easeOut});

                }

}
