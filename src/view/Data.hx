package src.view;

import js.JQuery;
import haxe.Http;
import haxe.Json;
import src.Manager;
import src.operation.Create;

class Data {

  private static var _callback;
  private static var _jMenu;

  public static function get(jMenu,callback):Void {

    _jMenu    = jMenu;
    _callback = callback;

    var request:Http = new Http("files/data/data.json");

    request.onError  = function( data:String ){  }
    request.onData   = onData;

    request.request( false );

  }

      private static function onData(data:Dynamic):Void {

      	Manager._Data = Json.parse(data);
        loop(Manager._Data);
        
      }

      private static function loop(data:Dynamic):Void {

        var length        :Int    = data.object.length;
        var accessoryHtml :String = "";
        var banarHtml     :String = "";
        var paperHtml     :String = "";

        for (i in 0 ... length) {

          var t = data.object[i];

          var html = Create.makeListHtml(t.id,t.type,t.price,t.bgImg,t.img,t.name,t.length);

          if (t.type == "paper") {

            paperHtml += html;

          } else if (t.type == "accessory") {

            accessoryHtml += html;

          } else if (t.type == "banar") {

            banarHtml += html;
            
          }
          
        }

        setHTML(accessoryHtml,banarHtml,paperHtml);

      }

      private static function setHTML(accessoryHtml:String,banarHtml:String,paperHtml:String):Void {

        _jMenu.find('#sale-accessory').find('.slider').find('ul').append(accessoryHtml);
        _jMenu.find('#sale-banar').find('.slider').find('ul').append(banarHtml);
        _jMenu.find('#sale-paper').find('.slider').find('ul').append(paperHtml);

        _callback();

      }

}
