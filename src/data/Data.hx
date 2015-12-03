package src.data;

import js.JQuery;
import haxe.ds.ObjectMap;

class Data {

  public static function item():Array<String, Dynamic> {

    var array:Array<String, Dynamic> = new Array<String, Dynamic>();

    array[0].set(
      'id'   => 'utiwa',
      'price'=> 100,
      'type' => 'paper',
      'img'  => 'utiwa'
    );

    return array;

  }

}
