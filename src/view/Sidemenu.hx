package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;
import src.operation.Param;
import src.operation.Drag;
import src.view.Mainmenu;

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

    setRightMenu(data);

  }

      /* =======================================================================
      On right Menu
      ========================================================================== */
      private static function setRightMenu(data:Dynamic):Void {

        _jBtnMatu.on('mousedown',function(event:JqEvent):Void {

          setPacage(data.set[0].url);

        });

        _jBtnTake.on('mousedown',function(event:JqEvent):Void {

          setPacage(data.set[1].url);

        });

        _jBtnUme.on('mousedown',function(event:JqEvent):Void {

          setPacage(data.set[2].url);

        });

        _jBtnClear.on('mousedown',function(event:JqEvent):Void {

          setPacage('?');
          Price.clear();
          ProductLength.clear();
          Mainmenu.clearDrop('all');

        });

      }

      /* =======================================================================
      Set Pacage
      ========================================================================== */
      private static function setPacage(data:String) {

        var url = untyped Dom.jWindow[0].location;
            url = Std.string(url);

        if (url.indexOf('obj') > -1) {

          Board.clear(); 

        }

        Param.change(data);
        Param.remakeObject();
        Drag.getObject();

      }

}
