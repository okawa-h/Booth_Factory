package src.drop;

import js.JQuery;
import jp.saken.utils.Dom;

class Juge {

  public static function init(event:JqEvent,_jArea:JQuery,_jItem:JQuery):Void {

    getPrice(event,_jArea,_jItem);

  }

  /* =======================================================================
  Start Drag
  ========================================================================== */
  public static function getPrice(event:JqEvent,_jArea:JQuery,_jItem:JQuery):Void {
    trace(_jArea.offset().top);

    var area_top   :Int = _jArea.offset().top;
    var area_bottom:Int = area_top + _jArea.height();
    var area_left  :Int = _jArea.offset().left;
    var area_right :Int = area_left + _jArea.width();

    for (i in 0 ... _jItem.length) {

      var t:JQuery = _jItem.eq(i);
      if (t.offset().top > area_top && t.offset().top + t.height() < area_bottom) {
        if (t.offset().left > area_left && t.offset().left + t.width() < area_right) {
          t.addClass('dropon');
        }
      }

    }

    trace(_jArea.find('dropon').length);

  }

}
