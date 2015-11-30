package src.drop;

import js.JQuery;
import jp.saken.utils.Dom;

class Juge {

  public static var price:Float;

  public static function init(_jPrice:JQuery,_jItem:JQuery):Void {

    _jPrice.on('mousedown',function(event:JqEvent) {
      getPrice(event,_jPrice,_jItem);
    });

  }

  /* =======================================================================
  Get Price
  ========================================================================== */
  public static function getPrice(event:JqEvent,_jPrice:JQuery,_jItem:JQuery):Void {
    trace(_jItem.find('.drop').length);

    var buyItem:JQuery = _jItem.find('.drop');

    // for (i in 0 ... buyItem.length) {

    //   var x:String = buyItem[i].getAttribute('price');

    //   price = price + x;
      
    // }

    trace(price);

  }

}
