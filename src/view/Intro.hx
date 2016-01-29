package src.view;

import js.JQuery;
import jp.saken.utils.Dom;

class Intro {

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        var input  : Array<Int> = [];
        var konami : Array<Int> = [38,38,40,40,37,39,37,39,66,65];

        Dom.jWindow.on('keyup',function(event:JqEvent) {

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

                }

}
