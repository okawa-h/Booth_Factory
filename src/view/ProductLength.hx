package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import jp.okawa.utils.Ua;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;

class ProductLength {

    private static var _jLenAccessory : JQuery;
    private static var _jLenBanner    : JQuery;
    private static var _jLenPaper     : JQuery;
    private static var _lenAcce       : Int;
    private static var _lenBanner     : Int;
    private static var _lenPaper      : Int;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _jLenAccessory = new JQuery('#length-accessory').find('.item-length').find('span');
        _jLenBanner    = new JQuery('#length-banner').find('.item-length').find('span');
        _jLenPaper     = new JQuery('#length-paper').find('.item-length').find('span');

        _lenAcce   = 0;
        _lenBanner = 0;
        _lenPaper  = 0;

        if (Ua.getDevice() == 'sp') setSpMode();

    }

    /* =======================================================================
    Change
    ========================================================================== */
    public static function change(accessoryLength:Int,bannerLength:Int,paperLength:Int):Void {

        if (accessoryLength != _lenAcce) {

            _lenAcce = accessoryLength;
            motion(_jLenAccessory,accessoryLength);

        }

        if (bannerLength != _lenBanner) {

            _lenBanner = bannerLength;
            motion(_jLenBanner,bannerLength);

        }

        if (paperLength != _lenPaper) {

            _lenPaper = paperLength;
            motion(_jLenPaper,paperLength);

        }

    }

    /* =======================================================================
    Clear
    ========================================================================== */
    public static function clear():Void {

        _jLenAccessory.text('0');
        _jLenBanner.text('0');
        _jLenPaper.text('0');

    }

            /* =======================================================================
            motion
            ========================================================================== */
            private static function motion(jTarget:JQuery,length:Int) {

                TweenMaxHaxe.set(jTarget,{top:-30,opacity:0});
                jTarget.text(Std.string(length));
                TweenMaxHaxe.to(jTarget,0.5,{top:0,opacity:1,ease:Elastic.easeOut,delay:0.1});

            }

            /* =======================================================================
            Set SP
            ========================================================================== */
            private static function setSpMode() {

                var jSideL    : JQuery = new JQuery('#sidemenu-left');
                var jSideR    : JQuery = new JQuery('#sidemenu-right');
                var winH      : Int    = Dom.jWindow.height();

                jSideR.css({top:'auto',bottom:'60px'});
                jSideL.css({top:jSideR.offset().top});

            }

}
