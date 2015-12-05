package src.judge;

import js.JQuery;
import jp.saken.utils.Dom;
import src.judge.Log;
import src.operation.Change;
import src.Manager;

class Judge {

  public static var _jArea : JQuery;
  public static var _jPrice: JQuery;

  public static function init():Void {

    _jArea  = Manager._jArea;
    _jPrice = Manager._jPrice;

  	Dom.jWindow.on('mouseup',function(event:JqEvent) {
  		getItemLength();
  	});

  }

  /* =======================================================================
  Get Item Length
  ========================================================================== */
  public static function getItemLength():Void {

  	var jItem:JQuery = _jArea.find('p');
  	var length:Int   = jItem.length;

  	if (length > 0) {
  		loop(jItem,length);
  	}

    Log.init(jItem,_jPrice);

  }

  /* =======================================================================
  Count Set
  ========================================================================== */
  public static function loop(jItem:JQuery,length:Int):Void {

  	var price:Int = 0;
  	var accessory_length:Int = 0;
  	var banar_length:Int = 0;
  	var paper_length:Int = 0;

  	for (i in 0 ... length) {

  		var type_data:String  = jItem.eq(i).data('type');
  		var price_data:Int = jItem.eq(i).data('price');

  		if (type_data == "accessory") accessory_length++;
  		if (type_data == "banar") banar_length++;
  		if (type_data == "paper") paper_length++;
  		price += price_data;

  	}

    trace(accessory_length,banar_length,paper_length);

    Change.changeProductLength(accessory_length,banar_length,paper_length);
  	Change.changePrice(cast(price));

  }

}
