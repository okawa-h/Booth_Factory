package src.judge;

import js.JQuery;
import jp.saken.utils.Dom;

class Log {

  public static var _jPrice:JQuery;

  public static function init(jTarget:JQuery,jPrice:JQuery):Void {

    _jPrice = jPrice;

    var string:String = "";

    for (i in 0 ... jTarget.length) {

      var tex:String = if (i == jTarget.length - 1) '' else '&';
      string += makeObjectParam(jTarget.eq(i)) + tex;
      
    }

    string += '&' + makePriceParam();

    Dom.window.history.replaceState('','','?' + string);

  }

  /* =======================================================================
  Make Object Param
  ========================================================================== */
  private static function makeObjectParam(jTarget:JQuery):String {

    var id:String = jTarget.prop('class');
    var x :String = untyped jTarget.css('left').replace('px','');
    var y :String = untyped jTarget.css('top').replace('px','');

    return 'obj=' + id + '|' + x + '|' + y;

  }

  /* =======================================================================
  Make Price Param
  ========================================================================== */
  public static function makePriceParam():String {

    var jPrice  = _jPrice.find('span').text();

    return 'price=' + jPrice;

  }

}
