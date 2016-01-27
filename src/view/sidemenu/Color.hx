package src.view.sidemenu;

import js.JQuery;
import tween.TweenMaxHaxe;
import tween.easing.Expo;

class Color {

    private static var _jSidemenuRight : JQuery;
    private static var _jColorConfig   : JQuery;
    private static var _jColorList     : JQuery;

    /* =======================================================================
    Show
    ========================================================================== */
    public static function show(jBtn:JQuery):Void {

        _jSidemenuRight = new JQuery('#sidemenu-right');
        _jColorConfig   = _jSidemenuRight.find('.color-config');
        _jColorList     = _jColorConfig.find('.color-list');

        if (jBtn.hasClass('open')) {

            hide(jBtn);
            return;

        }

        _jColorConfig.fadeIn(300,function() {

            TweenMaxHaxe.set(_jColorConfig, { x : 0 });
            TweenMaxHaxe.to(_jColorConfig, 0.2, { width : 100 , x : 0, ease:Expo.easeOut, 
                onComplete:function() {

                    _jColorList.fadeIn();
                    jBtn.addClass('open');

                }
            });

            TweenMaxHaxe.to(_jColorConfig, 0.2, { height : 140,delay : 0.4  , ease:Expo.easeOut});

        });

        changeColor(jBtn,_jColorConfig);

        _jColorConfig.find('.close-btn').on('mousedown',function(event:JqEvent) {

            hide(jBtn);
            _jColorConfig.find('.close-btn').unbind('mousedown');

        });

    }

            /* =======================================================================
            Hide
            ========================================================================== */
            private static function hide(jBtn:JQuery):Void {

                _jColorConfig.stop().fadeOut(300,function() {

                    _jColorConfig.css({ width:0, height:0 });
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
