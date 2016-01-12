package src.view;

import js.JQuery;
import haxe.Http;
import haxe.Json;
import src.Manager;
import src.utils.Html;

class Data {

  private static var _jMenu;
  private static var _callback;

  public static function set(jMenu,callback):Void {

    _jMenu    = jMenu;
    _callback = callback;

    var request : Http = new Http("files/data/data.json");

    request.onError  = function( data:String ){  }
    request.onData   = onData;

    request.request( false );

  }

      private static function onData(data:Dynamic):Void {

      	Manager._Data = Json.parse(data);
        loop(Manager._Data);
        
      }

      private static function loop(data:Dynamic):Void {

        var length        : Int    = data.object.length;
        var accessoryHtml : String = "";
        var bannerHtml    : String = "";
        var paperHtml     : String = "";

        for (i in 0 ... length) {

          var t    : Dynamic = data.object[i];
          var abs  : String  = (t.type == "accessory" || t.type == "clothes") ? t.abs : "";
          var html : String  = Html.getList(t.id,t.type,t.cat,t.icon,t.price,t.bgImg,t.img,t.name,t.length,abs);

          if (t.cat == "paper") {

            paperHtml += html;

          } else if (t.cat == "accessory") {

            accessoryHtml += html;

          } else if (t.cat == "banner") {

            bannerHtml += html;
            
          }
          
        }

        setHTML(accessoryHtml,bannerHtml,paperHtml);

      }

      private static function setHTML(accessoryHtml:String,bannerHtml:String,paperHtml:String):Void {

        _jMenu.find('#sale-accessory').find('.slider').find('ul').append(accessoryHtml);
        _jMenu.find('#sale-banner').find('.slider').find('ul').append(bannerHtml);
        _jMenu.find('#sale-paper').find('.slider').find('ul').append(paperHtml);

        _callback();

      }

}
