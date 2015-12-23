package src.operation;

import js.JQuery;
import jp.saken.utils.Dom;
import src.operation.Create;
import src.Manager;
import src.view.Trash;
import src.animate.Animate;

class Drag {

  private static var _diffX    : Float;
  private static var _diffY    : Float;
  private static var _Status   : Bool;
  private static var _jArea    : JQuery;
  private static var _jAreaObj : JQuery;
  private static var _jMenu    : JQuery;

  public static function init(jArea:JQuery,jAreaObj:JQuery,jMenu:JQuery):Void {

    _Status   = false;
    _jArea    = jArea;
    _jAreaObj = jAreaObj;
    _jMenu    = jMenu;

//     _jArea.find('.object').find('img').on('mousedown',function(event:JqEvent) {
// js.Lib.alert('ok');
//       event.preventDefault();
//       return false;

//     });

    _jMenu.find('.slider').find('li').find('img').on('mousedown',function(event:JqEvent) {

      event.preventDefault();
      return false;

    });

    _jMenu.find('.slider').find('li').on({ 'mousedown' : grabList });

    Dom.jWindow.on({

      'mousemove':mousemove,
      'mouseup'  :mouseup

    });

    _jAreaObj.on('mousedown',function(event:JqEvent) {

      grabObject(JQuery.cur,event);

    });

  }

      /* =======================================================================
      Grab
      ========================================================================== */
      private static function grabList(event:JqEvent):Void {

        var target : JQuery = JQuery.cur;

        if (target.hasClass('drop')) return;

        Manager._DragObj = target.find('.img');
        Manager._DragObj.addClass('grab');
        _Status  = true;
        getDiff(event,target);
        mousemove(event);

      }

  /* =======================================================================
  Drag Img
  ========================================================================== */
  public static function grabObject(target:JQuery,event:JqEvent):Void {

    Manager._DragObj = target;
    Manager._DragObj.addClass('grab');
    getDiff(event,Manager._DragObj);
    _Status = true;

    Manager._DragObj.css({

      'top'     : untyped event.clientY - _diffY,//タッチ位置からヘッダーの大きさ引く差分
      'left'    : untyped event.clientX - _diffX

    });

    //Animate.vibrationObj(Manager._DragObj);
    Trash.show();

  }

      /* =======================================================================
      Get Diff
      ========================================================================== */
      private static function getDiff(event:JqEvent,target:JQuery):Void {

        untyped _diffY = event.offsetY;
        untyped _diffX = event.offsetX;

      }

      /* =======================================================================
      Mouse Move
      ========================================================================== */
      private static function mousemove(event:JqEvent):Void {

        if (_Status) {

          Manager._DragObj.css({

            'top'     : untyped event.clientY - _diffY,
            'left'    : untyped event.clientX - _diffX

          });
        }

      }

      /* =======================================================================
      Mouse Up
      ========================================================================== */
      private static function mouseup(event:JqEvent):Void {

        _Status = false;

        if (Manager._DragObj == null) return;

        if (Manager._DragObj.hasClass('grab')) {

          var h : Int = new JQuery('#header').height();
          var w : Int = _jArea.offset().left;

          Manager._DragObj.css({

            'top'     : event.pageY - h - _diffY,
            'left'    : event.pageX - w - _diffX

          });

          Manager._DragObj.removeClass('grab');
          //Animate.stopTimeline(Manager._DragObj);

        }

        if (Manager._DragObj.parent().parent('li').length > 0) {

          if (_jMenu.find('.current').offset().top > event.pageY) {

            Manager._DragObj.parent().parent('li').addClass('drop');
            createListToObj(Manager._DragObj.parent().parent('li'),event);

            untyped _jAreaObj.off('mousedown');
            _jAreaObj = _jArea.find('.object');
            _jAreaObj.on('mousedown',function(event:JqEvent) {

              grabObject(JQuery.cur,event);

            });
          }
        }

        judgeArea(Manager._DragObj);
        Manager._DragObj = null;
      }

      /* =======================================================================
      Create Img
      ========================================================================== */
      private static function createListToObj(target:JQuery,event:JqEvent):Void {

        var id    : String = target.data('id');
        var type  : String = target.data('type');
        var cat   : String = target.data('cat');
        var icon  : String = target.data('icon');
        var price : Int    = target.data('price');
        var color : String = Param.getParamOption('color');
        var top  = event.pageY - new JQuery('#header').height() - _diffY;
        var left = event.pageX - _jArea.offset().left - _diffX;
        
        var html:String = Create.makeObjHtml(id,top,left,type,cat,price,icon,color);

        _jArea.find('.board').append(html);
        Manager._DragObj = _jArea.find('.board').find('.object.' + id);

      }

      /* =======================================================================
      Judge Area
      ========================================================================== */
      private static function judgeArea(jTarget:JQuery):Void {

        var SPEED  : Int    = 200;

        var top    : String = jTarget.css('top').split('px').join('');
        var left   : String = jTarget.css('left').split('px').join('');
        var t      : Int    = Std.parseInt(top);
        var l      : Int    = Std.parseInt(left);
        var bottom : Int    = t + jTarget.height();
        var right  : Int    = l + jTarget.width();
        var areaB  : Int    = _jArea.height();
        var areaR  : Int    = _jArea.width();

        if (top.indexOf('-') == 0)  t = 0;
        if (left.indexOf('-') == 0) l = 0;
        if (bottom > areaB) t = areaB - jTarget.height();
        if (right > areaR)  l = areaR - jTarget.width();

        jTarget.animate({ top: t, left : l }, SPEED);
      
      }

  /* =======================================================================
  Get Obj
  ========================================================================== */
  public static function getObject():Void {

    _jAreaObj = _jArea.find('.object');
    _jAreaObj.on('mousedown',function(event:JqEvent) {

      grabObject(JQuery.cur,event);

    });

  }

}
