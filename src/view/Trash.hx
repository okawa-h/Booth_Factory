package src.view;

import js.jquery.JQuery;
import src.Manager;
import src.utils.Drag;
import src.view.Mainmenu;
import src.utils.Dom;
import tween.TweenMaxHaxe;
import tween.easing.Circ;
import tween.easing.Elastic;

class Trash {

    private static var _jTrash       : JQuery;
    private static var _jTrashBox    : JQuery;
    private static var _jTrashFront  : JQuery;
    private static var _jTrashArrow  : JQuery;
    private static var _jTrashBg     : JQuery;
    private static var _arrowAnimate : TweenMaxHaxe;
    private static var _isGrabbed    : Bool;
    private static var _isAnimate    : Bool;
    private static var _isShow       : Bool;
    private static var _grabPosition : Float;

    /* =======================================================================
    Init
    ========================================================================== */
    public static function init():Void {

        _jTrash      = new JQuery('#trash');
        _jTrashBox   = _jTrash.find('.trash-box');
        _jTrashFront = _jTrash.find('.trash-front');
        _jTrashArrow = _jTrash.find('.trash-arrow');
        _jTrashBg    = _jTrash.find('.trash-bg');
        _isGrabbed   = false;
        _isAnimate   = false;
        _isShow      = false;

    }

    /* =======================================================================
    On Obj
    ========================================================================== */
    public static function onObj(jTarget:JQuery):Void {

        if (isOnObj(jTarget)) {

            jTarget.css({opacity:'0'});
            if (_isAnimate) return;
            _isAnimate = true;

            TweenMaxHaxe.to(_jTrashBox, 1, {scaleX:1.4, scaleY:1.4, ease:Elastic.easeOut});
            TweenMaxHaxe.to(_jTrashFront, 1, {scaleX:1.4, scaleY:1.4, ease:Elastic.easeOut});
            TweenMaxHaxe.to(_jTrashBg,1,{scaleX:0.95, scaleY:0.95, ease:Elastic.easeOut});

        } else {

            jTarget.css({opacity:'0.9'});
            if (!_isAnimate) return;
            _isAnimate = false;
            
            TweenMaxHaxe.to(_jTrashBox, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});
            TweenMaxHaxe.to(_jTrashFront, 1, {scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});
            TweenMaxHaxe.to(_jTrashBg,1,{scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut});

        }

    }

    /* =======================================================================
    Leave Obj
    ========================================================================== */
    public static function leaveObj(jTarget:JQuery):Void {

        deleteObj(jTarget);

    }

    /* =======================================================================
    Hide
    ========================================================================== */
    public static function hide():Void {

        _isShow = false;

        if (!_isGrabbed) {

            TweenMaxHaxe.to(_jTrashArrow,0.05,{y:60,
                onComplete:function() {

                    _jTrashArrow.hide();
                    TweenMaxHaxe.set(_jTrashArrow,{y:0});

                }
            });

            TweenMaxHaxe.to(_jTrashFront,0.05,{y:60,
                onComplete:function() {

                    _jTrashFront.hide();
                    TweenMaxHaxe.set(_jTrashFront,{y:0});

                }
            });

            TweenMaxHaxe.to(_jTrashBox,0.05,{y:60,
                onComplete:function() {

                    _jTrashBox.hide();
                    _jTrashBg.stop().fadeOut(100);
                    TweenMaxHaxe.set(_jTrashBox,{y:0});
                    if (_arrowAnimate != null) _arrowAnimate.pause(0);

                }
            });

        }

    }

    /* =======================================================================
    Show
    ========================================================================== */
    public static function show(event:Dynamic):Void {

        if (_grabPosition + 80 > event.pageY &&
             _grabPosition - 80 < event.pageY) return;

        if (_isShow) return;

        _isShow = true;

        TweenMaxHaxe.set(_jTrashArrow,{y:60});

        _jTrashArrow.show();
        _jTrashBox.show();
        _jTrashFront.show();
        _jTrashBg.stop().fadeIn(100);

        TweenMaxHaxe.to(_jTrashBox,0.05,{y:-30,
            onComplete:function() {

                TweenMaxHaxe.to(_jTrashBox,0.05,{y:0});
            }
        });

        TweenMaxHaxe.to(_jTrashFront,0.05,{y:-30,
            onComplete:function() {

                TweenMaxHaxe.to(_jTrashFront,0.05,{y:0});
            }
        });

        _arrowAnimate = TweenMaxHaxe.to(_jTrashArrow , 0.8 , {y:30,repeat:-1,yoyo : true,ease: Circ.easeOut});

    }

            /* =======================================================================
            Delete Object
            ========================================================================== */
            private static function deleteObj(jTarget:JQuery):Void {

                if (isOnObj(jTarget)) {

                    _isGrabbed = true;
                    jTarget.css({'z-index':'3000'}).css({opacity:'1'});

                    if (_jTrashBox.width() < jTarget.width()) TweenMaxHaxe.to(jTarget, 0.2, {scaleX:0.6, scaleY:0.7});

                    var trashTop : Float   = _jTrashBox.offset().top;
                    var trashBtm : Float   = trashTop + _jTrashBox.height();
                    var tarBtm   : Float   = jTarget.offset().top + jTarget.height();
                    var btmDiff  : Float   = trashBtm - tarBtm;
                    var top      : Float   = -200 - btmDiff;
                    var left     : Float = jTarget.parent().width()/2 - jTarget.width()/2;

                    TweenMaxHaxe.to(jTarget, 0.2,{y: top,left: left,delay:0.2});
                    TweenMaxHaxe.to(jTarget, 0.1,{y: 0,delay:0.5,
                        onComplete:function() {

                            jTarget.remove();
                            Manager.setCounter();
                            Mainmenu.clearDrop(jTarget.data('id'));
                            _isGrabbed = false;

                        }
                    });

                    TweenMaxHaxe.to(_jTrashBox, 0.5, {y:15,ease:Elastic.easeIn,delay:0.4});
                    TweenMaxHaxe.to(_jTrashFront, 0.5, {y:15,ease:Elastic.easeIn,delay:0.4});
                    TweenMaxHaxe.to(_jTrashBg, 1,{scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1});
                    TweenMaxHaxe.to(_jTrashFront, 0.8, {y:0,scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1});
                    TweenMaxHaxe.to(_jTrashBox, 0.8, {y:0,scaleX:1.0, scaleY:1.0, ease:Elastic.easeOut,delay:1,
                        onComplete:function() {

                            if (Drag.getGrabObj() == null) hide();

                        }
                    });


                }
            }

    /* =======================================================================
    Is On Obj
    ========================================================================== */
    public static function isOnObj(jTarget:JQuery):Bool {

        var y : Float = jTarget.offset().top;
        var h : Float = y + jTarget.height();
        var x : Float = jTarget.offset().left;
        var w : Float = x + jTarget.width();

        var top    : Float = _jTrashBox.offset().top;
        var left   : Float = _jTrashBox.offset().left;
        var bottom : Float = top + _jTrashBox.height();
        var right  : Float = left + _jTrashBox.width();

        var judge  : Bool = ( top < h && left < w && bottom > y && right > x ) ? true : false;

        return judge;
    }

    /* =======================================================================
    Get Grab Position
    ========================================================================== */
    public static function getGrabPosi(event:Dynamic):Void {

        _grabPosition = event.pageY;

    }

}
