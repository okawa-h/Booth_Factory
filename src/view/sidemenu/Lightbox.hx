package src.view.sidemenu;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Sine;
import tween.easing.Back;

class Lightbox extends Sidemenu {

  private static var _jLightBox : JQuery;

  public function new():Void {

    super();

  }

  /* =======================================================================
  init
  ========================================================================== */
  public static function init(jLightBox:JQuery):Void {

    _jLightBox = jLightBox;

  }

  /* =======================================================================
  Show
  ========================================================================== */
  public static function show(cls:String,jBtn:JQuery):Void {

    var jbox : JQuery = _jLightBox.find('.' + cls);
    var sPEED: Int    = 300;

    jbox.width(50);
    _jLightBox.fadeIn(sPEED,function() {

      jbox.show();
      TweenMaxHaxe.to(jbox, 1, { width : 300 , ease:Elastic.easeOut});
      // jbox.animate({
      //   width: '300px'
      // });

    });

    if (cls == "color") changeColor(jBtn,jbox);

    jbox.find('.close-btn').on('mousedown',function(event:JqEvent) {

      jbox.fadeOut(sPEED);
      _jLightBox.fadeOut(sPEED);

      untyped jbox.find('.close-btn').off('mousedown');

    });

  }

      /* =======================================================================
      Change Color
      ========================================================================== */
      private static function changeColor(jBtn:JQuery,jbox:JQuery):Void {

        var jColorList : JQuery = jbox.find('.color-list');
        
        jColorList.find('li').on('mousedown',function(event:JqEvent) {

          var jAreaObj : JQuery = new JQuery('#mainboard').find('.object');
          var target   : JQuery = JQuery.cur;

          if (target.hasClass('current')) return;

          var cls : String = target.prop('class');

          jBtn.removeClass();
          jBtn.addClass(cls);
          jColorList.find('li').removeClass('current');
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
