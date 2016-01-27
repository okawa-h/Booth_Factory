package src.view;

import js.JQuery;
import haxe.Json;
import src.Manager;
import src.utils.Drag;
import src.utils.ItemData;
import src.utils.UrlParameter;
import src.view.Mainboard;
import src.view.Mainmenu;
import src.view.sidemenu.Lightbox;
import src.view.sidemenu.Color;
import jp.saken.utils.Dom;

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

                var data : Dynamic = ItemData.getSetData();

                _jBtnMatu.on('mousedown',function(event:JqEvent):Void {

                    setPacage(data[0].url);

                });

                _jBtnMatu.on('mouseover',function(event:JqEvent):Void {

                    Mainboard.talkHuman('松セットです。/高いです。');

                });

                _jBtnTake.on('mousedown',function(event:JqEvent):Void {

                    setPacage(data[1].url);

                });

                _jBtnTake.on('mouseover',function(event:JqEvent):Void {

                    Mainboard.talkHuman('竹セットです。/やや高いです。');

                });

                _jBtnUme.on('mousedown',function(event:JqEvent):Void {

                    setPacage(data[2].url);

                });

                _jBtnUme.on('mouseover',function(event:JqEvent):Void {

                    Mainboard.talkHuman('梅セットです。/お手頃ですね。');

                });

                _jBtnColor.on('mousedown',function(event:JqEvent):Void {

                    Color.show(JQuery.cur);

                });

                _jBtnColor.on('mouseover',function(event:JqEvent):Void {

                    Mainboard.talkHuman('色の変更が出来ます。');

                });

                _jBtnHelp.on('mousedown',function(event:JqEvent) {

                    Lightbox.show('help',JQuery.cur);

                });

                _jBtnHelp.on('mouseover',function(event:JqEvent):Void {

                    Mainboard.talkHuman('ヘルプです。');

                });

                _jBtnClear.on('mousedown',function(event:JqEvent):Void {

                    setPacage('?');
                    Price.clear();
                    ProductLength.clear();
                    Mainmenu.clearDrop('all');

                });

                _jBtnClear.on('mouseover',function(event:JqEvent):Void {

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
