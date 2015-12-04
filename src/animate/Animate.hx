package src.animate;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;

class Animate {

  public static var _jMenu: JQuery;
  public static var _jBtn : JQuery;

  public static function init():Void {

    _jMenu = Manager._jMenu;
    _jBtn  = _jMenu.find('.ttl').find('p');

    _jBtn.on('click',function(event:JqEvent) {
      var jThis:JQuery = JQuery.cur;
      clickBtn(jThis,event);
    });

    _jMenu.on('mouseleave',function(event:JqEvent) {
      animateClose();
    });

  }

  /* =======================================================================
  Click Btn
  ========================================================================== */
  public static function clickBtn(jThis:JQuery,event:JqEvent):Void {

    var cls   :String = jThis.prop('class');
    var target:JQuery = _jMenu.find('.inner');

    var h:Int = target.find('#' + cls).outerHeight() * (-1) + 1;

    addCurrent(cls);
    if(_jMenu.prop('class') == 'close') {
      animateOpen(target,h);
    }

  }

  /* =======================================================================
  Animate Open
  ========================================================================== */
  public static function animateOpen(target:JQuery,h:Int):Void {

    addOpen();
    target.animate({ 'top': h + 'px' });

  }

  /* =======================================================================
  Animate Open
  ========================================================================== */
  public static function animateClose():Void {

    addClose();
    var target:JQuery = _jMenu.find('.inner');
    target.animate({ 'top': 0 + 'px' });

  }

  /* =======================================================================
  Add Current
  ========================================================================== */
  public static function addCurrent(cls:String):Void {

    _jMenu.find('div').removeClass('current');
    _jMenu.find('#' + cls).addClass('current');

  }

  /* =======================================================================
  Add Open
  ========================================================================== */
  public static function addOpen():Void {

    _jMenu.removeClass('close');
    _jMenu.addClass('open');

  }

  /* =======================================================================
  Add Close
  ========================================================================== */
  public static function addClose():Void {

    _jMenu.removeClass('open');
    _jMenu.addClass('close');

  }

}
