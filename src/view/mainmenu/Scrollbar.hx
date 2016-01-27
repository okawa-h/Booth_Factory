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

        set();
        Dom.jWindow.on("resize",set);
        _jSlider.on(mouseevent,onMousewheel);
        _jMainmenu.find('.scroll-navi').on("mousedown",onMousedown);

    }

            /* =======================================================================
            Set
            ========================================================================== */
            private static function set(event:JqEvent = null):Void {

                var length : Int = _jSlider.length;

                for (i in 0 ... length) {

                    getDom(_jSlider.eq(i));
                    var scale : Float = getScale();
                    var nH    : Int   = Math.round((_jScroll.height() * scale)/100);

                    _jNavi.height(nH);

                }

            }

            /* =======================================================================
            Get using Dom
            ========================================================================== */
            private static function getDom(target:JQuery):Void {

                _jInner  = target.find('ul');
                _jScroll = target.siblings('.slider-scroll');
                _jNavi   = _jScroll.find('.scroll-navi');
                _max     = (_jInner.height() - _jSlider.height()) * -1 + 20;
                _posi    = Std.parseInt(_jInner.css('margin-top'));
                _ratio   = getScale();

            }

            /* =======================================================================
            Get Scale
            ========================================================================== */
            private static function getScale():Float {

                var vH    : Int = _jSlider.height();
                var tH    : Int = _jInner.height() - 20;
                var sH    : Int = _jScroll.height();
                var scale : Float = (vH * 100)/tH;

                return scale;

            }

            /* =======================================================================
            On Mouse Wheel
            ========================================================================== */
            private static function onMousewheel(event:Dynamic):Void {

                var target : JQuery = JQuery.cur;
                var delta  : Int    = event.originalEvent.wheelDelta;
                if (delta == null) delta = Math.round(event.originalEvent.deltaY * -120);//Firefox

                getDom(target);
                move(delta);

            }

            /* =======================================================================
            On Mouse
            ========================================================================== */
            private static function onMousedown(event:Dynamic):Void {

                var target : JQuery = JQuery.cur.parent('.slider-scroll').siblings('.slider');
                var base   : Int    = event.pageY;
                getDom(target);

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

                delta = Math.round(delta * .3);
                var val : Int = _posi + delta;

                if (0 < val) val = 0;
                if (_max > val) val = _max;

                TweenMaxHaxe.to(_jInner,0.1,{marginTop: val,ease:'linear'});
                val = Std.int((val * _ratio)/100) * -1;
                TweenMaxHaxe.to(_jNavi,0.1,{marginTop: val,ease:'linear'});

            }

}
