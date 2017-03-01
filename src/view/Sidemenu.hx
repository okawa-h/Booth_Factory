package src.view;

import haxe.Json;
import js.jquery.JQuery;
import js.jquery.Event;
import src.Manager;
import src.utils.Drag;
import src.utils.ItemData;
import src.utils.UrlParameter;
import src.view.Mainboard;
import src.view.Mainmenu;
import src.view.sidemenu.Lightbox;
import src.view.sidemenu.Color;
import src.utils.Dom;

class Sidemenu {

    private static var _jBtnMatu  : JQuery;
    private static var _jBtnTake  : JQuery;
    private static var _jBtnUme   : JQuery;
    private static var _jBtnColor : JQuery;
    private static var _jBtnHelp  : JQuery;
    private static var _jBtnClear : JQuery;

    /* =======================================================================
    New
    ========================================================================== */
    public function new() {
    }

    /* =======================================================================
    init
    ========================================================================== */
    public static function init():Void {

        _jBtnMatu   = new JQuery('#set-name-matu');
        _jBtnTake   = new JQuery('#set-name-take');
        _jBtnUme    = new JQuery('#set-name-ume');
        _jBtnColor  = new JQuery('#color-btn');
        _jBtnHelp   = new JQuery('#help-btn');
        _jBtnClear  = new JQuery('#clear-btn');

        Lightbox.init();

        setRightMenu();

    }

            /* =======================================================================
            Set right Menu
            ========================================================================== */
            private static function setRightMenu():Void {

                _jBtnMatu.on('mousedown',function(event:Event):Void {

                    setPacage(ItemData.getSetData("matu").url);

                });

                _jBtnMatu.on('mouseover',function(event:Event):Void {

                    Mainboard.talkHuman('松セットです。/高いです。');

                });

                _jBtnTake.on('mousedown',function(event:Event):Void {

                    setPacage(ItemData.getSetData("take").url);

                });

                _jBtnTake.on('mouseover',function(event:Event):Void {

                    Mainboard.talkHuman('竹セットです。/やや高いです。');

                });

                _jBtnUme.on('mousedown',function(event:Event):Void {

                    setPacage(ItemData.getSetData("ume").url);

                });

                _jBtnUme.on('mouseover',function(event:Event):Void {

                    Mainboard.talkHuman('梅セットです。/お手頃ですね。');

                });

                _jBtnColor.on('mousedown',function(event:Event):Void {

                    Color.show(new JQuery(event.currentTarget));

                });

                _jBtnColor.on('mouseover',function(event:Event):Void {

                    Mainboard.talkHuman('色の変更が出来ます。');

                });

                _jBtnHelp.on('mousedown',function(event:Event) {

                    Lightbox.show('help',new JQuery(event.currentTarget));

                });

                _jBtnHelp.on('mouseover',function(event:Event):Void {

                    Mainboard.talkHuman('ヘルプです。');

                });

                _jBtnClear.on('mousedown',function(event:Event):Void {

                    setPacage('?');
                    Price.clear();
                    ProductLength.clear();
                    Mainmenu.clearDrop('all');

                });

                _jBtnClear.on('mouseover',function(event:Event):Void {

                    Mainboard.talkHuman('全部消せます。');

                });

            }

            /* =======================================================================
            Set Pacage
            ========================================================================== */
            private static function setPacage(data:String):Void {

                var url = UrlParameter.getLocation();

                if (url.indexOf('_x') > -1) {

                    Mainboard.clear();
                    Mainmenu.clearDrop('all');

                }

                UrlParameter.change(data);
                UrlParameter.remakeObject();
                Drag.setBoardObj();

            }

}
