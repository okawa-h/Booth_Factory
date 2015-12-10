package src.view;

import js.JQuery;
import jp.saken.utils.Dom;

class Board {

  private static var _jArea   : JQuery;
  private static var _jAreaObj: JQuery;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(jArea:JQuery,jAreaObj:JQuery):Array<Int> {

    _jArea    = jArea;
  	_jAreaObj = jAreaObj;

    return count();
  }

  /* =======================================================================
  Clear Board Object
  ========================================================================== */
  public static function clear():Void {

    _jArea.find('p').remove();

  }

  /* =======================================================================
  Count Board Object
  ========================================================================== */
  public static function count():Array<Int> {

  	var jAreaObj:JQuery     = _jArea.find('p');
  	var length  :Int        = untyped jAreaObj.length;
  	var array   :Array<Int> = [0,0,0,0];

  	if (length > 0) {

  		array = loop(jAreaObj,length);

  	}

    return array;
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

		  		var typeData:String  = jItem.eq(i).data('type');
		  		var priceData:Int = jItem.eq(i).data('price');

		  		if (typeData == "accessory") accessoryLength++;
		  		if (typeData == "banar") banarLength++;
		  		if (typeData == "paper") paperLength++;
		  		price += priceData;

		  	}

		  	return [accessoryLength,banarLength,paperLength,price];
		  }

}
