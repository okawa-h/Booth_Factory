package src.drop;

import js.JQuery;
import jp.saken.utils.Dom;
import src.judge.Judge;

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
    getDiff(event,target);
    createImg(target);
    target.addClass('drop');

  }

  /* =======================================================================
  Create Img
  ========================================================================== */
  public static function createImg(target:JQuery):Void {

    var html = createHtml(target);
    var dash = new JQuery('#dashboard');
    dash.append(html[0]);
    // _Area.find('#layer-' + html[1]).append(html[0]);
    catchTarget = _Area.find('.catch');

    _Area.find('p').on('mousedown',function(event:JqEvent) {
      target  = JQuery.cur;
      getDiff(event,target);
      _STATUS = true;
      catchTarget = JQuery.cur;
    });

  }

  /* =======================================================================
  Start Drag
  ========================================================================== */
  public static function getDiff(event:JqEvent,target:JQuery):Void {

    untyped _dy = event.clientY - target.offset().top;//画像トップとタッチの差分
    untyped _dx = event.clientX - target.offset().left;

  }

  /* =======================================================================
  Move Item
  ========================================================================== */
  public static function moveItem(event:JqEvent):Void {

    var h:Int = new JQuery('#header').height();

    if (_STATUS) {

      catchTarget.css({
        'position':'absolute',
        'top'     : untyped event.clientY - h - _dy,//タッチ位置からヘッダーの大きさ引く差分
        'left'    : untyped event.clientX - _Area.offset().left - _dx
      });

    }

  }

  /* =======================================================================
  Create Html
  ========================================================================== */
  public static function createHtml(target:JQuery) {

    var title:String = target.prop('title');
    var type :String = target.data('type');
    var price:Int    = target.data('price');
    var html = '<p class="catch" data-type="' + type + '" data-price="'+ price +'">';
    html += '<img src="files/img/drop_item/' + title + '.png">';
    html += '</p>';

    return [html,type];
    
  }

  /* =======================================================================
  Move Drag
  ========================================================================== */
  public static function moveDrag(event:JqEvent):Void {

    moveItem(event);
    if (_STATUS)catchTarget.removeClass('catch');

  }

  /* =======================================================================
  End Drag
  ========================================================================== */
  public static function leaveDrag(event:JqEvent):Void {

    _STATUS = false;

  }

}
