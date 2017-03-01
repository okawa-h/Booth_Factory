package src.view;

import js.jquery.JQuery;
import src.view.mainboard.Human;

class Mainboard {

    private static var _jMainboard : JQuery;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _jMainboard = new JQuery('#mainboard');

        Human.init(_jMainboard);

    }

    /* =======================================================================
    Get Main Board
    ========================================================================== */
    public static function getMainboardDom():JQuery {

        return _jMainboard;

    }

    /* =======================================================================
    Clear Board Object
    ========================================================================== */
    public static function clear(cls:String = null):Void {

        if (cls == null) {

            _jMainboard.find('.object').remove();
            
        } else {

            _jMainboard.find('.' + cls).remove();
            
        }

    }

    /* =======================================================================
    Count Board Object
    ========================================================================== */
    public static function count(_jAreaObj:JQuery,length:Int):Array<Int> {

        var jAreaObj    : JQuery     = _jAreaObj;
        var lengthArray : Array<Int> = [0,0,0,0];

        if (length > 0) {

            lengthArray = loop(jAreaObj,length);

        }

        return lengthArray;
    }

            /* =======================================================================
            Count Set
            ========================================================================== */
            private static function loop(jItem:JQuery,length:Int):Array<Int> {

                var price           : Int = 0;
                var accessoryLength : Int = 0;
                var bannerLength    : Int = 0;
                var paperLength     : Int = 0;

                for (i in 0 ... length) {

                    var catData   : String = jItem.eq(i).data('cat');
                    var priceData : Int    = jItem.eq(i).data('price');

                    if (catData == "accessory") accessoryLength++;
                    if (catData == "banner") bannerLength++;
                    if (catData == "paper") paperLength++;
                    price += priceData;

                }

                return [accessoryLength,bannerLength,paperLength,price];
            }

    /* =======================================================================
    Talk Human
    ========================================================================== */
    public static function talkHuman(str:String):Void {

        // Human.comment(new JQuery(event.currentTarget),str);

    }

}
