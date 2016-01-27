package src.utils;

import js.JQuery;
import src.Manager;
import src.utils.Html;
import src.utils.ItemData;
import src.utils.UrlParameter;
import src.view.Mainboard;
import src.view.Mainmenu;
import src.view.Trash;
import jp.saken.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Elastic;
import tween.easing.Expo;

class Drag {

    private static var _isGrabbed  : Bool;
    private static var _jGrabObj   : JQuery;
    private static var _jMainboard : JQuery;
    private static var _jBoardObj  : JQuery;
    private static var _jMainmenu  : JQuery;
    private static var _diffX      : Float;
    private static var _diffY      : Float;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _isGrabbed  = false;
        _jMainboard = Mainboard.getMainboardDom();
        _jMainmenu  = Mainmenu.getMainmenuDom();

        _jMainmenu.find('.slider').find('li').find('.img').on({ 'mousedown touchstart' : grab });

        Dom.jWindow.on({

            'mousemove':mousemove,
            'touchmove':mousemove,
            'mouseup'  :mouseup,
            'touchend' :mouseup

        });

        setBoardObj();

    }

    /* =======================================================================
    Set Grab Obj
    ========================================================================== */
    public static function setBoardObj():Void {

        _jBoardObj = _jMainboard.find('.object');

        _jBoardObj.on({ 'mousedown touchstart' : grab });
        _jBoardObj.on({ 'mouseover touchstart' : showOption });

    }

            /* =======================================================================
            Grab
            ========================================================================== */
            private static function grab(event:JqEvent):Void {

                event.preventDefault();

                _jGrabObj = JQuery.cur;

                if (_jGrabObj.hasClass('drop')) return;
                getDiff(event);
                var w : Float = 0;
                if (_jGrabObj.hasClass('img')) w = (_jGrabObj.parent().parent('li').width() - _jGrabObj.find('img').width())/2;

                _jGrabObj.css({

                    'top'  : untyped event.clientY - _diffY,
                    'left' : untyped event.clientX - _diffX + w

                });

                _isGrabbed = true;

                if (_jGrabObj.hasClass('object')) Trash.show();
                _jGrabObj.addClass('grab');

            }

            /* =======================================================================
            Mouse Move
            ========================================================================== */
            private static function mousemove(event:JqEvent):Void {

                if (_isGrabbed) {

                    _jGrabObj.css({

                        'top'     : untyped event.clientY - _diffY,
                        'left'    : untyped event.clientX - _diffX

                    });

                    Trash.onObj(_jGrabObj);

                }

            }

            /* =======================================================================
            Mouse Up
            ========================================================================== */
            private static function mouseup(event:JqEvent):Void {

                _isGrabbed = false;
                if (_jGrabObj == null) return;

                if (_jGrabObj.hasClass('grab')) {

                    Trash.leaveObj(_jGrabObj);

                    var h : Int = new JQuery('#header').height();
                    var w : Int = _jMainboard.offset().left;

                    _jGrabObj.css({

                        'top'  : event.pageY - h - _diffY,
                        'left' : event.pageX - w - _diffX

                    });

                    _jGrabObj.removeClass('grab');

                }

                if (_jGrabObj.hasClass('img')) {

                    if (_jMainmenu.find('.current').offset().top > event.pageY) {

                        _jGrabObj.parent().parent('li').addClass('drop');
                        listToObj(_jGrabObj.parent().parent('li'),event);

                        _jBoardObj.unbind('mousedown');
                        setBoardObj();

                    }
                }

                isOnBoard(_jGrabObj);
                _jGrabObj.css({'opacity':1});
                _jGrabObj = null;

            }

            /* =======================================================================
            Get Diff
            ========================================================================== */
            private static function getDiff(event:Dynamic):Void {

                _diffY = event.offsetY;
                _diffX = event.offsetX;

            }

            /* =======================================================================
            Create Img
            ========================================================================== */
            private static function listToObj(jTarget:JQuery,event:JqEvent):Void {

                var id    : String = jTarget.data('id');
                var type  : String = jTarget.data('type');
                var cat   : String = jTarget.data('cat');
                var icon  : String = jTarget.data('icon');
                var price : String = Std.string(jTarget.data('price'));
                if (price.indexOf(',') > -1) price = price.split(',').join('');
                var length: String = jTarget.find('dl').find('dd.length').text();
                var color : String = UrlParameter.getParamOption('color');
                var top   : Float  = event.pageY - new JQuery('#header').height() - _diffY;
                var left  : Float  = event.pageX - _jMainboard.offset().left - _diffX;

                if (type == "accessory" || type == "clothes") {

                    var abs : Array<String> = jTarget.data('abs').split(',');
                    top  = Std.parseFloat(abs[0]);
                    left = Std.parseFloat(abs[1]);

                }

                if (type == "clothes") {

                    Mainmenu.clearDrop(_jBoardObj.filter('.clothes').data('id'));
                    _jBoardObj.filter('.clothes').remove();

                }

                var html   : String = Html.getObj(id,top,left,type,cat,Std.parseInt(price),length,icon,color);
                var jBoard : JQuery = _jMainboard.find('.board');

                jBoard.append(html);
                _jGrabObj = jBoard.find('.object.' + id);

                TweenMaxHaxe.set(_jGrabObj, {scaleX:1.4, scaleY:1.4});
                TweenMaxHaxe.to(_jGrabObj, 0.3,{scaleX:1, scaleY:1, ease:Elastic.easeOut,delay:0.1,
                    onComplete:function() {

                        Manager.resizeDom(jBoard.find('.object.' + id),false);

                    }
                });

            }

            /* =======================================================================
            Is On Board
            ========================================================================== */
            private static function isOnBoard(jTarget:JQuery):Void {

                var top    : String = jTarget.css('top').split('px').join('');
                var left   : String = jTarget.css('left').split('px').join('');
                var t      : Int    = Std.parseInt(top);
                var l      : Int    = Std.parseInt(left);
                var bottom : Int    = t + jTarget.height();
                var right  : Int    = l + jTarget.width();
                var areaB  : Int    = _jMainboard.height();
                var areaR  : Int    = _jMainboard.width();

                if (top.indexOf('-') == 0)  t = 0;
                if (left.indexOf('-') == 0) l = 0;
                if (bottom > areaB) t = areaB - jTarget.height();
                if (right > areaR)  l = areaR - jTarget.width();

                if (jTarget.hasClass('accessory') || jTarget.hasClass('clothes')) {

                    if (Trash.isOnObj(jTarget)) return;
                    var abs : Array<String> = getAbsPoint(jTarget);
                    t = Std.parseInt(abs[0]);
                    l = Std.parseInt(abs[1]);

                }

                TweenMaxHaxe.to(jTarget,0.5,{top: t, left : l,delay:0.05,ease:Expo.easeOut});

            }

            /* =======================================================================
            Absolute Position
            ========================================================================== */
            private static function getAbsPoint(jTarget:JQuery):Array<String> {

                var id    : String        = jTarget.data('id');
                var data  : Dynamic       = ItemData.getObjData();
                var length: Int           = data.length;
                var array : Array<String> = [];

                for (i in 0 ... length) {

                    if (data[i].id == Std.string(id)) array = data[i].abs;

                }

                return array;
            }

            /* =======================================================================
            Show Option
            ========================================================================== */
            private static function showOption(event:JqEvent):Void {

                var jTarget : JQuery = JQuery.cur;
                var length  : String = jTarget.data('length');
                var price   : String = jTarget.data('price');
                var html    : String = '<span class="object-data"><span>' + length + '<br>';
                html += price + '円</span></span>';
                jTarget.append(html);

                jTarget.on('mouseleave touchend',function(event:JqEvent) {

                    jTarget.find('.object-data').remove();
                    jTarget.unbind('mouseleave touchend');

                });

            }

    /* =======================================================================
    Get Grab Obj
    ========================================================================== */
    public static function getGrabObj():JQuery {

        return _jGrabObj;

    }

    /* =======================================================================
    Get Board Obj
    ========================================================================== */
    public static function getBoardObj():JQuery {

        return _jBoardObj;

    }

    /* =======================================================================
    Add Board Obj
    ========================================================================== */
    public static function addBoardObj(jBoardObj:JQuery):Void {

        _jBoardObj = jBoardObj;

    }

}
