package src.view.mainmenu;

import js.JQuery;
import jp.saken.utils.Dom;
import haxe.Timer;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Expo;
import src.view.mainmenu.Scrollbar;

class Mainmenu {

  private static var _jArea     : JQuery;
  private static var _jMenu     : JQuery;
  private static var _jBtn      : JQuery;
  private static var _Timer     : Timer;

  public static function init(jMenu:JQuery,jArea:JQuery):Void {

    _jArea = jArea;
    _jMenu = jMenu;
    _jBtn  = _jMenu.find('.ttl').find('p');

    var jRevertBtn : JQuery = jMenu.find('.slider').find('ul li').find('.revertObj');

    Scrollbar.init(_jMenu);

    _jBtn.on('mousedown',function(event:JqEvent) {

      clickBtn(JQuery.cur,event);

    });

    _jMenu.on('mouseleave',function(event:JqEvent) {

      _Timer     = new Timer(1000);
      _Timer.run = close;

    });

    _jMenu.on('mouseover',function(event:JqEvent) {

      if (_Timer == null) return;
      _Timer.stop();

    });

    jRevertBtn.on('mousedown',function(event:JqEvent) {

      var jTar : JQuery = JQuery.cur.parent();
      var id   : String = jTar.prop('id');
      _jArea.find('.' + id).remove();
      jTar.removeClass('drop');

      return untyped false;

    });

  }

      /* =======================================================================
      Set Scroll Btn
      ========================================================================== */
      private static function setScrollBtn(jUp:JQuery,jDw:JQuery,scrollTop:Float,height:Int) {

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

        var cls    : String = jThis.prop('class');
        var target : JQuery = _jMenu.find('.inner');
        var h      : Int    = target.find('#' + cls).outerHeight() * (-1) + 1;

        addCurrent(cls);

        if(_jMenu.prop('class') == 'close') open(target,h);

      }

      /* =======================================================================
      Open
      ========================================================================== */
      private static function open(target:JQuery,h:Int):Void {

        _jMenu.removeClass('close');
        _jMenu.addClass('open');
        TweenMaxHaxe.to(target, 0.3, { top : h, ease:Expo.easeOut});

      }

      /* =======================================================================
      Close
      ========================================================================== */
      private static function close():Void {

        _jMenu.removeClass('open');
        _jMenu.addClass('close');
        TweenMaxHaxe.to(_jMenu.find('.inner'), 1, { top : 0, ease:Elastic.easeOut});
        _Timer.stop();

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

    _jMenu.find('#' + id).addClass('drop');

  }

  /* =======================================================================
  Clear Drop
  ========================================================================== */
  public static function clearDrop(id:String):Void {

    if (id == 'all') {

      _jMenu.find('.drop').removeClass('drop');

    } else {

      _jMenu.find('#' + id).removeClass('drop');
      
    }

  }

}
