package src.operation;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;
import src.view.Mainmenu;

class Param {

  private static var _jArea : JQuery;

  public static function init(jArea:JQuery):Void {

    _jArea    = jArea;

  }

  /* =======================================================================
  Remake Object
  ========================================================================== */
  public static function remakeObject():Void {

    var url = untyped Dom.jWindow[0].location;
        url = Std.string(url);

    if (url.indexOf('?') > -1) {

      var param:Array<String> = url.split('?');

      //var res = Dom.window.confirm('履歴があります。復元しますか？');
      //if( res == true ) {

        createObject(param[1]);

      //}
      
    }

  } 

		  /* =======================================================================
		  Create Object
		  ========================================================================== */
		  private static function createObject(param:String):Void {

		    var paramArray:Array<String> = param.split('&');
		    var length    :Int           = paramArray.length;
		    var data      :Dynamic       = Manager._Data;

		    for (i in 0 ... length) {

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

		    var target:Array<String> = string.split('-');
		    var length:Int    = data.object.length;
		    var html  :String = "";
		    var id    :String = "";

		    for (i in 0 ... length) {
		    	
		      if (data.object[i].id == target[0]) {

		        id = target[0];
		        var type :String = data.object[i].type;
		        var cat  :String = data.object[i].cat;
		        var icon :String = data.object[i].icon;
		        var price:Int    = data.object[i].price;
		        var top  :Float  = Std.parseFloat(target[2]);
		        var left :Float  = Std.parseFloat(target[1]);
		        html += Create.makeObjHtml(id,top,left,type,cat,price,icon);
		        Mainmenu.addDrop(id);

		      }
		    }

		    _jArea.find('.board').append(html);

		  }

  /* =======================================================================
  Make URL Param
  ========================================================================== */
  public static function make(jTarget:JQuery,length:Int,price:Int):String {

    var param :String = "";

    for (i in 0 ... length) {

      var str:String = (i == length - 1) ? '' : '&';
      param += makeObjectParam(jTarget.eq(i)) + str;
      
    }

    param += '&' + makePriceParam(price);

    return param;

  }

  	  /* =======================================================================
		  Make Object Param
		  ========================================================================== */
		  private static function makeObjectParam(jTarget:JQuery):String {

		    var id:String = jTarget.data('id');
		    var x :String = jTarget.css('left').split('px').join('');
		    var y :String = jTarget.css('top').split('px').join('');

		    return 'obj=' + id + '-' + x + '-' + y;

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
  	
    // Dom.window.history.replaceState('','',string);
    untyped History.replaceState('','',string);//ie

  }

}
