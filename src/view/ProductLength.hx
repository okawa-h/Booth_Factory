package src.view;

import js.JQuery;
import jp.okawa.utils.Ua;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;

class ProductLength {

	private static var _lengthAccessory : JQuery;
	private static var _lengthBanner    : JQuery;
	private static var _lengthPaper     : JQuery;
  private static var _lenAcce         : Int;
  private static var _lenBanner       : Int;
  private static var _lenPaper        : Int;

	public static function init():Void {

		_lengthAccessory = new JQuery('#length-accessory').find('.item-length').find('span');
    _lengthBanner    = new JQuery('#length-banner').find('.item-length').find('span');
    _lengthPaper     = new JQuery('#length-paper').find('.item-length').find('span');

    _lenAcce   = 0;
    _lenBanner = 0;
    _lenPaper  = 0;

    if (Ua.getDevice() == 'sp') setSpMode();

	}

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(accessoryLength:Int,bannerLength:Int,paperLength:Int):Void {

    if (accessoryLength != _lenAcce) {

      _lenAcce = accessoryLength;
      motion(_lengthAccessory,accessoryLength);

    }

    if (bannerLength != _lenBanner) {

      _lenBanner = bannerLength;
      motion(_lengthBanner,bannerLength);

    }

    if (paperLength != _lenPaper) {

      _lenPaper = paperLength;
      motion(_lengthPaper,paperLength);

    }

  }

  /* =======================================================================
  Clear
  ========================================================================== */
  public static function clear():Void {

    _lengthAccessory.text('0');
    _lengthBanner.text('0');
    _lengthPaper.text('0');

  }

      /* =======================================================================
      motion
      ========================================================================== */
      private static function motion(target:JQuery,length:Int) {

        TweenMaxHaxe.set(target,{top:-30,opacity:0});
        target.text(Std.string(length));
        TweenMaxHaxe.to(target,0.5,{top:0,opacity:1,ease:Elastic.easeOut,delay:0.1});

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
