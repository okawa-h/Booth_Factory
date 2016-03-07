package src.utils;

import js.JQuery;
import js.html.Image;
import haxe.Http;
import haxe.Json;
import src.utils.Html;

class ItemData {

    private static var _itemData(default,null)  : Dynamic;
    private static var _objectMap(default,null) : Map<String,Dynamic>;
    private static var _setMap(default,null)    : Map<String,Dynamic>;
    private static var _setData(default,null)   : Dynamic;
    private static var _callback                : Dynamic;

    /* =======================================================================
    Set
    ========================================================================== */
    public static function set(callback):Void {

        _callback = callback;

        var request : Http = new Http("files/data/item.json");

        request.onData = onData;
        request.request( false );

    }

            /* =======================================================================
            On Data
            ========================================================================== */
            private static function onData(data:Dynamic):Void {

                _itemData = Json.parse(data);
                _setData  = _itemData.set;

                _objectMap = new Map();

                for (i in 0 ... _itemData.object.length) {

                    _objectMap.set(_itemData.object[i].id,_itemData.object[i]);
                    
                }

                _setMap = new Map();

                for (i in 0 ... _itemData.set.length) {

                    _setMap.set(_itemData.set[i].name,_itemData.set[i]);
                    
                }

                setList(_itemData.object);

            }

    /* =======================================================================
    Get Obj Data
    ========================================================================== */
    public static function getObjectData(id:String):Dynamic {

        return _objectMap.get(id);

    }

    /* =======================================================================
    Get Set Data
    ========================================================================== */
    public static function getSetData(name:String):Dynamic {

        return _setMap.get(name);

    }

            /* =======================================================================
            Set List
            ========================================================================== */
            private static function setList(data:Dynamic):Void {

                var length        : Int    = data.length;
                var accessoryHtml : String = "";
                var bannerHtml    : String = "";
                var paperHtml     : String = "";

                for (i in 0 ... length) {

                    var t    : Dynamic = data[i];
                    var abs  : String  = (t.type == "accessory" || t.type == "clothes") ? t.abs : "";
                    var html : String  = Html.getList(t.id,t.type,t.cat,t.icon,t.price,t.bgImg,t.img,t.name,t.length,abs);

                    // var roadimage : Image = new Image();
                    // roadimage.src = 'files/img/product/icon/blue/' + t.icon;

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

            /* =======================================================================
            Set HTML
            ========================================================================== */
            private static function setHTML(accessoryHtml:String,bannerHtml:String,paperHtml:String):Void {

                var jMainmenu = new JQuery('#mainmenu');

                jMainmenu.find('#sale-accessory').find('.slider').find('ul').append(accessoryHtml);
                jMainmenu.find('#sale-banner').find('.slider').find('ul').append(bannerHtml);
                jMainmenu.find('#sale-paper').find('.slider').find('ul').append(paperHtml);

                _callback();

            }

}
