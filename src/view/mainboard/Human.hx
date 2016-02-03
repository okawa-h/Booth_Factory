package src.view.mainboard;

import js.JQuery;
import haxe.Timer;
import tween.TweenMaxHaxe;
import tween.easing.Expo;

class Human {

    private static var _jMainboard : JQuery;
    private static var _jHuman     : JQuery;
    private static var _jTalk      : JQuery;
    private static var _jText      : JQuery;
    private static var _timer      : Timer;
    private static var _SPEED      : Float;
    private static var _INTERVAL   : Int;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init(jMainboard:JQuery):Void {

        _jMainboard = jMainboard;
        _jHuman     = _jMainboard.find('.human');
        _jHuman.append('<div class="human-talk"><p></p></div>');
        _jTalk      = _jHuman.find('.human-talk');
        _jText      = _jTalk.find('p');

        _SPEED  = 0.08;

        talk('ようこそ',1000);
        _INTERVAL  = 8000;

    }

    /* =======================================================================
    Talk
    ========================================================================== */
    public static function talk(str:String,delay:Int = 0):Void {

        return;

        _jText.children().remove();

        if (str == "quiet") {

            _jTalk.hide();
            return;

        }

        _jTalk.show();
        setSize(str);

        var timer : Timer = new Timer(delay);
        timer.run = function() {

            typing(str);
            timer.stop();

        };

    }

    /* =======================================================================
    Comment
    ========================================================================== */
    public static function comment(jTarget:JQuery,str:String):Void {

        return;

        // _timer.stop();
        talk(str);

        jTarget.on('mouseleave',function(event:JqEvent) {

            talk("quiet");
            _jText.children().remove();
            // _timer = new Timer(_INTERVAL);
            // _timer.run = randamtalk;
            jTarget.unbind('mouseleave');

        });

    }

            /* =======================================================================
            Randam Talk
            ========================================================================== */
            private static function randamtalk():Void {

                var text : Array<String> = talkArray();
                var num  : Int  = Math.floor(Math.random() * text.length);
                talk(text[num]);

            }

            /* =======================================================================
            set
            ========================================================================== */
            private static function setSize(str:String):Void {

                var linefeed  : Int = 0;
                var lineHight : Int = 20;
                var padding   : Int = -30;
                var arrow     : Int = -45;

                if (str.indexOf('/') > -1) linefeed = str.split('/').length - 1;

                _jTalk.css({ top: padding + -(linefeed * lineHight) + arrow + 'px'});

            }

            /* =======================================================================
            Typing
            ========================================================================== */
            private static function typing(str:String):Void {

                var array : Array<String> = str.split('');

                for (i in 0 ... array.length) {

                    var text : String = wordWrap(array[i]);
                    if (array[i] == "/") text = text.split('<span>/</span>').join('<br>');
                    _jText.append(text);
                    var jSpan  : JQuery = _jText.find('span');
                    var length : Int    = jSpan.length;

                    for (i in 0 ... length) {
                        _jText.find('span').eq(i).hide();

                        TweenMaxHaxe.to(_jText.find('span').eq(i),0,{delay:_SPEED * i,
                            onComplete:function() {

                                _jText.find('span').eq(i).show();

                            }
                        });
                        
                    }

                }

            }

            /* =======================================================================
            Word Wrap
            ========================================================================== */
            private static function wordWrap(str:String):String {

                return '<span>' + str + '</span>';

            }

            /* =======================================================================
            Talk Array
            ========================================================================== */
            private static function talkArray():Array<String> {

                var array : Array<String> = [
                    "おはよう",
                    "安くない？",
                    "やっす",
                    "現在の金額は" + new JQuery('#contact').find('#price').text() + "です。"
                ];

                return array;

            }

}
