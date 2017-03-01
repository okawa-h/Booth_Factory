package src.view;

import haxe.Timer;
import js.jquery.JQuery;
import js.jquery.Event;
import src.Manager;
import src.utils.Resize;
import src.view.Mainboard;
import src.view.mainmenu.Scrollbar;
import src.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Expo;

class Mainmenu {

    private static var _jMainmenu  : JQuery;
    private static var _jFooter    : JQuery;
    private static var _jBtn       : JQuery;
    private static var _Timer      : Timer;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _jMainmenu = new JQuery('#mainmenu');
        _jFooter   = new JQuery('#footer');
        _jBtn      = _jMainmenu.find('.ttl').find('p');

        if (Resize.getRatio() < 0.75) _jMainmenu.addClass('ratio');

        var jRevertBtn : JQuery = _jMainmenu.find('.slider').find('ul li').find('.revertObj');

        Scrollbar.init(_jMainmenu);

        adjustBoxHeight();

        Dom.jWindow.on('resize',function(event:Event) {

            adjustBoxHeight();

        });

        _jBtn.on('mousedown',function(event:Event) {

            clickBtn(new JQuery(event.currentTarget),event);

        });

        Dom.jWindow.on('mousemove',function(event:Event) {

            moveUpMenu(event);

        });

        _jMainmenu.on('mouseleave',function(event:Event) {

            _Timer     = new Timer(1000);
            _Timer.run = close;

        });

        _jMainmenu.on('mouseover',function(event:Event) {

            if (_Timer == null) return;
            _Timer.stop();

        });

        jRevertBtn.on('mousedown',function(event:Event) {

            var jTar : JQuery = new JQuery(event.currentTarget).parent();
            var id   : String = jTar.prop('id');
            Mainboard.clear(id);
            jTar.removeClass('drop');

            return untyped false;

        });

    }

            /* =======================================================================
            Move Up Menu
            ========================================================================== */
            private static function moveUpMenu(event:Event):Void {

                var menuTop : Float = _jMainmenu.offset().top - _jBtn.height() - 20;
                var footTop : Float = _jFooter.offset().top;
                var y       : Float = event.pageY;

                if (_jMainmenu.hasClass('open')) {
                    TweenMaxHaxe.to(_jMainmenu,.1,{'margin-bottom':'0'});
                    return;
                };

                if (menuTop < y && footTop > y) {
                    TweenMaxHaxe.to(_jMainmenu,.3,{'margin-bottom':'30px'});
                } else {
                    TweenMaxHaxe.to(_jMainmenu,.3,{'margin-bottom':'0'});
                }

            }

            /* =======================================================================
            Adjust Box Height
            ========================================================================== */
            private static function adjustBoxHeight():Void {

                var jSlider = _jMainmenu.find('.slider');

                for (i in 0 ... jSlider.length) {

                    setBoxHeight(jSlider.eq(i).find('ul'));
                    
                }
            }

            /* =======================================================================
            Adjust Box Height
            ========================================================================== */
            private static function setBoxHeight(jTarget:JQuery):Void {

                var jList    : JQuery = jTarget.find('li');
                var length   : Int = jList.length;
                var parWidth : Float = jTarget.width();
                var width    : Float = jList.width() + Std.parseInt(jList.css('margin-left'));
                var column   : Int = Math.floor(parWidth / width);
                var height   : Float = 0;
                var point    : Int = 0;

                jList.removeAttr('style');

                for (i in 0 ... length) {

                    var jTar : JQuery = jList.eq(i);
                    var h    : Float    = jTar.height();

                    if (h > height) height = h;

                    // if (i % column == 0) {

                    //     var k : Int = point + column - 1;

                    //     for (j in 0 ... column) {
                    //         trace(k);

                    //         var paddingTop : Int = (height - jList.eq(k).height());
                    //         jList.eq(k).css({"padding-bottom": paddingTop});
                    //         k--;
                            
                    //     }

                    //     height = 0;
                    //     point  = i;

                    // }
                    
                }

                jList.height(height);

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
            private static function clickBtn(jThis:JQuery,event:Event):Void {

                var cls     : String = jThis.prop('class');
                var jTarget : JQuery = _jMainmenu.find('.inner');
                var h       : Float  = jTarget.find('#' + cls).outerHeight() * (-1) + 1;

                addCurrent(cls);

                if(_jMainmenu.hasClass('close')) open(jTarget,h);

            }

            /* =======================================================================
            Open
            ========================================================================== */
            private static function open(jTarget:JQuery,h:Float):Void {

                clickClose();
                _jMainmenu.removeClass('close');
                _jMainmenu.addClass('open');
                TweenMaxHaxe.to(_jMainmenu,.1,{'margin-bottom':'0'});
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
