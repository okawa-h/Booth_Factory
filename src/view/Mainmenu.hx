package src.view;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Sine;
import tween.easing.Back;

class Mainmenu {

  private static var _jMenu: JQuery;
  private static var _jBtn : JQuery;

  public static function init(jMenu):Void {

    _jMenu = jMenu;
    _jBtn  = _jMenu.find('.ttl').find('p');

    setListSize(jMenu);

    _jBtn.on('mousedown',function(event:JqEvent) {

      clickBtn(JQuery.cur,event);

    });

    _jMenu.on('mouseleave',function(event:JqEvent) {

      close();

    });

  }
      /* =======================================================================
      Set List Size
      ========================================================================== */
      private static function setListSize(jMenu:JQuery) {

        jMenu.find('.slider').find('ul').each(function() {

          var jThis :JQuery = JQuery.cur;
          var jList :JQuery = jThis.find('li');
          // var right :String = jList.css('margin-right').split('px').join('');
          var right :String = untyped (jList.css('margin-right'))?jList.css('margin-right').replace('px','') : '0';
          var length:Int    = jList.length;
          var width :Int    = jList.width();
          jThis.width((width + Std.parseInt(right) + 10) * length);

        });

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

    if (_jMenu.find('#' + id) == null) {
      return;
    }

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