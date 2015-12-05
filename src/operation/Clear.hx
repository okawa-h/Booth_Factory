package src.operation;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;

class Clear {

  /* =======================================================================
  Clear Board Object
  ========================================================================== */
  public static function clearBoardObj():Void {

    Manager._jArea.find('p').remove();

  }

}
