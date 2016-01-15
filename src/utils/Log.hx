package src.utils;

import js.JQuery;
import haxe.Http;
import jp.saken.utils.Dom;

class Log {

  public static function write():Void {

    var request : Http   = new Http("files/php/history.php");
    var param   : String = '?' + Dom.window.location.toString().split('?')[1];
    var user    : String = (param.indexOf('?utm_content=') > -1) ? param.split('?utm_content=').join('').split('&')[0] : 'none';

    request.onError = function( data:String ) { }
    request.onData  = function( data:String ) { }

    request.setParameter('act','write');
    request.setParameter('param',param);
    request.setParameter('user',user);

    request.request( true );

  }

}
