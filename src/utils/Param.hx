package src.utils;

import js.JQuery;
import js.html.History;
import jp.saken.utils.Dom;
import src.Manager;
import src.view.Mainmenu;
import src.utils.Html;

class Param {

  private static var _jArea : JQuery;

  public static function init(jArea:JQuery):Void {

    _jArea = jArea;

  }

  /* =======================================================================
  Remake Object
  ========================================================================== */
  public static function remakeObject():Void {

    var url : String = untyped Dom.jWindow[0].location;
        url = Std.string(url);

    if (url.indexOf('?') > -1) {

      var param : Array<String> = url.split('?');

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

		    var paramArray : Array<String> = param.split('&');
		    var length     : Int           = paramArray.length;
		    var data       : Dynamic       = Manager._Data;
		    var color      : String  			 = getColorParam().split('color=').join('');

        var x : Float = 0;

		    for (i in 0 ... length) {

		      var item : Array<String> = paramArray[i].split('=');

          if (item[0].indexOf('_x') > -1) x = Std.parseFloat(item[1]);
		      if (item[0].indexOf('_y') > -1) {

            var id = item[0].split('_');
		        addHtml(id[0],data,color,x,Std.parseFloat(item[1]));
		        
		      }

		    }

		  }

			/* =======================================================================
		  Make HTML
		  ========================================================================== */
		  private static function addHtml(id:String,data:Dynamic,color:String,x:Float,y:Float) {

		    var target : String = id;
		    var length : Int    = data.object.length;
		    var html   : String = "";

		    for (i in 0 ... length) {
		    	
		      if (data.object[i].id == id) {

		        var type  : String = data.object[i].type;
		        var cat   : String = data.object[i].cat;
		        var icon  : String = data.object[i].icon;
		        var price : Int    = data.object[i].price;
		        var top   : Float  = y;
		        var left  : Float  = x;

		        html += Html.getObj(id,top,left,type,cat,price,icon,color);
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

    param += getColorParam();

    for (i in 0 ... length) {

    	if (i == 0) param += "&";

      var str:String = (i == length - 1) ? '' : '&';
      param += getObjectParam(jTarget.eq(i)) + str;
      
    }

    param += '&' + getPriceParam(price);

    return param;

  }

  	  /* =======================================================================
		  Get Object Param
		  ========================================================================== */
		  private static function getObjectParam(jTarget:JQuery):String {

		    var id : String = jTarget.data('id');
		    var x  : String = jTarget.css('left').split('px').join('');
		    var y  : String = jTarget.css('top').split('px').join('');

		    return id + '_x=' + x + '&' + id + '_y=' + y;

		  }

		  /* =======================================================================
		  Get Price Param
		  ========================================================================== */
		  private static function getPriceParam(price:Int):String {

		    return 'price=' + price;

		  }

		  /* =======================================================================
		  Get Color Param
		  ========================================================================== */
		  private static function getColorParam():String {

		  	var color : String = new JQuery('#color-btn').prop('class');
		    return 'color=' + color;

		  }

  /* =======================================================================
  Change Param
  ========================================================================== */
  public static function change(string:String):Void {
  	
    // Dom.window.history.replaceState('','',string);
    untyped History.replaceState('','',string);//ie

  }

  /* =======================================================================
  Get
  ========================================================================== */
  public static function get():History {
  	
  	var param : History = Dom.window.history;
    return param;

  }

  /* =======================================================================
  Get Param Option
  ========================================================================== */
  public static function getParamOption(string:String = 'price'):Dynamic {
  	
  	string += '=';
    var url    : Array<String> = Dom.window.location.toString().split('/');
    var search : String        = url[url.length - 1];
  	var option : Array<String> = search.split(string);
  	var str    : String        = option[1];
  	var param  : String        = "";

  	if (str.indexOf('&') != -1) {

  		option = str.split('&');
  		param  = option[0];

  	} else {

  		param = str;
  		
  	}

    return param;
  }

}
