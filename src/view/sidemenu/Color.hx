package src.view.sidemenu;

import js.jquery.JQuery;
import js.jquery.Event;
import tween.TweenMaxHaxe;
import tween.easing.Expo;

class Color {

    private static var _jSidemenuRight : JQuery;
    private static var _jCloseBtn      : JQuery;
    private static var _jColorInner    : JQuery;
    private static var _jColorConfig   : JQuery;
    private static var _jColorList     : JQuery;

    /* =======================================================================
    Show
    ========================================================================== */
    public static function show(jBtn:JQuery):Void {

        _jSidemenuRight = new JQuery('#sidemenu-right');
        _jCloseBtn      = _jSidemenuRight.find('.close-btn');
        _jColorInner    = _jSidemenuRight.find('.color-inner');
        _jColorConfig   = _jSidemenuRight.find('.color-config');
        _jColorList     = _jColorInner.find('.color-list');

        if (jBtn.hasClass('open')) {

            hide(jBtn);
            return;

        }

        _jCloseBtn.show();

        TweenMaxHaxe.to(_jColorInner, 0.5, {x:-78,ease:Expo.easeOut});

        changeColor(jBtn,_jColorConfig);

        _jCloseBtn.on('mousedown',function(event:Event) {

            hide(jBtn);
            _jColorConfig.find('.close-btn').unbind('mousedown');

        });

    }

            /* =======================================================================
            Hide
            ========================================================================== */
            private static function hide(jBtn:JQuery):Void {

                _jCloseBtn.hide();
                jBtn.removeClass('open');
                TweenMaxHaxe.to(_jColorInner, 0.5, {x:0,ease:Expo.easeOut});

            }

            /* =======================================================================
            Change Color
            ========================================================================== */
            private static function changeColor(jBtn:JQuery,jbox:JQuery):Void {

                _jColorList.find('li').on('mousedown',function(event:Event) {

                    var jAreaObj : JQuery = new JQuery('#mainboard').find('.object');
                    var target   : JQuery = new JQuery(event.currentTarget);

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
