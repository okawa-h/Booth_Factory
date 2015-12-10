package src.animate;

import js.JQuery;

class Mainmenu {

  private static var _jMenu: JQuery;
  private static var _jBtn : JQuery;

  public static function init(jMenu):Void {

    _jMenu = jMenu;
    _jBtn  = _jMenu.find('.ttl').find('p');

    _jBtn.on('click',function(event:JqEvent) {
      var jThis:JQuery = JQuery.cur;
      clickBtn(jThis,event);
    });

    _jMenu.on('mouseleave',function(event:JqEvent) {
      animateCloseMenu();
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
    if(_jMenu.prop('class') == 'close') {

      animateOpenMenu(target,h);

    }

  }

  /* =======================================================================
  Animate Open
  ========================================================================== */
  private static function animateOpenMenu(target:JQuery,h:Int):Void {

    _jMenu.removeClass('close');
    _jMenu.addClass('open');
    target.animate({ 'top': h + 'px' });

  }

  /* =======================================================================
  Animate Open
  ========================================================================== */
  private static function animateCloseMenu():Void {

    _jMenu.removeClass('open');
    _jMenu.addClass('close');
    _jMenu.find('.inner').animate({ 'top': 0 + 'px' });

  }

  /* =======================================================================
  Add Current
  ========================================================================== */
  private static function addCurrent(cls:String):Void {

    _jMenu.find('div').removeClass('current');
    _jMenu.find('#' + cls).addClass('current');

  }

}
