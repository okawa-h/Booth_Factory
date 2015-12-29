package src.view;

import js.JQuery;
import jp.saken.utils.Dom;
import src.Manager;
import src.view.Mainmenu;
import src.utils.Param;
import src.utils.Drag;

class Sidemenu {

  private static var _jBtnMatu  : JQuery;
  private static var _jBtnTake  : JQuery;
  private static var _jBtnUme   : JQuery;
  private static var _jBtnColor : JQuery;
  private static var _jColorList: JQuery;
  private static var _jBtnClear : JQuery;

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(data:Dynamic):Void {

    _jBtnMatu   = new JQuery('#set-name-matu');
    _jBtnTake   = new JQuery('#set-name-take');
    _jBtnUme    = new JQuery('#set-name-ume');
    _jBtnColor  = new JQuery('#color-btn');
    _jColorList = _jBtnColor.find('.color-list');
    _jBtnClear  = new JQuery('#help-btn');

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

        _jBtnColor.on('mousedown',function(event:JqEvent):Void {

          showChangeColor();

        });

        _jColorList.find('li').on('mousedown',function(event:JqEvent) {

          changeColor(JQuery.cur);

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
      private static function setPacage(data:String):Void {

        var url = untyped Dom.jWindow[0].location;
            url = Std.string(url);

        if (url.indexOf('obj') > -1) {

          Board.clear(); 

        }

        Param.change(data);
        Param.remakeObject();
        Drag.getObject();

      }

      /* =======================================================================
      Show Change Color
      ========================================================================== */
      private static function showChangeColor():Void {

        if (_jColorList.hasClass('open')) {
          _jColorList.animate({

            width:'0px',
            'margin-left':'0px'

          },function() {
            _jColorList.hide();
          });
          _jColorList.removeClass('open');

          return;
        }

        _jColorList.show();
        _jColorList.addClass('open');

        _jColorList.animate({

          width:'200px',
          'margin-left':'-150px'

        });

      }

      /* =======================================================================
      Show Change Color
      ========================================================================== */
      private static function changeColor(target:JQuery):Void {

        if (target.hasClass('current')) return;

        var cls : String = target.prop('class');

        _jBtnColor.removeClass();
        _jBtnColor.addClass(cls);
        _jColorList.find('li').removeClass('current');
        target.addClass('current');

      }

}
