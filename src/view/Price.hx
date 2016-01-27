package src.view;

import js.JQuery;
import jp.okawa.utils.Estimate;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;

class Price {

    private static var _jContact    : JQuery;
    private static var _jContactBox : JQuery;
    private static var _jImg        : JQuery;
    private static var _jPrice      : JQuery;
    private static var _price       : Int;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _jContact    = new JQuery('#contact');
        _jContactBox = _jContact.find('.contact-box');
        _jImg        = _jContactBox.find('#price').find('img');
        _jPrice      = _jContactBox.find('#price').find('span');
        _price       = 0;

        _jImg.on('mousedown',function(event:JqEvent) {
            
            event.preventDefault();
            var jTarget : JQuery = JQuery.cur;
            jTarget.parent().append(jTarget.clone().addClass('coin').css({position:'absolute',left:'15px'}));

            TweenMaxHaxe.to(jTarget.parent().find('.coin'),0.3,{y:-60,opacity:0,
                onComplete:function() {

                    jTarget.parent().find('.coin').remove();
                }
            });
        });

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

                var price  : JQuery = _jPrice.find('span');
                var length : Int    = price.length;
                var g      : Int    = length;
                TweenMaxHaxe.set(price,{top:-40,opacity:0});

                for (i in 0 ... length) {

                    g--;
                    TweenMaxHaxe.to(price.eq(g),0.1,{top:0,opacity:1,ease:Elastic.easeOut,delay:i*0.1});

                }

            }

            /* =======================================================================
            Price Size
            ========================================================================== */
            private static function calPriceSize(price:Int):Void {

                var jImg : JQuery        = _jContactBox.find('#price').find('img');

                var array: Array<String> = jImg.prop('src').split('/');
                var len  : Int           = jImg.prop('src').split('/').length;
                var now  : String        = array[len - 1];
                var val  : String        = "ss.png";

                if (price < 10000) val = 'ss.png';

                if (price > 10000 && price < 100000) val = 's.png';

                if (price > 100000 && price < 200000) val = 'm.png';

                if (price > 200000) val = 'l.png';


                var newImg : Array<String> = now.split('_');
                newImg[newImg.length-1] = val;
                var newSrc = newImg.join('_');
                array[len - 1] = newSrc;

                jImg.prop('src',array.join('/'));

            }

    /* =======================================================================
    Clear
    ========================================================================== */
    public static function clear():Void {

        _jPrice.text('0');

    }

}
