package src.operation;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;

class Change {

  /* =======================================================================
  Change URL Param
  ========================================================================== */
  public static function changeURLParam(string:String):Void {

    Dom.window.history.replaceState('','',string);

  }

  /* =======================================================================
  Change Price
  ========================================================================== */
  public static function changePrice(int:Int):Void {

    Manager._jPrice.find('span').text(cast(int));

  }

  /* =======================================================================
  Change Product Length
  ========================================================================== */
  public static function changeProductLength(accessory_length:Int,banar_length:Int,paper_length:Int):Void {

    Manager._lengthAccessory.text(cast(accessory_length));
    Manager._lengthBanar.text(cast(banar_length));
    Manager._lengthPaper.text(cast(paper_length));

  }

}
