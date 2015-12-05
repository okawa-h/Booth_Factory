package src.judge;

import js.JQuery;
import jp.saken.utils.Dom;
import haxe.Json;
import src.Manager;
import src.judge.Judge;

class Log {

  public static var _jPrice:JQuery;

  public static function init(jTarget:JQuery,jPrice:JQuery):Void {

    _jPrice = jPrice;

    var string:String = "";

    for (i in 0 ... jTarget.length) {

      var tex:String = if (i == jTarget.length - 1) '' else '&';
      string += makeObjectParam(jTarget.eq(i)) + tex;
      
    }

    string += '&' + makePriceParam();

    Dom.window.history.replaceState('','','?' + string);

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
  public static function makePriceParam():String {

    var jPrice  = _jPrice.find('span').text();

    return 'price=' + jPrice;

  }

  /* =======================================================================
  Check Url
  ========================================================================== */
  public static function checkUrl():Void {

    var url;
    untyped url = Dom.jWindow[0].location.search;

    if (url.indexOf('?') > -1) {

      var param:String = url.replace('?','');

      //var res = Dom.window.confirm('履歴があります。復元しますか？');
      //if( res == true ) {

        remakeObject(param);

      //}
      
    }

  }

  /* =======================================================================
  Check Url
  ========================================================================== */
  public static function remakeObject(param:String):Void {

    var _param:Array<String> = param.split('&');

    for (i in 0 ... _param.length) {

      var item:Array<String> = _param[i].split('=');

      if (item[0] == "obj") {

        makeHtml(item[1]);
        
      } else if (item[0] == "price") {

        Judge.init();
        Judge.getItemLength();

      }

    }

  }

  private static function makeHtml(string:String) {

    var target:Array<String> = string.split('|');
    var _Data :Dynamic       = Manager._Data;

    for (i in 0 ... _Data.object.length) {
      if (_Data.object[i].id == target[0]) {

        var title:String = target[0];
        var type :String = _Data.object[i].type;
        var price:Int    = _Data.object[i].price;
        var html :String = '<p class="' + title + '"';
        var top  = target[2];
        var left = target[1];
        html += 'style="position:absolute;top:' + top + 'px;left:' + left + 'px"';
        html += 'data-type="' + type + '" data-price="'+ price +'">';
        html += '<img src="files/img/product/icon/' + title + '.png">';
        html += '</p>';

        Manager._jArea.find('#layer-' + type).append(html);

      }
    }

  }

}
