package src.view.board;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Expo;
import haxe.Timer;

class Human {

  private static var _jArea  : JQuery;
  private static var _jHuman : JQuery;
  private static var _jTalk  : JQuery;
  private static var _jText  : JQuery;
  private static var _SPEED  : Float;
  private static var _Timer  : Timer;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(jArea:JQuery):Void {

    _SPEED  = 0.08;
    _jArea  = jArea;
    _jHuman = _jArea.find('.human');

    _jHuman.append('<div class="human-talk"><p></p></div>');
    _jTalk  = _jHuman.find('.human-talk');
    _jText  = _jTalk.find('p');

    _Timer = new Timer(8000);
    _Timer.run = randamtalk;

  }

  public static function talk(str:String,delay:Int = 0):Void {

    _jText.children().remove();

    if (str == "quiet") {

      _jTalk.hide();
      return;

    }

    _jTalk.show();
    set(str);

    var timer : Timer = new Timer(delay);
    timer.run = function() {

      typing(str);
      timer.stop();

    };

  }

  public static function comment(jTarget:JQuery,str:String):Void {

    _Timer.stop();
    talk(str);

    jTarget.on('mouseleave',function(event:JqEvent) {

      talk("quiet");
      _Timer = new Timer(8000);
      _Timer.run = randamtalk;
      jTarget.unbind('mouseleave');

    });

  }

      private static function randamtalk():Void {

        var text : Array<String> = talkArray();
        var num  : Int  = Math.floor(Math.random() * text.length);
        talk(text[num]);

      }

      private static function set(str:String):Void {

        var linefeed  : Int = 0;
        var lineHight : Int = 20;
        var padding   : Int = -30;
        var arrow     : Int = -45;

        if (str.indexOf('/') > -1) linefeed = str.split('/').length - 1;

        _jTalk.css({ top: padding + -(linefeed * lineHight) + arrow + 'px'});

      }


      private static function typing(str:String):Void {

        var array : Array<String> = str.split('');

        for (i in 0 ... array.length) {

          var text : String = wordWrap(array[i]);

          TweenMaxHaxe.to(_jText,0,{delay:_SPEED * i,
            onComplete:function() {

              if (array[i] == "/") text = text.split('<span>/</span>').join('<br>');
              _jText.append(text);

            }
          });

        }

      }

      private static function wordWrap(str:String):String {

        return '<span>' + str + '</span>';

      }

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
