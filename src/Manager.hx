package src;

import js.JQuery;
import haxe.Json;
import jp.saken.utils.Dom;
import src.operation.Param;
import src.operation.Drag;
import src.view.ProductLength;
import src.view.Price;
import src.view.Data;
import src.view.Log;
import src.view.Board;
import src.view.Trash;
import src.view.Mainmenu;
import src.view.Sidemenu;
import src.animate.Animate;

import src.operation.Drag;

class Manager {

  public static var _Data      : Json;
  public static var _DragObj   : JQuery;

	private static var _jMenu    : JQuery;
  private static var _jArea    : JQuery;
  private static var _jAreaObj : JQuery;
  private static var _jPrice   : JQuery;
  private static var _lengthAccessory: JQuery;
  private static var _lengthBanar    : JQuery;
  private static var _lengthPaper    : JQuery;

	public static function init(event:JqEvent):Void {

    _jMenu  = new JQuery('#mainmenu');
    _jArea  = new JQuery('#mainboard');
    _jPrice = new JQuery('#contact').find('#price');

    _lengthAccessory = new JQuery('#length-accessory').find('.item-length').find('span');
    _lengthBanar     = new JQuery('#length-Banar').find('.item-length').find('span');
    _lengthPaper     = new JQuery('#length-Paper').find('.item-length').find('span');

    Data.get(_jMenu,start);//makeList
    Log.write();

	}

  public static function start():Void {

    Param.init(_jArea);
    Animate.init(_jMenu,_jArea);
    Board.init(_jArea);
    Mainmenu.init(_jMenu);
    Sidemenu.init(_Data);
    ProductLength.init();
    Trash.init();

    Param.remakeObject();
    setCounter();
    Drag.init(_jArea,_jAreaObj,_jMenu);



    Dom.jWindow.on('mouseup',function(event:JqEvent) {

      setCounter();
      Log.write();
      Trash.hide(_DragObj);

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
    var banarLength     : Int = lengthArray[1];
    var paperLength     : Int = lengthArray[2];
    var price           : Int = lengthArray[3];

    ProductLength.change(accessoryLength,banarLength,paperLength);
    Price.change(price);
    var param : String = Param.make(_jAreaObj,length,price);
    Param.change('?' + param);
    Animate.hoverObject(_jAreaObj);

  }

}
