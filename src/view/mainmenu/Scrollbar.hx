package src.view.mainmenu;

import js.JQuery;
import jp.saken.utils.Dom;
import jp.okawa.utils.Ua;
import tween.TweenMaxHaxe;

class Scrollbar {

    private static var _jMainmenu : JQuery;
    private static var _jSlider   : JQuery;
    private static var _jInner    : JQuery;
    private static var _jScroll   : JQuery;
    private static var _jNavi     : JQuery;
    private static var _max       : Int;
    private static var _posi      : Int;
    private static var _touchPosiY: Int;
    private static var _ratio     : Float;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init(jMainmenu:JQuery):Void {

        _jMainmenu = jMainmenu;
        _jSlider   = _jMainmenu.find('.slider');

        var browser    : String = Ua.getBrowserName();
        var mouseevent : String = ( browser == "Firefox") ? "wheel" : "mousewheel";
        mouseevent = (mouseevent.indexOf('IE') > -1) ? "mousewheel" :  mouseevent;

        setBarSize();
        Dom.jWindow.on("resize",setBarSize);

        _jSlider.on(mouseevent,onMousewheel);
        _jSlider.on("touchstart",setTouchPosition);
        _jSlider.on("touchmove",onMousewheel);
        _jMainmenu.find('.scroll-navi').on("mousedown touchstart",onMousedown);

    }

            /* =======================================================================
            Set
            ========================================================================== */
            private static function setBarSize(event:JqEvent = null):Void {

                var length : Int = _jSlider.length;

                for (i in 0 ... length) {

                    getDom(_jSlider.eq(i));
                    var scale : Float = getScale();
                    var nH    : Int   = (scale >= 100) ? _jScroll.height() : Math.round((_jScroll.height() * scale)/100);

                    _jNavi.height(nH);

                }

            }

            /* =======================================================================
            Get using Dom
            ========================================================================== */
            private static function getDom(jTarget:JQuery):Void {

                _jInner  = jTarget.find('ul');
                _jScroll = jTarget.siblings('.slider-scroll');
                _jNavi   = _jScroll.find('.scroll-navi');
                _max     = (_jInner.height() - _jSlider.height()) * -1 + 20;
                _posi    = Std.parseInt(_jInner.css('margin-top'));
                _ratio   = getScale();

            }

            /* =======================================================================
            Get Scale
            ========================================================================== */
            private static function getScale():Float {

                var vH    : Int   = _jSlider.height();
                var tH    : Int   = _jInner.height() + 10;
                var sH    : Int   = _jScroll.height();
                var scale : Float = (vH * 100)/tH;

                return scale;

            }

            /* =======================================================================
            On Mouse Wheel
            ========================================================================== */
            private static function onMousewheel(event:Dynamic):Void {

                var delta : Int = event.originalEvent.wheelDelta;

                if (delta == null) delta = Math.round(event.originalEvent.deltaY * -120);//Firefox
                if (event.type == "touchmove") {

                    var y : Int = (_touchPosiY > event.originalEvent.touches[0].pageY) ? -1 : 1;
                    delta = Math.round((event.originalEvent.touches[0].pageY / 10) * y);
                }

                getDom(JQuery.cur);
                move(delta);

            }

            /* =======================================================================
            On Mouse
            ========================================================================== */
            private static function onMousedown(event:Dynamic):Void {

                var jTarget : JQuery = JQuery.cur.parent('.slider-scroll').siblings('.slider');
                var base    : Int    = event.pageY;
                getDom(jTarget);

                function onMousemove(event:JqEvent) {

                    var diff : Int = base - event.pageY;

                    move(diff * 15);
                    return untyped false;

                }

                function onMouseup(event:JqEvent) {

                    Dom.jBody.unbind('mousemove',onMousemove).unbind('mouseup',onMouseup);

                }

                Dom.jBody.on({ mousemove:onMousemove, mouseup:onMouseup });

            }

            /* =======================================================================
            Move
            ========================================================================== */
            private static function move(delta:Int):Void {

                if (_ratio >= 100) return;

                delta = Math.round(delta * .3);
                var val : Int = _posi + delta;

                if (0 < val) val = 0;
                var adjustment : Int = (_jMainmenu.hasClass('ratio')) ? -10 : -30;
                if (_max >= val) val = _max + adjustment;

                TweenMaxHaxe.to(_jInner,0.1,{marginTop: val,ease:'linear'});
                val = Std.int((val * _ratio)/100) * -1;
                TweenMaxHaxe.to(_jNavi,0.1,{marginTop: val,ease:'linear'});

            }
            /* =======================================================================
            Set Touch Position
            ========================================================================== */
            private static function setTouchPosition(event:Dynamic):Void {

                _touchPosiY = event.originalEvent.touches[0].pageY;

            }

}
