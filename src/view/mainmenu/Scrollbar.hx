package src.view.mainmenu;

import js.JQuery;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Sine;
import tween.easing.Back;

class Scrollbar {

  private static var _jMenu   : JQuery;
  private static var _jSlider : JQuery;
  private static var _jInner  : JQuery;
  private static var _jScroll : JQuery;
  private static var _jNavi   : JQuery;
  private static var _max     : Int;
  private static var _posi    : Int;
  private static var _scale   : Float;

  public static function init(jMenu:JQuery):Void {

    _jMenu   = jMenu;
    _jSlider = jMenu.find('.slider');

    set();
    Dom.jWindow.on("resize",set);
    _jSlider.on("mousewheel",onMousewheel);
    jMenu.find('.scroll-navi').on("mousedown",onMousedown);

  }

      private static function set(event:JqEvent = null):Void {

        var length : Int = _jSlider.length;

        for (i in 0 ... length) {

          getDom(_jSlider.eq(i));
          var scale : Float = getScale();
          var nH    : Int   = Math.round((_jScroll.height() * scale)/100);

          _jNavi.height(nH);
          
        }

      }

      private static function getDom(target:JQuery):Void {

        _jInner  = target.find('ul');
        _jScroll = target.siblings('.slider-scroll');
        _jNavi   = _jScroll.find('.scroll-navi');
        _max     = (_jInner.height() - _jSlider.height()) * -1 + 20;
        _posi    = Std.parseInt(_jInner.css('margin-top'));
        _scale   = getScale();

      }

      private static function getScale():Float {

        var vH    : Int = _jSlider.height();
        var tH    : Int = _jInner.height() - 20;
        var sH    : Int = _jScroll.height();
        var scale : Float = (vH * 100)/tH;

        return scale;

      }

      private static function onMousewheel(event:Dynamic):Void {

        var target : JQuery = JQuery.cur;
        var delta  : Int    = event.originalEvent.wheelDelta;
        getDom(target);
        move(delta);

      }

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

      private static function move(delta:Int):Void {

        delta = Math.round(delta * .3);
        var val : Int = _posi + delta;

        if (0 < val) val = 0;
        if (_max > val) val = _max;

        _jInner.stop().animate({marginTop: val },100,"linear");
        val = Std.int((val * _scale)/100) * -1;
        _jNavi.stop().animate({ marginTop: val },100,"linear");

      }

}
