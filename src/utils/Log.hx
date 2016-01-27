package src.utils;

import haxe.Http;
import src.utils.UrlParameter;

class Log {

    /* =======================================================================
    Write
    ========================================================================== */
    public static function write():Void {

        var request : Http   = new Http("files/php/history.php");
        var param   : String = '?' + UrlParameter.getLocation().split('?')[1];
        var user    : String = (param.indexOf('?utm_content=') > -1) ? param.split('?utm_content=').join('').split('&')[0] : 'none';

        request.setParameter('act','write');
        request.setParameter('param',param);
        request.setParameter('user',user);

        request.request( true );

    }

}
