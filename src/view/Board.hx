package src.view;

import js.JQuery;
import src.view.board.Human;

class Board {

  private static var _jArea : JQuery;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(jArea:JQuery):Void {

    _jArea = jArea;
    Human.init(_jArea);

  }

  /* =======================================================================
  Clear Board Object
  ========================================================================== */
  public static function clear():Void {

    _jArea.find('.object').remove();

  }

  /* =======================================================================
  Count Board Object
  ========================================================================== */
  public static function count(_jAreaObj:JQuery,length:Int):Array<Int> {

  	var jAreaObj    : JQuery     = _jAreaObj;
  	var lengthArray : Array<Int> = [0,0,0,0];

  	if (length > 0) {

  		lengthArray = loop(jAreaObj,length);

  	}

    return lengthArray;
  }

		  /* =======================================================================
		  Count Set
		  ========================================================================== */
		  private static function loop(jItem:JQuery,length:Int):Array<Int> {

		  	var price           : Int = 0;
		  	var accessoryLength : Int = 0;
		  	var bannerLength    : Int = 0;
		  	var paperLength     : Int = 0;

		  	for (i in 0 ... length) {

		  		var catData   : String = jItem.eq(i).data('cat');
		  		var priceData : Int    = jItem.eq(i).data('price');

		  		if (catData == "accessory") accessoryLength++;
		  		if (catData == "banner") bannerLength++;
		  		if (catData == "paper") paperLength++;
		  		price += priceData;

		  	}

		  	return [accessoryLength,bannerLength,paperLength,price];
		  }

}
