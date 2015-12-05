package src;

import js.JQuery;
import haxe.Json;
import jp.saken.utils.Dom;
import src.data.Data;
import src.drop.Drop;
import src.judge.Judge;
import src.judge.Log;
import src.operation.Clear;
import src.operation.Change;
import src.animate.Animate;

class Manager {

	public static var _jMenu   : JQuery;
  public static var _jArea   : JQuery;
  public static var _jPrice  : JQuery;
  public static var _jBtnMatu: JQuery;
  public static var _jBtnTake: JQuery;
  public static var _jBtnUme : JQuery;
  public static var _jBtnClear: JQuery;
  public static var _lengthAccessory: JQuery;
  public static var _lengthBanar: JQuery;
  public static var _lengthPaper: JQuery;
  public static var _Data    : Json;

	public static function init(event:JqEvent):Void {

    _jMenu  = new JQuery('#mainmenu');
    _jArea  = new JQuery('#mainboard');
    _jPrice = new JQuery('#contact').find('#price');

    _jBtnMatu = new JQuery('#set-name-matu');
    _jBtnTake = new JQuery('#set-name-take');
    _jBtnUme  = new JQuery('#set-name-ume');
    _jBtnClear  = new JQuery('#help-btn');

    _lengthAccessory = new JQuery('#length-accessory').find('.item-length').find('span');
    _lengthBanar = new JQuery('#length-Banar').find('.item-length').find('span');
    _lengthPaper = new JQuery('#length-Paper').find('.item-length').find('span');

    Data.get(start);

	}

  public static function start():Void {

    Log.checkUrl();
    Drop.init();
    Judge.init();
    Animate.init();
    setRightMenu();

  }

  public static function setRightMenu():Void {

    var data:Dynamic = _Data;

    _jBtnMatu.on('click',function(event:JqEvent):Void {

      setPacage(data.set[0].url);

    });
    _jBtnTake.on('click',function(event:JqEvent):Void {

      setPacage(data.set[1].url);

    });
    _jBtnUme.on('click',function(event:JqEvent):Void {

      setPacage(data.set[2].url);

    });
    _jBtnClear.on('click',function(event:JqEvent):Void {

      setPacage('?');
      Change.changePrice(0);
      Change.changeProductLength(0,0,0);

    });

  }

  private static function setPacage(data) {

      var url = Dom.window.location.search;
      if (url.indexOf('obj') > -1) {

        Clear.clearBoardObj(); 

      }

      Change.changeURLParam(data);
      Log.checkUrl();

  }

}
