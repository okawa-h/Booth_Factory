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
import src.view.Sidemenu;
import src.animate.Animate;

import src.operation.Drag;

class Manager {

  public static var _Data: Json;

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

    Param.init(_jArea,_jAreaObj,_jPrice);
    set(Board.init(_jArea,_jAreaObj));
    Drag.init(_jArea,_jAreaObj,_jMenu);

    Animate.init(_jMenu,_jArea);

    Trash.init();
    Sidemenu.init(_Data);

    Dom.jWindow.on('click',function(event:JqEvent) {
      set(Board.count());
    });

    Dom.jWindow.on('mouseup',function(event:JqEvent) {
      set(Board.count());
      Log.write();
      Trash.none(Drag._catchTarget);
      Drag.on();
    });

  }

      /* =======================================================================
      Set Price Length URL
      ========================================================================== */
      private static function set(array:Array<Int>):Void {

        _jAreaObj = _jArea.find('p');

        var accessoryLength:Int = array[0];
        var banarLength:Int = array[1];
        var paperLength:Int = array[2];
        var price:Int = array[3];

        ProductLength.change(accessoryLength,banarLength,paperLength);
        Price.change(price);
        var param = Param.make(_jAreaObj,price);
        Param.change('?' + param);

      }

}
