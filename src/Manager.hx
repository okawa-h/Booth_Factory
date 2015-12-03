package src;

import js.JQuery;
import src.data.Data;
import src.drop.Drop;
import src.judge.Judge;
import src.animate.Animate;

class Manager {

	public static var _jMenu : JQuery;
  public static var _jArea : JQuery;
  public static var _jPrice: JQuery;

	public static function init(event:JqEvent):Void {

    _jMenu  = new JQuery('#mainmenu');
    _jArea  = new JQuery('#mainboard');
    _jPrice = new JQuery('#contact').find('#price');

		Drop.init(_jMenu,_jArea);
		Judge.init(_jArea,_jPrice);
		Animate.init(_jMenu);

	}

	public static function setItemList():Void {

    var a = Data.item(); 

	}

}
