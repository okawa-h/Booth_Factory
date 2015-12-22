package src.view;

import js.JQuery;
import jp.saken.utils.Dom;

class Board {

  private static var _jArea   : JQuery;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(jArea:JQuery):Void {

    _jArea = jArea;

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

  	var jAreaObj   :JQuery     = _jAreaObj;
  	var lengthArray:Array<Int> = [0,0,0,0];

  	if (length > 0) {

  		lengthArray = loop(jAreaObj,length);

  	}

    return lengthArray;
  }

		  /* =======================================================================
		  Count Set
		  ========================================================================== */
		  private static function loop(jItem:JQuery,length:Int):Array<Int> {

		  	var price          :Int = 0;
		  	var accessoryLength:Int = 0;
		  	var banarLength    :Int = 0;
		  	var paperLength    :Int = 0;

		  	for (i in 0 ... length) {

		  		var typeData :String = jItem.eq(i).data('cat');
		  		var priceData:Int    = jItem.eq(i).data('price');

		  		if (typeData == "accessory") accessoryLength++;
		  		if (typeData == "banar") banarLength++;
		  		if (typeData == "paper") paperLength++;
		  		price += priceData;

		  	}

		  	return [accessoryLength,banarLength,paperLength,price];
		  }

}
