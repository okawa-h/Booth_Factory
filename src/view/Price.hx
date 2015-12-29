package src.view;

import js.JQuery;
import jp.okawa.utils.Estimate;

class Price {

  private static var _jContact    : JQuery;
  private static var _jContactBox : JQuery;
  private static var _jPrice      : JQuery;

  public static function init():Void {

    _jContact    = new JQuery('#contact');
    _jContactBox = _jContact.find('.contact-box');
    _jPrice      = _jContactBox.find('#price').find('span');

  }

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(price:Int):Void {

    calPriceSize(price);
    var reprice : String = Estimate.insertComma(Std.string(price));
    _jPrice.text(reprice);

  }

      /* =======================================================================
      Price Size
      ========================================================================== */
      private static function calPriceSize(price:Int):Void {

        var val : String = 'icon_price_';
        var str : String = _jContactBox.css('background-image');

        if (10000 > price) {
          val += 'ss';
        } else if (50000 > price) {
          val += 's';
        } else if (100000 > price) {
          val += 'm';
        } else if (200000 < price) {
          val += 'l';
        }

        val += '.png';

        var txt    : String = str.split('url("')[1];
        var url    : String = txt.split('")')[0];
        var urlArr : Array<String> = url.split('/');
        var tar    : String = urlArr[urlArr.length - 1];
        tar = url.split(tar).join(val);

        _jContactBox.css({'background' : 'url("' + tar + '") no-repeat 15px 50% #fff'});

      }

  /* =======================================================================
  Clear
  ========================================================================== */
  public static function clear():Void {

    _jPrice.text('0');

  }

}
