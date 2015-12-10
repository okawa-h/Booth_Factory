package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import src.operation.Param;
import src.operation.Drag;

class Sidemenu {

  private static var _jBtnMatu : JQuery;
  private static var _jBtnTake : JQuery;
  private static var _jBtnUme  : JQuery;
  private static var _jBtnClear: JQuery;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(data:Dynamic):Void {

    _jBtnMatu  = new JQuery('#set-name-matu');
    _jBtnTake  = new JQuery('#set-name-take');
    _jBtnUme   = new JQuery('#set-name-ume');
    _jBtnClear = new JQuery('#help-btn');

    onRightMenu(data);

  }

      /* =======================================================================
      On right Menu
      ========================================================================== */
      private static function onRightMenu(data:Dynamic):Void {

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
          Price.change(0);
          ProductLength.change(0,0,0);

        });

      }

      /* =======================================================================
      Set Pacage
      ========================================================================== */
      private static function setPacage(data:String) {

          var url = Dom.window.location.search;
          if (url.indexOf('obj') > -1) {

            Board.clear(); 

          }

          Param.change(data);
          Param.remakeObject();
          Drag.on();

      }

}
