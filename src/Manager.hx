package src;

import js.JQuery;
import haxe.Json;
import jp.saken.utils.Dom;
import src.utils.Param;
import src.utils.Drag;
import src.view.ProductLength;
import src.view.Price;
import src.view.Data;
import src.view.Log;
import src.view.Board;
import src.view.Trash;
import src.view.mainmenu.Mainmenu;
import src.view.sidemenu.Sidemenu;

class Manager {

  public static var _Data      : Json;
  public static var _DragObj   : JQuery;

	private static var _jMenu    : JQuery;
  private static var _jArea    : JQuery;
  private static var _jAreaObj : JQuery;

	public static function init(event:JqEvent):Void {

    _jMenu = new JQuery('#mainmenu');
    _jArea = new JQuery('#mainboard');

    Data.set(_jMenu,start);
    Log.write();

	}

  public static function start():Void {

    Param.init(_jArea);
    Board.init(_jArea);
    Price.init();
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
    //Animate.hoverObject(_jAreaObj);

  }

}
