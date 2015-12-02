package src.judge;

import js.JQuery;
import jp.saken.utils.Dom;

class Judge {

  public static var _jArea : JQuery;
  public static var _jPrice: JQuery;

  public static function init(jArea:JQuery,jPrice:JQuery):Void {

    _jArea  = jArea;
    _jPrice = jPrice;

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

  }

  /* =======================================================================
  Count Set
  ========================================================================== */
  public static function loop(jItem:JQuery,length:Int):Void {

  	var price:Int = 0;
  	var accessory_length:Int = 0;
  	var banar_length:Int = 0;
  	var paper_length:Int = 0;
  	var jSideL  = new JQuery('#sidemenu-left');
  	var jPrice  = _jPrice.find('span');

  	for (i in 0 ... length) {

  		var type_data:String  = jItem.eq(i).data('type');
  		var price_data:Int = jItem.eq(i).data('price');

  		if (type_data == "accessory") accessory_length++;
  		if (type_data == "banar") banar_length++;
  		if (type_data == "paper") paper_length++;
  		price += price_data;

  	}

  	jSideL.find('#length-accessory').find('.item-length').find('span').text(cast(accessory_length));
  	jSideL.find('#length-banar').find('.item-length').find('span').text(cast(banar_length));
  	jSideL.find('#length-paper').find('.item-length').find('span').text(cast(paper_length));
  	jPrice.text(cast(price));

  }

}
