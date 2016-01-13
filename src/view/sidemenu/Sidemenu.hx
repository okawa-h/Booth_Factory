package src.view.sidemenu;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;
import src.view.mainmenu.Mainmenu;
import src.view.sidemenu.Lightbox;
import src.view.sidemenu.Color;
import src.utils.Param;
import src.utils.Drag;

class Sidemenu {

  private static var _jBtnMatu  : JQuery;
  private static var _jBtnTake  : JQuery;
  private static var _jBtnUme   : JQuery;
  private static var _jBtnColor : JQuery;
  private static var _jBtnHelp  : JQuery;
  private static var _jLightBox : JQuery;

  public function new() {
  }

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(data:Dynamic):Void {

    _jBtnMatu   = new JQuery('#set-name-matu');
    _jBtnTake   = new JQuery('#set-name-take');
    _jBtnUme    = new JQuery('#set-name-ume');
    _jBtnColor  = new JQuery('#color-btn');
    _jBtnHelp   = new JQuery('#help-btn');
    _jLightBox  = new JQuery('#lightbox');

    Lightbox.init(_jLightBox);

    setRightMenu(data);

  }

      /* =======================================================================
      Set right Menu
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

        _jBtnColor.on('mousedown',function(event:JqEvent):Void {

          Color.show(JQuery.cur);

        });

        _jBtnHelp.on('mousedown',function(event:JqEvent) {

          Lightbox.show('help',JQuery.cur);

        });

        new JQuery('#contact-btn').find('a').on('mousedown',function(event:JqEvent):Void {

          setPacage('?');
          Price.clear();
          ProductLength.clear();
          Mainmenu.clearDrop('all');

        });

      }

      /* =======================================================================
      Set Pacage
      ========================================================================== */
      private static function setPacage(data:String):Void {

        var url = untyped Dom.jWindow[0].location;
            url = Std.string(url);

        if (url.indexOf('_x') > -1) {

          Board.clear(); 

        }

        Param.change(data);
        Param.remakeObject();
        Drag.getObject();

      }

}
