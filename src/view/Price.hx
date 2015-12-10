package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;

class Price {

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(int:Int):Void {

    new JQuery('#contact').find('#price').find('span').text(cast(int));

  }

}
