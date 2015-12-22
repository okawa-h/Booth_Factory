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

      }

  /* =======================================================================
  Drag Img
  ========================================================================== */
  public static function grabObject(target:JQuery,event:JqEvent):Void {

    Manager._DragObj = target;
    Manager._DragObj.addClass('grab');
    getDiff(event,Manager._DragObj);
    _Status = true;
    var h = new JQuery('#header').height();
    var w = _jArea.offset().left;

    Manager._DragObj.css({

      'top'     : untyped event.clientY + h - _diffY,//タッチ位置からヘッダーの大きさ引く差分
      'left'    : untyped event.clientX + w - _diffX

    });

    //Animate.vibrationObj(Manager._DragObj);
    Trash.show();

  }

      /* =======================================================================
      Get Diff
      ========================================================================== */
      private static function getDiff(event:JqEvent,target:JQuery):Void {

        untyped _diffY = event.clientY - target.offset().top;//画像トップとタッチの差分
        untyped _diffX = event.clientX - target.offset().left;

      }

      /* =======================================================================
      Mouse Move
      ========================================================================== */
      private static function mousemove(event:JqEvent):Void {

        if (_Status) {

          var h:Int   = 0;
          var w:Float = 0;

          if (Manager._DragObj.hasClass('object')) {

            h = new JQuery('#header').height();
            w = _jArea.offset().left;

          }

          Manager._DragObj.css({

            'top'     : untyped event.clientY + h - _diffY,//タッチ位置からヘッダーの大きさ引く差分
            'left'    : untyped event.clientX + w - _diffX

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

          Manager._DragObj.css({

            'top'     : untyped event.clientY - _diffY,
            'left'    : untyped event.clientX - _diffX

          });

          Manager._DragObj.removeClass('grab');
          //Animate.stopTimeline(_DragObj);

        }

        if (Manager._DragObj.parent().parent('li').length > 0) {

          if (_jMenu.prop('class') != 'open') {

            Manager._DragObj.parent().parent('li').addClass('drop');
            createListToObj(Manager._DragObj.parent().parent('li'),event);

            _jAreaObj = _jArea.find('.object');
            untyped _jAreaObj.off('mousedown');
            _jAreaObj.on('mousedown',function(event:JqEvent) {

              grabObject(JQuery.cur,event);

            });

          }

        }

        judgeArea(Manager._DragObj);
        Manager._DragObj = null;
      }

      /* =======================================================================
      Judge Area
      ========================================================================== */
      private static function judgeArea(jTarget:JQuery):Void {

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

        jTarget.animate({ top: t, left : l },200);
      
      }

      /* =======================================================================
      Create Img
      ========================================================================== */
      private static function createListToObj(target:JQuery,event:JqEvent):Void {

        var id   : String = target.data('id');
        var type : String = target.data('type');
        var cat  : String = target.data('cat');
        var icon : String = target.data('icon');
        var price: Int    = target.data('price');
        var top  = untyped event.clientY - new JQuery('#header').height() - _diffY;
        var left = untyped event.clientX - _jArea.offset().left - _diffX;
        
        var html:String = Create.makeObjHtml(id,top,left,type,cat,price,icon);

        _jArea.find('.board').append(html);
        Manager._DragObj = _jArea.find('.board').find('.object.' + id);

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
