package src.view;

import js.JQuery;

class ProductLength {

  /* =======================================================================
  Change
  ========================================================================== */
  public static function change(accessoryLength:Int,banarLength:Int,paperLength:Int):Void {

    new JQuery('#length-accessory').find('.item-length').find('span').text(cast(accessoryLength));
    new JQuery('#length-banar').find('.item-length').find('span').text(cast(banarLength));
    new JQuery('#length-paper').find('.item-length').find('span').text(cast(paperLength));

  }

}
