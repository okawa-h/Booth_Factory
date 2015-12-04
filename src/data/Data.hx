package src.data;

import js.JQuery;
import haxe.Http;
import haxe.Json;
import src.data.Set;
import src.Manager;

class Data {

  public static var _callback;

  public static function get(callback):Void {

    _callback = callback;

    var request:Http = new Http("files/data/data.json");

    request.onError  = function( data:String ){ trace( "error!" ); }
    request.onData   = onData;

    request.request( false );

  }

  static function onData(data:Dynamic):Void {

  	Manager._Data = Json.parse(data);
    Set.init(_callback);
    
  }

}
