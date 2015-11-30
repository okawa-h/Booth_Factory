package src.drop;

import js.JQuery;
import jp.saken.utils.Dom;
import src.drop.Juge;

class Drop {

  public static var _dx     : Float;
  public static var _dy     : Float;
  public static var _STATUS: Bool;
  public static var target  : JQuery;
  public static var catchTarget  : JQuery;
  public static var _Area  : JQuery;

  public static function init(_jItem:JQuery,_jArea:JQuery):Void {

    _STATUS = false;
    _Area = _jArea;

    _jItem.find('img').on('mousedown',function(event:JqEvent) {
      event.preventDefault();
      return false;
    });

    _jItem.on({ 'mousedown':getTarget });

    Dom.jWindow.on({
      'mousemove':moveDrag,
      'mouseup'  :leaveDrag
    });

  }

  /* =======================================================================
  Start Drag
  ========================================================================== */
  public static function getTarget(event:JqEvent):Void {

    _STATUS = true;
    target  = JQuery.cur;
    createImg(JQuery.cur);
    target.addClass('drop');
    _dy = event.pageY - target.offset().top;
    _dx = event.pageX - target.offset().left;

  }

  /* =======================================================================
  Create Img
  ========================================================================== */
  public static function createImg(target:JQuery):Void {
    var title:String = target.prop('title');
    var html = '<p class="catch"><img src="files/img/drop_item/' + title + '.png"></p>';
    _Area.append(html);
    catchTarget = _Area.find('.catch');
    trace(title);

    _Area.find('p').on('mousedown',function(event:JqEvent) {
      target  = JQuery.cur;
      _dy = event.pageY - target.offset().top;
      _dx = event.pageX - target.offset().left;
      _STATUS = true;
      catchTarget = JQuery.cur;
    });
  }

  /* =======================================================================
  On Submit
  ========================================================================== */
  public static function moveDrag(event:JqEvent):Void {

    moveItem(event);
    if (_STATUS)catchTarget.removeClass('catch');

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

      catchTarget.css({
        'position':'absolute',
        'top'     : event.pageY - _dy,
        'left'    : event.pageX - _dx
      });

    }

  }

}
