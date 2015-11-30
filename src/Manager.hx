package src;

import js.JQuery;
import src.drop.Drop;
import src.drop.Juge;
import src.animate.Menu;

class Manager {

	public static var _jItem : JQuery;
  public static var _jArea : JQuery;
  public static var _jPrice: JQuery;

	public static function init(event:JqEvent):Void {

    _jItem  = new JQuery('#mainmenu');
    _jArea  = new JQuery('#play-room');
    _jPrice = new JQuery('#price-room').find('h1');

		Drop.init(_jItem.find('.slider').find('li'),_jArea);
		Juge.init(_jPrice,_jItem);
		Menu.init();

	}

}
