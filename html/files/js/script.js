(function () { "use strict";
Math.__name__ = true;
var haxe = {};
haxe.Log = function() { };
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
var js = {};
var jp = {};
jp.saken = {};
jp.saken.utils = {};
jp.saken.utils.Dom = function() { };
jp.saken.utils.Dom.__name__ = true;
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var src = {};
src.Main = function() { };
src.Main.__name__ = true;
src.Main.main = function() {
	new js.JQuery("document").ready(src.Manager.init);
};
src.Manager = function() { };
src.Manager.__name__ = true;
src.Manager.init = function(event) {
	src.drop.Drop.init();
};
src.drop = {};
src.drop.Drop = function() { };
src.drop.Drop.__name__ = true;
src.drop.Drop.init = function() {
	src.drop.Drop._STATUS = false;
	src.drop.Drop._jItem = new js.JQuery("#item-room").find(".test");
	src.drop.Drop._jArea = new js.JQuery("#play-room").find("a");
	src.drop.Drop._jPrice = new js.JQuery("#price-room").find("h1");
	src.drop.Drop._jItem.on({ mousedown : src.drop.Drop.getTarget});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.drop.Drop.moveDrag, mouseup : src.drop.Drop.leaveDrag});
	src.drop.Drop._jPrice.on("mousedown",function(event) {
		src.drop.Juge.init(event,src.drop.Drop._jArea,src.drop.Drop._jItem);
	});
};
src.drop.Drop.getTarget = function(event) {
	src.drop.Drop._STATUS = true;
	src.drop.Drop.target = $(this);
	src.drop.Drop._dy = event.pageY - src.drop.Drop.target.offset().top;
	src.drop.Drop._dx = event.pageX - src.drop.Drop.target.offset().left;
	haxe.Log.trace(event.pageY,{ fileName : "Drop.hx", lineNumber : 53, className : "src.drop.Drop", methodName : "getTarget", customParams : [src.drop.Drop.target.offset().top]});
};
src.drop.Drop.moveDrag = function(event) {
	src.drop.Drop.moveItem(event);
};
src.drop.Drop.leaveDrag = function(event) {
	src.drop.Drop._STATUS = false;
};
src.drop.Drop.moveItem = function(event) {
	if(src.drop.Drop._STATUS) src.drop.Drop.target.css({ position : "absolute", top : event.pageY - src.drop.Drop._dy, left : event.pageX - src.drop.Drop._dx});
};
src.drop.Juge = function() { };
src.drop.Juge.__name__ = true;
src.drop.Juge.init = function(event,_jArea,_jItem) {
	src.drop.Juge.getPrice(event,_jArea,_jItem);
};
src.drop.Juge.getPrice = function(event,_jArea,_jItem) {
	haxe.Log.trace(_jArea.offset().top,{ fileName : "Juge.hx", lineNumber : 18, className : "src.drop.Juge", methodName : "getPrice"});
	var area_top = _jArea.offset().top;
	var area_bottom = area_top + _jArea.height();
	var area_left = _jArea.offset().left;
	var area_right = area_left + _jArea.width();
	var _g1 = 0;
	var _g = _jItem.length;
	while(_g1 < _g) {
		var i = _g1++;
		var t = _jItem.eq(i);
		if(t.offset().top > area_top && t.offset().top + t.height() < area_bottom) {
			if(t.offset().left > area_left && t.offset().left + t.width() < area_right) t.addClass("dropon");
		}
	}
	haxe.Log.trace(_jArea.find("dropon").length,{ fileName : "Juge.hx", lineNumber : 36, className : "src.drop.Juge", methodName : "getPrice"});
};
String.__name__ = true;
Array.__name__ = true;
var q = window.jQuery;
js.JQuery = q;
jp.saken.utils.Dom.document = window.document;
jp.saken.utils.Dom.window = window;
jp.saken.utils.Dom.jWindow = new js.JQuery(jp.saken.utils.Dom.window);
jp.saken.utils.Dom.body = jp.saken.utils.Dom.document.body;
jp.saken.utils.Dom.jBody = new js.JQuery(jp.saken.utils.Dom.body);
jp.saken.utils.Dom.userAgent = jp.saken.utils.Dom.window.navigator.userAgent;
src.Main.main();
})();
