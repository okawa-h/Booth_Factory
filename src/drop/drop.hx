package src.drop;

import js.JQuery;
import jp.saken.utils.Dom;
import src.drop.Juge;

class Drop {

	public static var _jItem : JQuery;
  public static var _jArea : JQuery;
  public static var _jPrice: JQuery;

  public static var _dx     : Float;
  public static var _dy     : Float;

  public static var _STATUS: Bool;

  public static var target  : JQuery;

  public static function init():Void {

    _STATUS = false;

    _jItem  = new JQuery('#item-room').find('.test');
    _jArea  = new JQuery('#play-room').find('a');
    _jPrice = new JQuery('#price-room').find('h1');

    _jItem.on({ 
      'mousedown':getTarget
    });

    Dom.jWindow.on({
      'mousemove':moveDrag,
      'mouseup'  :leaveDrag
    });

    _jPrice.on('mousedown',function(event:JqEvent) {
      Juge.init(event,_jArea,_jItem);
    });

  }

  /* =======================================================================
  Start Drag
  ========================================================================== */
  public static function getTarget(event:JqEvent):Void {

    _STATUS = true;
    target  = JQuery.cur;
    //target.addClass('drop');
    _dy = event.pageY - target.offset().top;
    _dx = event.pageX - target.offset().left;
    trace(event.pageY,target.offset().top);

  }

  /* =======================================================================
  On Submit
  ========================================================================== */
  public static function moveDrag(event:JqEvent):Void {

    moveItem(event);
    //target.removeClass('drop');

  }

  /* =======================================================================
  On Submit
  ========================================================================== */
  public static function leaveDrag(event:JqEvent):Void {

    _STATUS = false;

  }

  /* =======================================================================
  On Submit
  ========================================================================== */
  public static function moveItem(event:JqEvent):Void {

    if (_STATUS) {

      target.css({
        'position':'absolute',
        'top'     : event.pageY - _dy,
        'left'    : event.pageX - _dx
      });

    }

  }

}
