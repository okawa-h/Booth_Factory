package src;

import js.JQuery;
import haxe.Json;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import jp.saken.utils.Dom;
import src.utils.Param;
import src.utils.Drag;
import src.utils.Log;
import src.view.Intro;
import src.view.ProductLength;
import src.view.Price;
import src.view.Data;
import src.view.Board;
import src.view.Trash;
import src.view.Tutorial;
import src.view.mainmenu.Mainmenu;
import src.view.sidemenu.Sidemenu;

class Manager {

  public static var _Data      : Json;
  public static var _DragObj   : JQuery;

	private static var _jMenu    : JQuery;
  private static var _jArea    : JQuery;
  private static var _jAreaObj : JQuery;
  private static var _scale    : Float;

	public static function init(event:JqEvent):Void {

    _jMenu = new JQuery('#mainmenu');
    _jArea = new JQuery('#mainboard');

    getWindowScale();
    Intro.start();
    Data.set(_jMenu,start);
    Log.write();

	}

  public static function start():Void {

    Param.init(_jArea);
    Board.init(_jArea);
    Price.init();
    Mainmenu.init(_jMenu,_jArea);
    Sidemenu.init(_Data);
    ProductLength.init();
    Trash.init();

    Param.remakeObject();
    setCounter();
    Drag.init(_jArea,_jAreaObj,_jMenu);

    Dom.jWindow.on('mouseup',function(event:JqEvent) {

      setCounter();
      Log.write();
      Trash.hide();

    });

  }

  /* =======================================================================
  Set Price Length URL パラメタ書き換え、左サイド書き換え
  ========================================================================== */
  public static function setCounter():Void {

    _jAreaObj = _jArea.find('.object');

    var length : Int = (_jAreaObj == null) ? 0 : _jAreaObj.length;
    var lengthArray  = Board.count(_jAreaObj,length);

    for (i in 0 ... length) {

      Mainmenu.addDrop(_jAreaObj.eq(i).data('id'));

    }

    var accessoryLength : Int = lengthArray[0];
    var bannerlength    : Int = lengthArray[1];
    var paperLength     : Int = lengthArray[2];
    var price           : Int = lengthArray[3];

    ProductLength.change(accessoryLength,bannerlength,paperLength);
    Price.change(price);
    var param : String = Param.make(_jAreaObj,length,price);
    Param.change('?' + param);

  }

      /* =======================================================================
      Get Window Scale
      ========================================================================== */
      private static function getWindowScale():Void {

        var maxSize : Int = 810;
        var winH    : Int = Dom.jWindow.height();
        _scale = 1;

        if (maxSize > winH) {

          _scale = ((100 * winH)/maxSize)/100 * 0.9;
          resizeDom(_jArea,false,true);
          resizeDom(_jArea.find('.board .human'),true);
          resizeDom(_jArea.find('.board .desk'),true);
          resizeDom(_jArea.find('.board .desk .desk-table'),true);
          resizeDom(_jArea.find('.board .desk .desk-left'),true);
          resizeDom(_jArea.find('.board .desk .desk-right'),true);

          var jSidemenu : JQuery = new JQuery('#sidemenu-right');
          TweenMaxHaxe.set(jSidemenu,{scaleX:_scale, scaleY:_scale});
          var top : Int = Std.parseInt(jSidemenu.css('top').split('px').join(''));
          jSidemenu.css({'top': Math.round(top * _scale)});
          
        }

      }

  /* =======================================================================
  Resize Dom
  ========================================================================== */
  public static function resizeDom(target:JQuery,posi:Bool = false,mLeft:Bool = false):Void {

    if (_scale == 1) return;

    if (posi) {

      var left : Int = Std.parseInt(target.css('left').split('px').join(''));
      target.css({'left': Math.round(left * _scale)});
      var top : Int = Std.parseInt(target.css('top').split('px').join(''));
      target.css({'top': Math.round(top * _scale)});

    }

    if (target.hasClass('object')) {

      TweenMaxHaxe.set(target,{scaleX:_scale, scaleY:_scale});
      return;

    }

    var w : Int = Math.round(target.width() * _scale);
    var h : Int = Math.round(target.height() * _scale);

    target.width(w);
    target.height(h);

    if (mLeft) target.css({'margin-left': -(w/2)});

  }

}
