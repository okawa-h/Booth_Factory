package src;

import js.JQuery;
import haxe.Json;
import src.utils.Drag;
import src.utils.ItemData;
import src.utils.Log;
import src.utils.UrlParameter;
import src.view.Intro;
import src.view.Mainboard;
import src.view.Mainmenu;
import src.view.Price;
import src.view.ProductLength;
import src.view.Sidemenu;
import src.view.Trash;
import src.view.Tutorial;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;

class Manager {

    private static var _ratio : Float;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init(event:JqEvent):Void {

        getWindowRatio();
        Intro.start();
        Tutorial.start();
        ItemData.set(start);
        Log.write();

    }

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        Mainboard.init();
        UrlParameter.init();
        Price.init();
        Mainmenu.init();
        Sidemenu.init();
        ProductLength.init();
        Trash.init();

        UrlParameter.remakeObject();
        setCounter();
        Drag.init();

        Dom.jWindow.on('mouseup touchend',function(event:JqEvent) {

            setCounter();
            Log.write();
            Trash.hide();

        });

    }

    /* =======================================================================
    Set Price Length URL パラメタ書き換え、左サイド書き換え
    ========================================================================== */
    public static function setCounter():Void {

        Drag.addBoardObj(Mainboard.getMainboardDom().find('.object'));
        var jBoardObj   : JQuery     = Drag.getBoardObj();
        var length      : Int        = (jBoardObj == null) ? 0 : jBoardObj.length;
        var lengthArray : Array<Int> = Mainboard.count(jBoardObj,length);

        for (i in 0 ... length) {

            Mainmenu.addDrop(jBoardObj.eq(i).data('id'));

        }

        var accessoryLength : Int = lengthArray[0];
        var bannerlength    : Int = lengthArray[1];
        var paperLength     : Int = lengthArray[2];
        var price           : Int = lengthArray[3];

        ProductLength.change(accessoryLength,bannerlength,paperLength);
        Price.change(price);
        UrlParameter.change('?' + UrlParameter.getParameter(jBoardObj,length,price));

    }

            /* =======================================================================
            Get Window Ratio
            ========================================================================== */
            private static function getWindowRatio():Void {

                var maxSize    : Int    = 810;
                var winH       : Int    = Dom.jWindow.height();
                var jMainboard : JQuery = new JQuery('#mainboard');
                _ratio = 1;

                if (maxSize > winH) {

                    _ratio = ((100 * winH)/maxSize)/100 * 0.9;
                    resizeDom(jMainboard,false,true);
                    resizeDom(jMainboard.find('.board .human'),true);
                    resizeDom(jMainboard.find('.board .desk'),true);
                    resizeDom(jMainboard.find('.board .desk .desk-table'),true);
                    resizeDom(jMainboard.find('.board .desk .desk-left'),true);
                    resizeDom(jMainboard.find('.board .desk .desk-right'),true);
                    var jTrashDiv = new JQuery('#trash').find('div');
                    for (i in 0 ... jTrashDiv.length) {

                        resizeDom(jTrashDiv.eq(i),false,true);

                        if (jTrashDiv.eq(i).hasClass('trash-bg')) {

                            var bottom  : Int = Std.parseInt(jTrashDiv.eq(i).css('bottom'));
                            jTrashDiv.eq(i).css({'bottom': Math.round(bottom * _ratio)});
                            
                        }

                    }
                    
                    var jSidemenuR : JQuery = new JQuery('#sidemenu-right');
                    var jSidemenuL : JQuery = new JQuery('#sidemenu-left');
                    TweenMaxHaxe.set(jSidemenuR,{scaleX:_ratio, scaleY:_ratio});
                    TweenMaxHaxe.set(jSidemenuL,{scaleX:_ratio, scaleY:_ratio});
                    var topR : Int = Std.parseInt(jSidemenuR.css('top'));
                    jSidemenuR.css({'top': Math.round(topR * _ratio)});
                    var topL : Int = Std.parseInt(jSidemenuL.css('top'));
                    jSidemenuL.css({'top': Math.round(topL * _ratio)});

                }

            }

    /* =======================================================================
    Resize Dom
    ========================================================================== */
    public static function resizeDom(jTarget:JQuery,isPosi:Bool = false,isMLeft:Bool = false):Void {

        if (_ratio == 1) return;

        if (isPosi) {

            var left : Int = Std.parseInt(jTarget.css('left'));
            var top  : Int = Std.parseInt(jTarget.css('top'));
            jTarget.css({'top': Math.round(top * _ratio),'left': Math.round(left * _ratio)});

        }

        if (jTarget.hasClass('object')) {

            jTarget.find('img').css({
                width : Math.round(jTarget.width() * _ratio),
                height: Math.round(jTarget.height() * _ratio)
            });
            return;

        }

        var w : Int = Math.round(jTarget.width() * _ratio);
        var h : Int = Math.round(jTarget.height() * _ratio);

        jTarget.width(w);
        jTarget.height(h);

        if (isMLeft) jTarget.css({'margin-left': -(w/2)});

    }

    /* =======================================================================
    Get Ratio
    ========================================================================== */
    public static function getRatio():Float {

        return _ratio;

    }

}
