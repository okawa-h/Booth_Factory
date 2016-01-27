package src.utils;

import js.JQuery;
import js.html.History;
import src.Manager;
import src.utils.Drag;
import src.utils.Html;
import src.utils.ItemData;
import src.view.Mainboard;
import src.view.Mainmenu;
import jp.saken.utils.Dom;

class UrlParameter {

    private static var _user : String;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        var location : String = getLocation();
        
        if (location.indexOf('&color=') > -1) {

            var logColor : String = location.split('&color=')[1].split('&')[0];
            new JQuery('#color-btn').prop('class',logColor);
            var jColorList : JQuery = new JQuery('#sidemenu-right').find('ul.color-list');
            jColorList.find('.current').removeClass('current');
            jColorList.find('.' + logColor).addClass('current');

        }

    }

    /* =======================================================================
    Remake Object
    ========================================================================== */
    public static function remakeObject():Void {

        var url : String = getLocation();
        _user = getParamOption('utm_content');

        if (url.indexOf('?') > -1) {

            var param : Array<String> = url.split('?');
            createObject(param[1]);

        }

        resizeObj();

    }

    /* =======================================================================
    Get
    ========================================================================== */
    public static function getLocation():String {

        return Dom.window.location.toString();

    }

                /* =======================================================================
                Create Object
                ========================================================================== */
                private static function createObject(param:String):Void {

                    var paramArray : Array<String> = param.split('&');
                    var length     : Int           = paramArray.length;
                    var data       : Dynamic       = ItemData.getObjData();
                    var color      : String        = getColorParam().split('color=').join('');
                    var x          : Float         = 0;

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
                    var length : Int    = data.length;
                    var html   : String = "";

                    for (i in 0 ... length) {

                        if (data[i].id == id) {

                            var type  : String = data[i].type;
                            var cat   : String = data[i].cat;
                            var icon  : String = data[i].icon;
                            var price : String = data[i].price;
                            if (price.indexOf(',') > -1) price = price.split(',').join('');
                            var length: String = data[i].length;
                            var top   : Float  = y;
                            var left  : Float  = x;

                            html += Html.getObj(id,top,left,type,cat,Std.parseInt(price),length,icon,color);
                            Mainmenu.addDrop(id);

                        }
                    }

                    Mainboard.getMainboardDom().find('.board').append(html);

                }

                /* =======================================================================
                Resize Obj
                ========================================================================== */
                private static function resizeObj() {

                    var tarArray : JQuery = Mainboard.getMainboardDom().find('.board').find('.object');
                    for (i in 0 ... tarArray.length) {

                        Manager.resizeDom(tarArray.eq(i),true);

                    }

                }

    /* =======================================================================
    Get URL Param
    ========================================================================== */
    public static function getParameter(jTarget:JQuery,length:Int,price:Int):String {

        var param : String = "";

        param += getUserParam();
        param += '&' + getColorParam();

        for (i in 0 ... length) {

            if (i == 0) param += "&";

            var str:String = (i == length - 1) ? '' : '&';
            param += getObjectParam(jTarget.eq(i)) + str;

        }

        param += '&' + getPriceParam(price);

        return param;

    }

                /* =======================================================================
                Get User Param
                ========================================================================== */
                private static function getUserParam():String {

                    return 'utm_content=' + _user;

                }

                /* =======================================================================
                Get Color Param
                ========================================================================== */
                private static function getColorParam():String {

                    var color : String = new JQuery('#color-btn').prop('class');
                    if (color.indexOf(' open') > -1) color = color.split(' open').join('');
                    return 'color=' + color;

                }

                /* =======================================================================
                Get Object Param
                ========================================================================== */
                private static function getObjectParam(jTarget:JQuery):String {

                    var ratio : Float  = Manager.getRatio();
                    var id    : String = jTarget.data('id');
                    var x     : Int    = Math.round(Std.parseInt(jTarget.css('left'))/ratio);
                    var y     : Int    = Math.round(Std.parseInt(jTarget.css('top'))/ratio);

                    return id + '_x=' + x + '&' + id + '_y=' + y;

                }

                /* =======================================================================
                Get Price Param
                ========================================================================== */
                private static function getPriceParam(price:Int):String {

                    return 'price=' + price;

                }

    /* =======================================================================
    Change Param
    ========================================================================== */
    public static function change(string:String):Void {

        // Dom.window.history.replaceState('','',string);
        var param : String = "";

        if (string.indexOf('utm_content') == -1) {

            param  = "?" + getUserParam() + "&";
            string = string.split('?')[1];

        }

        param += string;

        untyped History.replaceState('','',param);//ie

    }

    /* =======================================================================
    Get Param Option
    ========================================================================== */
    public static function getParamOption(string:String = 'price'):Dynamic {

        string += '=';
        var url    : Array<String> = getLocation().split('/');
        var search : String        = url[url.length - 1];
        var option : Array<String> = search.split(string);
        var str    : String        = option[1];
        var param  : String        = "";

        if (str == null) return "none";
        if (str.indexOf('&') != -1) {

            option = str.split('&');
            param  = option[0];

        } else {

            param = str;

        }

        return param;
    }

}
