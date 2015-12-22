package src.view;

import js.JQuery;

class ProductLength {

	private static var lengthAccessory:JQuery;
	private static var lengthBanar:JQuery;
	private static var lengthPaper:JQuery;

	public static function init():Void {

		lengthAccessory = new JQuery('#length-accessory').find('.item-length').find('span');
    lengthBanar     = new JQuery('#length-banar').find('.item-length').find('span');
    lengthPaper     = new JQuery('#length-paper').find('.item-length').find('span');

	}

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(accessoryLength:Int,banarLength:Int,paperLength:Int):Void {

    lengthAccessory.text(Std.string(accessoryLength));
    lengthBanar.text(Std.string(banarLength));
    lengthPaper.text(Std.string(paperLength));

  }

  /* =======================================================================
  Clear
  ========================================================================== */
  public static function clear():Void {

    lengthAccessory.text('0');
    lengthBanar.text('0');
    lengthPaper.text('0');

  }

}
