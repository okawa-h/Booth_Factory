package src.view;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Sine;
import tween.easing.Back;

class Mainmenu {

  private static var _jMenu     : JQuery;
  private static var _jBtn      : JQuery;
  private static var _jScrollUp : JQuery;
  private static var _jScrollDw : JQuery;

  public static function init(jMenu):Void {

    _jMenu     = jMenu;
    _jBtn      = _jMenu.find('.ttl').find('p');
    _jScrollUp = jMenu.find('.slider-up');
    _jScrollDw = jMenu.find('.slider-down');

    _jBtn.on('mousedown',function(event:JqEvent) {

      clickBtn(JQuery.cur,event);

    });

    _jMenu.on('mouseleave',function(event:JqEvent) {

      close();

    });

    _jScrollUp.on('mousedown',function(event:JqEvent) {

      scroll(JQuery.cur,'up');

    });

    _jScrollDw.on('mousedown',function(event:JqEvent) {

      scroll(JQuery.cur,'down');

    });

  }

      /* =======================================================================
      scroll
      ========================================================================== */
      private static function scroll(jThis:JQuery,action:String) {

        var jTarget   : JQuery = jThis.siblings('.slider');
        var jUp       : JQuery = jTarget.siblings('.slider-up');
        var jDw       : JQuery = jTarget.siblings('.slider-down');
        var h         : Int    = jTarget.find('ul').find('li').outerHeight() + 20;
        var scrollTop : Int    = jTarget.scrollTop();
        var scrollVal : Int    = (action == 'up') ? -h : h;
        if (jTarget.is(':animated')) return;
        jTarget.animate({scrollTop: scrollTop + scrollVal});
        setScrollBtn(jUp,jDw,scrollTop + scrollVal,jTarget.get(0).scrollHeight);

      }

      /* =======================================================================
      Set Scroll Btn
      ========================================================================== */
      private static function setScrollBtn(jUp:JQuery,jDw:JQuery,scrollTop:Int,height:Int) {

        if (scrollTop > 0) {
          jUp.show();
        } else {
          jUp.hide();
        }

        if (scrollTop >= height - 220) {
          jDw.hide();
        } else {
          jDw.show();
        }

      }

      /* =======================================================================
      Click Btn
      ========================================================================== */
      private static function clickBtn(jThis:JQuery,event:JqEvent):Void {

        var cls   :String = jThis.prop('class');
        var target:JQuery = _jMenu.find('.inner');
        var h     :Int    = target.find('#' + cls).outerHeight() * (-1) + 1;

        addCurrent(cls);

        if(_jMenu.prop('class') == 'close') open(target,h);

      }

      /* =======================================================================
      Animate Open
      ========================================================================== */
      private static function open(target:JQuery,h:Int):Void {

        _jMenu.removeClass('close');
        _jMenu.addClass('open');
        TweenMaxHaxe.to(target, 0.3, { top : h , ease:Sine.easeOut});
        // target.animate({ 'top': h + 'px' });

      }

      /* =======================================================================
      Animate Open
      ========================================================================== */
      private static function close():Void {

        _jMenu.removeClass('open');
        _jMenu.addClass('close');
        TweenMaxHaxe.to(_jMenu.find('.inner'), 1, { top : 0 , ease:Elastic.easeOut});

      }

      /* =======================================================================
      Add Current
      ========================================================================== */
      private static function addCurrent(cls:String):Void {

        _jMenu.find('div').removeClass('current');
        _jMenu.find('#' + cls).addClass('current');

      }

  /* =======================================================================
  Add Drop
  ========================================================================== */
  public static function addDrop(id:String):Void {

    if (_jMenu.find('#' + id) == null) return;
trace('ugoiteru');
    _jMenu.find('#' + id).addClass('drop');

  }

  /* =======================================================================
  Add Drop
  ========================================================================== */
  public static function clearDrop(id:String):Void {

    if (id == 'all') {

      _jMenu.find('.drop').removeClass('drop');

    } else {

      _jMenu.find('#' + id).removeClass('drop');
      
    }

  }

}
