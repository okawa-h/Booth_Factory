package src.view;

import js.JQuery;
import jp.okawa.utils.Estimate;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;

class Price {

  private static var _jContact    : JQuery;
  private static var _jContactBox : JQuery;
  private static var _jPrice      : JQuery;
  private static var _price       : Int;

  public static function init():Void {

    _jContact    = new JQuery('#contact');
    _jContactBox = _jContact.find('.contact-box');
    _jPrice      = _jContactBox.find('#price').find('span');
    _price       = 0;

  }

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(price:Int):Void {

    if (_price == price) return;

    _price = price;

    motion(Estimate.insertComma(Std.string(price)));
    calPriceSize(price);

  }

      /* =======================================================================
      Price Motion
      ========================================================================== */
      private static function motion(str:String):Void {

        var array : Array<String> = str.split("");
        var html  : String        = "";

        for (i in 0 ... array.length) {

          html += "<span>" + array[i] + "</span>";

        }

        _jPrice.html(html);

        var price : JQuery = _jPrice.find('span');
        var length: Int    = price.length;
        var g     : Int    = length;
        TweenMaxHaxe.set(price,{top:-40,opacity:0});

        for (i in 0 ... length) {
    
          g--;

          if (price.eq(g).text() == ',') {
            // TweenMaxHaxe.to(price.eq(g),0.1,{top:0,opacity:1,'font-size':60,ease:Elastic.easeOut,delay:i*0.1});
            // TweenMaxHaxe.to(price.eq(g),0.1,{top:0,opacity:1,'font-size':20,ease:Elastic.easeOut,delay:i*0.1 + 0.1});
            // continue;
          }

          TweenMaxHaxe.to(price.eq(g),0.1,{top:0,opacity:1,ease:Elastic.easeOut,delay:i*0.1});

        }

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
        if (txt == null) txt = str.split('url(')[1];
        var url    : String = txt.split('")')[0];
        if (url == null) url = txt.split(')')[0];
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
