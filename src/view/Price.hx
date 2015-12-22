package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;

class Price {

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(price:Int):Void {

    new JQuery('#contact').find('#price').find('span').text(Std.string(price));

  }

  /* =======================================================================
  Clear
  ========================================================================== */
  public static function clear():Void {

    new JQuery('#contact').find('#price').find('span').text('0');

  }

}
