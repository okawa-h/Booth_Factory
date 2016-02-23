package src.view;

import js.JQuery;
import haxe.Timer;
import src.Manager;
import src.utils.Resize;
import src.view.Mainboard;
import src.view.mainmenu.Scrollbar;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Expo;

class Mainmenu {

    private static var _jMainmenu  : JQuery;
    private static var _jBtn       : JQuery;
    private static var _Timer      : Timer;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _jMainmenu = new JQuery('#mainmenu');
        _jBtn      = _jMainmenu.find('.ttl').find('p');

        if (Resize.getRatio() < 0.75) _jMainmenu.addClass('ratio');

        var jRevertBtn : JQuery = _jMainmenu.find('.slider').find('ul li').find('.revertObj');

        Scrollbar.init(_jMainmenu);

        _jBtn.on('mousedown',function(event:JqEvent) {

            clickBtn(JQuery.cur,event);

        });

        _jMainmenu.on('mouseleave',function(event:JqEvent) {

            _Timer     = new Timer(1000);
            _Timer.run = close;

        });

        _jMainmenu.on('mouseover',function(event:JqEvent) {

            if (_Timer == null) return;
            _Timer.stop();

        });

        jRevertBtn.on('mousedown',function(event:JqEvent) {

            var jTar : JQuery = JQuery.cur.parent();
            var id   : String = jTar.prop('id');
            Mainboard.clear(id);
            jTar.removeClass('drop');

            return untyped false;

        });

    }

            /* =======================================================================
            Set Scroll Btn
            ========================================================================== */
            private static function setScrollBtn(jUp:JQuery,jDw:JQuery,scrollTop:Float,height:Int) {

                if (scrollTop > 0) {

                    jUp.show();

                } else {

                    jUp.hide();

                }

                if (scrollTop >= height - 220) {

                    jDw.hide();

                } else {

                    jDw.show();

                }

            }

            /* =======================================================================
            Click Btn
            ========================================================================== */
            private static function clickBtn(jThis:JQuery,event:JqEvent):Void {

                var cls     : String = jThis.prop('class');
                var jTarget : JQuery = _jMainmenu.find('.inner');
                var h       : Int    = jTarget.find('#' + cls).outerHeight() * (-1) + 1;

                addCurrent(cls);

                if(_jMainmenu.hasClass('close')) open(jTarget,h);

            }

            /* =======================================================================
            Open
            ========================================================================== */
            private static function open(jTarget:JQuery,h:Int):Void {

                clickClose();
                _jMainmenu.removeClass('close');
                _jMainmenu.addClass('open');
                TweenMaxHaxe.to(jTarget, 0.3, { top : h, ease:Expo.easeOut});

            }

            /* =======================================================================
            Close
            ========================================================================== */
            private static function close():Void {

                _jMainmenu.removeClass('open');
                _jMainmenu.addClass('close');
                TweenMaxHaxe.to(_jMainmenu.find('.inner'), 1, { top : 0, ease:Elastic.easeOut});
                _Timer.stop();

            }

            /* =======================================================================
            Add Current
            ========================================================================== */
            private static function addCurrent(cls:String):Void {

                _jMainmenu.find('div').removeClass('current');
                _jMainmenu.find('#' + cls).addClass('current');

            }

            /* =======================================================================
            Click Close
            ========================================================================== */
            private static function clickClose():Void {

                Dom.jWindow.on('mousedown touchstart',function(event:Dynamic) {

                    var y : Int = (event.pageY != null) ? event.pageY : event.originalEvent.touches[0].pageY;

                    if (_jMainmenu.find('.current').offset().top - 100 > y) {

                        if(_jMainmenu.hasClass('open')) {

                            _jMainmenu.removeClass('open');
                            _jMainmenu.addClass('close');
                            TweenMaxHaxe.to(_jMainmenu.find('.inner'), 1, { top : 0, ease:Elastic.easeOut});

                        }
                    }
                });

            }

    /* =======================================================================
    Add Drop
    ========================================================================== */
    public static function addDrop(id:String):Void {

        if (_jMainmenu.find('#' + id) == null) return;

        _jMainmenu.find('#' + id).addClass('drop');

    }

    /* =======================================================================
    Clear Drop
    ========================================================================== */
    public static function clearDrop(id:String):Void {

        if (id == 'all') {

            _jMainmenu.find('.drop').removeClass('drop');

        } else {

            _jMainmenu.find('#' + id).removeClass('drop');

        }

    }

    /* =======================================================================
    Get Mainmenu Dom
    ========================================================================== */
    public static function getMainmenuDom():JQuery {

        return _jMainmenu;

    }

}
