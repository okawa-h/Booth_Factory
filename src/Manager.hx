package src;

import js.jquery.JQuery;
import js.jquery.Event;
import src.utils.Drag;
import src.utils.ItemData;
import src.utils.Log;
import src.utils.Resize;
import src.utils.UrlParameter;
import src.view.Mainboard;
import src.view.Mainmenu;
import src.view.Price;
import src.view.ProductLength;
import src.view.Sidemenu;
import src.view.Trash;
import src.view.Intro;
import src.utils.Dom;

class Manager {

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init(event:Event):Void {

        Resize.init();
        Intro.start();
        ItemData.set(start);
        Log.write();

    }

    /* =======================================================================
    Start
    ========================================================================== */
    public static function start():Void {

        Mainboard.init();
        UrlParameter.init();
        Price.init();
        Mainmenu.init();
        Sidemenu.init();
        ProductLength.init();
        Trash.init();

        UrlParameter.remakeObject();
        setCounter();
        Drag.init();

        Dom.jWindow.on('mouseup touchend',function(event:Event) {

            setCounter();
            Log.write();
            Trash.hide();

        });

    }

    /* =======================================================================
    Set Price Length パラメタ書き換え、左サイド書き換え
    ========================================================================== */
    public static function setCounter():Void {

        Drag.addBoardObj(Mainboard.getMainboardDom().find('.object'));
        var jBoardObj   : JQuery     = Drag.getBoardObj();
        var length      : Int        = (jBoardObj == null) ? 0 : jBoardObj.length;
        var lengthArray : Array<Int> = Mainboard.count(jBoardObj,length);

        for (i in 0 ... length) {

            Mainmenu.addDrop(jBoardObj.eq(i).data('id'));

        }

        var accessoryLength : Int = lengthArray[0];
        var bannerlength    : Int = lengthArray[1];
        var paperLength     : Int = lengthArray[2];
        var price           : Int = lengthArray[3];

        ProductLength.change(accessoryLength,bannerlength,paperLength);
        Price.change(price);
        UrlParameter.change('?' + UrlParameter.getParameter(jBoardObj,length,price));

    }

}
