package src.view.sidemenu;

import haxe.Timer;
import js.jquery.JQuery;
import js.jquery.Event;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;

class Lightbox extends Sidemenu {

    private static var _jLightBox   : JQuery;
    private static var _jLightBoxBg : JQuery;
    private static var _jLightText  : JQuery;
    private static var _jLightSub   : JQuery;

    /* =======================================================================
    New
    ========================================================================== */
    public function new():Void {

        super();

    }

    /* =======================================================================
    init
    ========================================================================== */
    public static function init():Void {

        _jLightBox   = new JQuery('#lightbox');
        _jLightBoxBg = _jLightBox.find('.lightbox-bg');
        _jLightText  = _jLightBox.find('.caution');
        _jLightSub   = _jLightBox.find('h3');

    }

    /* =======================================================================
    Show
    ========================================================================== */
    public static function show(cls:String,jBtn:JQuery):Void {

        var jBox : JQuery = _jLightBox.find('.' + cls);
        var sPEED: Int    = 300;

        _jLightText.hide();
        _jLightSub.hide();
        jBox.width(50);
        _jLightBox.fadeIn(sPEED,function() {

            jBox.show();

            var time : Timer = new Timer(500);
            time.run = function() {

                _jLightText.fadeIn(100);
                _jLightSub.fadeIn(100);
                time.stop();

            }
            TweenMaxHaxe.to(jBox, 1, { width : 800 , ease:Elastic.easeOut });

        });

        jBox.find('.close-btn').on('mousedown',function(event:Event) {

            hide(jBox,sPEED);

        });

        _jLightBoxBg.on('mousedown',function(event:Event) {

            hide(jBox,sPEED);
            _jLightBoxBg.unbind('mousedown');

        });

    }

    /* =======================================================================
    Hide
    ========================================================================== */
    public static function hide(jBox:JQuery,sPEED:Int):Void {

        jBox.fadeOut(sPEED);
        _jLightBox.fadeOut(sPEED);
        _jLightText.hide();
        _jLightSub.hide();
        jBox.find('.close-btn').unbind('mousedown');

    }

}
