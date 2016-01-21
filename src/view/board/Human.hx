package src.view.board;

import js.JQuery;

class Human {

  private static var _jArea  : JQuery;
  private static var _jHuman : JQuery;
  private static var _jtalk  : JQuery;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(jArea:JQuery):Void {

    _jArea  = jArea;
    _jHuman = _jArea.find('.human');

    _jHuman.append('<div class="human-talk"></div>');
    _jtalk = _jHuman.find('.human-talk');

    set();
    text();

  }

      private static function set():Void {

        var h : Int = _jtalk.height();
        _jtalk.css({top:-h - 30});

      }

      private static function text():Void {

        var text : String = "あああああ";
        _jtalk.append(wordWrap(text));

      }

      private static function wordWrap(str:String):String {

        return '<p>' + str + '</p>';

      }

}
