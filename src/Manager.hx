package src;

import js.JQuery;
import haxe.Json;
import src.data.Data;
import src.drop.Drop;
import src.judge.Judge;
import src.judge.Log;
import src.animate.Animate;

class Manager {

	public static var _jMenu : JQuery;
  public static var _jArea : JQuery;
  public static var _jPrice: JQuery;
  public static var _Data  : Json;

	public static function init(event:JqEvent):Void {

    _jMenu  = new JQuery('#mainmenu');
    _jArea  = new JQuery('#mainboard');
    _jPrice = new JQuery('#contact').find('#price');

    Data.get(start);

	}

  public static function start():Void {

    Log.checkUrl();
    Drop.init();
    Judge.init();
    Animate.init();

  }

}
