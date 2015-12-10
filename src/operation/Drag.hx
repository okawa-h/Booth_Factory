package src.operation;

import js.JQuery;
import jp.saken.utils.Dom;
import src.operation.Create;
import src.view.Trash;
import src.animate.Animate;

class Drag {

  private static var _diffX      : Float;
  private static var _diffY      : Float;
  private static var _STATUS     : Bool;
  public static var _catchTarget: JQuery;
  private static var _jArea      : JQuery;
  private static var _jAreaObj   : JQuery;
  private static var _jMenu      : JQuery;

  public static function init(jArea:JQuery,jAreaObj:JQuery,jMenu:JQuery):Void {

    _STATUS   = false;
    _jArea    = jArea;
    _jAreaObj = jAreaObj;
    _jMenu    = jMenu;

    _jMenu.find('.slider').find('li').find('img').on('mousedown',function(event:JqEvent) {
      event.preventDefault();
      return false;
    });

    _jMenu.find('.slider').find('li').on({ 'mousedown':getListTarget });

    Dom.jWindow.on({
      'mousemove':mousemove,
      'mouseup'  :mouseup
    });

    on();

  }

  /* =======================================================================
  List Drag
  ========================================================================== */
  private static function getListTarget(event:JqEvent):Void {

    _STATUS = true;
    var target:JQuery = JQuery.cur;
    getDiff(event,target);
    target.addClass('drop');
    _catchTarget = target.find('.img');

  }

      /* =======================================================================
      Position Diff
      ========================================================================== */
      private static function getDiff(event:JqEvent,target:JQuery):Void {

        untyped _diffY = event.clientY - target.offset().top;//画像トップとタッチの差分
        untyped _diffX = event.clientX - target.offset().left;

      }

  /* =======================================================================
  Drag Img
  ========================================================================== */
  public static function on():Void {

    _jAreaObj = _jArea.find('p');

    _jAreaObj.on('mousedown',function(event:JqEvent) {

      _catchTarget  = JQuery.cur;
      Animate.vibrationItem(_catchTarget);
      getDiff(event,_catchTarget);
      _STATUS = true;
      Trash.view();
      
    });

  }

      /* =======================================================================
      Mouse Move
      ========================================================================== */
      private static function mousemove(event:JqEvent):Void {

        if (_STATUS) {

          var h:Int   = new JQuery('#header').height();
          var w:Float = _jArea.offset().left;

          if (_jMenu.find('.drop').length > 0) {

            h = _jMenu.find('.current').offset().top;
            w = _catchTarget.parent().offset().left;

          }

          _catchTarget.css({
            'position':'absolute',
            'top'     : untyped event.clientY - h - _diffY,//タッチ位置からヘッダーの大きさ引く差分
            'left'    : untyped event.clientX - w - _diffX
          });

        }

      }

      /* =======================================================================
      Mouse Up
      ========================================================================== */
      private static function mouseup(event:JqEvent):Void {

        _STATUS = false;

        Trash.objDelete(_catchTarget,event);

        untyped if (_catchTarget == undefined) {

        } else if (_catchTarget.parent().parent('li').length > 0) {

          createListToObj(_catchTarget.parent().parent('li'),event);
          _catchTarget.remove();
          _jMenu.find('.drop').removeClass('drop');

        }

      }

      /* =======================================================================
      Create Img
      ========================================================================== */
      private static function createListToObj(target:JQuery,event:JqEvent):Void {

        var title:String = target.prop('title');
        var type :String = target.data('type');
        var price:Int    = target.data('price');
        var top  = untyped event.clientY - new JQuery('#header').height() - _diffY;
        var left = untyped event.clientX - _jArea.offset().left - _diffX;
        
        var html:String = Create.makeObjHtml(title,cast(top),cast(left),type,price,title);

        _jArea.find('#layer-' + type).append(html);

      }

}
