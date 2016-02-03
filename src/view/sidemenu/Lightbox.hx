package src.view.sidemenu;

import js.JQuery;
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
        _jLightText.hide();

    }

    /* =======================================================================
    Show
    ========================================================================== */
    public static function show(cls:String,jBtn:JQuery):Void {

        var jBox : JQuery = _jLightBox.find('.' + cls);
        var sPEED: Int    = 300;

        jBox.width(50);
        _jLightBox.fadeIn(sPEED,function() {
            _jLightText.hide();
            _jLightSub.hide();

            jBox.show();
            TweenMaxHaxe.to(jBox, 1, { width : 800 , ease:Elastic.easeOut,
                onComplete:function() {
                    _jLightText.fadeIn(100);
                    _jLightSub.fadeIn(100);
                }
            });

        });

        jBox.find('.close-btn').on('mousedown',function(event:JqEvent) {

            hide(jBox,sPEED);

        });

        _jLightBoxBg.on('mousedown',function(event:JqEvent) {

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

        jBox.find('.close-btn').unbind('mousedown');

    }

}
