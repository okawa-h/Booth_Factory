package src.view.sidemenu;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Expo;

class Color {

  private static var _jbox       : JQuery;
  private static var _jColorList : JQuery;

  /* =======================================================================
  Show
  ========================================================================== */
  public static function show(jBtn:JQuery):Void {

    _jbox       = new JQuery('.color-config');
    _jColorList = _jbox.find('.color-list');

    if (jBtn.hasClass('open')) {

      hide(jBtn);
      return;

    }

    _jbox.fadeIn(300,function() {

      TweenMaxHaxe.set(_jbox, { x : 0 });
      TweenMaxHaxe.to(_jbox, 0.2, { width : 100 , x : 0, ease:Expo.easeOut, 
        onComplete:function() {

          _jColorList.fadeIn();
          jBtn.addClass('open');

        }
      });

      TweenMaxHaxe.to(_jbox, 0.2, { height : 140,delay : 0.4  , ease:Expo.easeOut});

    });

    changeColor(jBtn,_jbox);

    _jbox.find('.close-btn').on('mousedown',function(event:JqEvent) {

      hide(jBtn);

      _jbox.find('.close-btn').unbind('mousedown');

    });

  }

      /* =======================================================================
      Hide
      ========================================================================== */
      private static function hide(jBtn:JQuery):Void {

        _jbox.stop().fadeOut(300,function() {

          _jbox.css({ width:0, height:0 });
          _jColorList.hide();
          jBtn.removeClass('open');

        });

      }

      /* =======================================================================
      Change Color
      ========================================================================== */
      private static function changeColor(jBtn:JQuery,jbox:JQuery):Void {

        _jColorList.find('li').on('mousedown',function(event:JqEvent) {

          var jAreaObj : JQuery = new JQuery('#mainboard').find('.object');
          var target   : JQuery = JQuery.cur;

          if (target.hasClass('current')) return;

          var cls : String = target.prop('class');

          jBtn.removeClass();
          jBtn.addClass(cls);
          _jColorList.find('li').removeClass('current');
          target.addClass('current');

          if (jAreaObj != null) changeObjColor(jAreaObj,cls);

        });

      }

      /* =======================================================================
      Change Obj Color
      ========================================================================== */
      private static function changeObjColor(jAreaObj:JQuery,cls:String):Void {

        var length : Int = jAreaObj.length;

        for (i in 0 ... length) {

          var jObj  : JQuery = jAreaObj.eq(i).find('img');
          var src   : String = jObj.prop('src');
          var array : Array<String> = src.split('/');
          var color : String = array[array.length - 2];
          var newSrc: String = src.split('/' + color + '/').join('/' + cls + '/');
          jObj.prop('src',newSrc);

        }

      }

}
