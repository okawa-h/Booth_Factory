package src.drop;

import js.JQuery;
import jp.saken.utils.Dom;
import src.judge.Judge;

class Drop {

  public static var _dx        : Float;
  public static var _dy        : Float;
  public static var _STATUS    : Bool;
  public static var target     : JQuery;
  public static var catchTarget: JQuery;
  public static var _jArea     : JQuery;
  public static var _jMenu     : JQuery;

  public static function init(jMenu:JQuery,jArea:JQuery):Void {

    _STATUS = false;
    _jArea  = jArea;
    _jMenu  = jMenu;

    _jMenu.find('.slider').find('li').find('img').on('mousedown',function(event:JqEvent) {
      event.preventDefault();
      return false;
    });

    _jMenu.find('.slider').find('li').on({ 'mousedown':getTarget });

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
    target.addClass('drop');
    catchTarget = target.find('.img');

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

    if (_STATUS) {

      var h:Int = new JQuery('#header').height();
      var w = _jArea.offset().left;

      if (_jMenu.find('.drop').length > 0) {

        h = _jMenu.find('.current').offset().top;
        w = catchTarget.parent().offset().left;

      }

      catchTarget.css({
        'position':'absolute',
        'top'     : untyped event.clientY - h - _dy,//タッチ位置からヘッダーの大きさ引く差分
        'left'    : untyped event.clientX - w - _dx
      });

    }

  }

  /* =======================================================================
  Create Img
  ========================================================================== */
  public static function createImg(target:JQuery,event:JqEvent):Void {

    var html = createHtml(target,event);
    trace(html);
    _jArea.find('#layer-' + html[1]).append(html[0]);

    _jArea.find('p').on('mousedown',function(event:JqEvent) {
      target  = JQuery.cur;
      getDiff(event,target);
      _STATUS = true;
      catchTarget = JQuery.cur;
    });

  }

  /* =======================================================================
  Create Html
  ========================================================================== */
  public static function createHtml(target:JQuery,event:JqEvent):Array<String> {

    var title:String = target.prop('title');
    var type :String = target.data('type');
    var price:Int    = target.data('price');
    var html :String = '<p class="catch"';
    var h    :Int    = new JQuery('#header').height();
    var w    :Int    = _jArea.offset().left;
    var top  = untyped event.clientY - h - _dy;
    var left = untyped event.clientX - w - _dx;
    html += 'style="position:absolute;top:' + top + 'px;left:' + left + 'px"';
    html += 'data-type="' + type + '" data-price="'+ price +'">';
    html += '<img src="files/img/drop_item/' + title + '.png">';
    html += '</p>';

    return [html,type];
    
  }

  /* =======================================================================
  Move Drag
  ========================================================================== */
  public static function moveDrag(event:JqEvent):Void {

    moveItem(event);
    if (_STATUS) catchTarget.removeClass('catch');

  }

  /* =======================================================================
  End Drag
  ========================================================================== */
  public static function leaveDrag(event:JqEvent):Void {

    _STATUS = false;

    if (catchTarget.parent().parent('li').length > 0) {

      createImg(catchTarget.parent().parent('li'),event);
      catchTarget.remove();
      // catchTarget.css('position','');
      _jMenu.find('.drop').removeClass('drop');

    }

  }

}
