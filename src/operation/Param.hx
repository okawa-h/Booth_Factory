package src.operation;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;
import src.view.Board;

class Param {

  private static var _jArea   : JQuery;
  private static var _jAreaObj: JQuery;
  private static var _jPrice  : JQuery;

  public static function init(jArea:JQuery,jAreaObj:JQuery,jPrice:JQuery):Void {

    _jArea    = jArea;
    _jAreaObj = jAreaObj;
    _jPrice   = jPrice;

    remakeObject();

  }

  /* =======================================================================
  Remake Object
  ========================================================================== */
  public static function remakeObject():Void {

    var url = untyped Dom.jWindow[0].location.search;

    if (url.indexOf('?') > -1) {

      var param:String = url.replace('?','');

      //var res = Dom.window.confirm('履歴があります。復元しますか？');
      //if( res == true ) {

        createObject(param);
		    

      //}
      
    }

  } 

		  /* =======================================================================
		  Create Object
		  ========================================================================== */
		  private static function createObject(param:String):Void {

		    var paramArray:Array<String> = param.split('&');
		    var data      :Dynamic       = Manager._Data;

		    for (i in 0 ... paramArray.length) {

		      var item:Array<String> = paramArray[i].split('=');

		      if (item[0] == "obj") {

		        addHtml(item[1],data);
		        
		      }

		    }

		  }

			/* =======================================================================
		  Make HTML
		  ========================================================================== */
		  private static function addHtml(string:String,data:Dynamic) {

		    var target:Array<String> = string.split('|');

		    for (i in 0 ... data.object.length) {
		      if (data.object[i].id == target[0]) {

		        var title:String = target[0];
		        var type :String = data.object[i].type;
		        var price:Int    = data.object[i].price;
		        var top  :Float  = cast(target[2]);
		        var left :Float  = cast(target[1]);
		        var html :String = Create.makeObjHtml(title,top,left,type,price,title);

		        _jArea.find('#layer-' + type).append(html);

		      }
		    }

		  }

  /* =======================================================================
  Make URL Param
  ========================================================================== */
  public static function make(jTarget:JQuery,price:Int):String {

    var param :String = "";

    for (i in 0 ... jTarget.length) {

      var str:String = if (i == jTarget.length - 1) '' else '&';
      param += makeObjectParam(jTarget.eq(i)) + str;
      
    }

    param += '&' + makePriceParam(price);
    return param;

  }

  	  /* =======================================================================
		  Make Object Param
		  ========================================================================== */
		  private static function makeObjectParam(jTarget:JQuery):String {

		    var id:String = jTarget.prop('class');
		    var x :String = untyped jTarget.css('left').replace('px','');
		    var y :String = untyped jTarget.css('top').replace('px','');

		    return 'obj=' + id + '|' + x + '|' + y;

		  }

		  /* =======================================================================
		  Make Price Param
		  ========================================================================== */
		  private static function makePriceParam(price:Int):String {

		    return 'price=' + price;

		  }

  /* =======================================================================
  Change Param
  ========================================================================== */
  public static function change(string:String):Void {

    Dom.window.history.replaceState('','',string);

  }

}
