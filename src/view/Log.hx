package src.view;

import js.JQuery;
import haxe.Http;
import jp.saken.utils.Dom;

class Log {

  public static function write():Void {

    var request:Http = new Http("files/php/history.php");
    var param = untyped Dom.jWindow[0].location.search;

    request.onError  = function( data:String ){  }
    request.onData   = onData;

    request.setParameter('act','write');
    request.setParameter('param',param);

    request.request( true );

  }

      private static function onData(data:Dynamic):Void {
      }

}
