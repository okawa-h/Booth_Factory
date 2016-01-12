package src.view;

import js.JQuery;
import jp.okawa.utils.Ua;
import jp.saken.utils.Dom;

class ProductLength {

	private static var lengthAccessory:JQuery;
	private static var lengthBanner   :JQuery;
	private static var lengthPaper    :JQuery;

	public static function init():Void {

		lengthAccessory = new JQuery('#length-accessory').find('.item-length').find('span');
    lengthBanner    = new JQuery('#length-banner').find('.item-length').find('span');
    lengthPaper     = new JQuery('#length-paper').find('.item-length').find('span');

    if (Ua.getDevice() == 'sp') setSpMode();

	}

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(accessoryLength:Int,bannerLength:Int,paperLength:Int):Void {

    lengthAccessory.text(Std.string(accessoryLength));
    lengthBanner.text(Std.string(bannerLength));
    lengthPaper.text(Std.string(paperLength));

  }

  /* =======================================================================
  Clear
  ========================================================================== */
  public static function clear():Void {

    lengthAccessory.text('0');
    lengthBanner.text('0');
    lengthPaper.text('0');

  }

      /* =======================================================================
      Set SP
      ========================================================================== */
      private static function setSpMode() {

        new JQuery('#sidemenu-left').hide();
        new JQuery('#mainmenu').hide();

        var h = Dom.jWindow.height();
        js.Lib.alert(h);
        // new JQuery('#main').height(h);

      }

}
