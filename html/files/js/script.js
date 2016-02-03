(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = true;
haxe.Http.prototype = {
	setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var jp = {};
jp.okawa = {};
jp.okawa.utils = {};
jp.okawa.utils.Estimate = function() { };
jp.okawa.utils.Estimate.__name__ = true;
jp.okawa.utils.Estimate.insertComma = function(numberString) {
	var ereg = new EReg("(\\d)(?=(\\d{3})+$)","g");
	return ereg.replace(numberString,"$1,");
};
jp.okawa.utils.Ua = function() { };
jp.okawa.utils.Ua.__name__ = true;
jp.okawa.utils.Ua.getBrowserName = function() {
	var _ua = "miss";
	var user = jp.okawa.utils.Ua.userAgent.toLowerCase();
	var appVersion = jp.okawa.utils.Ua.window.navigator.appVersion.toLowerCase();
	if(user.indexOf("msie") != -1 || user.indexOf("trident") != -1) {
		_ua = "IE6～11（おそらく）";
		if(appVersion.indexOf("msie 6.") != -1) _ua = "IE6"; else if(appVersion.indexOf("msie 7.") != -1) _ua = "IE7"; else if(appVersion.indexOf("msie 8.") != -1) _ua = "IE8"; else if(appVersion.indexOf("msie 9.") != -1) _ua = "IE9";
	} else if(user.indexOf("chrome") != -1) _ua = "Chrome"; else if(user.indexOf("safari") != -1) _ua = "Safari"; else if(user.indexOf("firefox") != -1) _ua = "Firefox";
	return _ua;
};
jp.okawa.utils.Ua.getDevice = function() {
	var _device = "pc";
	if(jp.okawa.utils.Ua.userAgent.indexOf("iPhone") > 0 && jp.okawa.utils.Ua.userAgent.indexOf("iPad") == -1 || jp.okawa.utils.Ua.userAgent.indexOf("iPod") > 0 || jp.okawa.utils.Ua.userAgent.indexOf("Android") > 0) _device = "sp";
	return _device;
};
var js = {};
jp.saken = {};
jp.saken.utils = {};
jp.saken.utils.Dom = function() { };
jp.saken.utils.Dom.__name__ = true;
js.Boot = function() { };
js.Boot.__name__ = true;
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
js.Browser = function() { };
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
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
	src.Manager.getWindowRatio();
	src.view.Tutorial.start();
	src.utils.ItemData.set(src.Manager.start);
	src.utils.Log.write();
};
src.Manager.start = function() {
	src.view.Mainboard.init();
	src.utils.UrlParameter.init();
	src.view.Price.init();
	src.view.Mainmenu.init();
	src.view.Sidemenu.init();
	src.view.ProductLength.init();
	src.view.Trash.init();
	src.utils.UrlParameter.remakeObject();
	src.Manager.setCounter();
	src.utils.Drag.init();
	jp.saken.utils.Dom.jWindow.on("mouseup touchend",function(event) {
		src.Manager.setCounter();
		src.utils.Log.write();
		src.view.Trash.hide();
	});
};
src.Manager.setCounter = function() {
	src.utils.Drag.addBoardObj(src.view.Mainboard.getMainboardDom().find(".object"));
	var jBoardObj = src.utils.Drag.getBoardObj();
	var length;
	if(jBoardObj == null) length = 0; else length = jBoardObj.length;
	var lengthArray = src.view.Mainboard.count(jBoardObj,length);
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		src.view.Mainmenu.addDrop(jBoardObj.eq(i).data("id"));
	}
	var accessoryLength = lengthArray[0];
	var bannerlength = lengthArray[1];
	var paperLength = lengthArray[2];
	var price = lengthArray[3];
	src.view.ProductLength.change(accessoryLength,bannerlength,paperLength);
	src.view.Price.change(price);
	src.utils.UrlParameter.change("?" + src.utils.UrlParameter.getParameter(jBoardObj,length,price));
};
src.Manager.getWindowRatio = function() {
	var maxSize = 810;
	var winH = jp.saken.utils.Dom.jWindow.height();
	var jMainboard = new js.JQuery("#mainboard");
	src.Manager._ratio = 1;
	if(maxSize > winH) {
		src.Manager._ratio = 100 * winH / maxSize / 100 * 0.9;
		src.Manager.resizeDom(jMainboard,false,true);
		src.Manager.resizeDom(jMainboard.find(".board .human"),true);
		src.Manager.resizeDom(jMainboard.find(".board .desk"),true);
		src.Manager.resizeDom(jMainboard.find(".board .desk .desk-table"),true);
		src.Manager.resizeDom(jMainboard.find(".board .desk .desk-left"),true);
		src.Manager.resizeDom(jMainboard.find(".board .desk .desk-right"),true);
		var jTrashDiv = new js.JQuery("#trash").find("div");
		var _g1 = 0;
		var _g = jTrashDiv.length;
		while(_g1 < _g) {
			var i = _g1++;
			src.Manager.resizeDom(jTrashDiv.eq(i),false,true);
			if(jTrashDiv.eq(i).hasClass("trash-bg")) {
				var bottom = Std.parseInt(jTrashDiv.eq(i).css("bottom"));
				jTrashDiv.eq(i).css({ bottom : Math.round(bottom * src.Manager._ratio)});
			}
		}
		var jSidemenuR = new js.JQuery("#sidemenu-right");
		var jSidemenuL = new js.JQuery("#sidemenu-left");
		TweenMax.set(jSidemenuR,{ scaleX : src.Manager._ratio, scaleY : src.Manager._ratio});
		TweenMax.set(jSidemenuL,{ scaleX : src.Manager._ratio, scaleY : src.Manager._ratio});
		var topR = Std.parseInt(jSidemenuR.css("top"));
		jSidemenuR.css({ top : Math.round(topR * src.Manager._ratio)});
		var topL = Std.parseInt(jSidemenuL.css("top"));
		jSidemenuL.css({ top : Math.round(topL * src.Manager._ratio)});
	}
};
src.Manager.resizeDom = function(jTarget,isPosi,isMLeft) {
	if(isMLeft == null) isMLeft = false;
	if(isPosi == null) isPosi = false;
	if(src.Manager._ratio == 1) return;
	if(isPosi) {
		var left = Std.parseInt(jTarget.css("left"));
		var top = Std.parseInt(jTarget.css("top"));
		jTarget.css({ top : Math.round(top * src.Manager._ratio), left : Math.round(left * src.Manager._ratio)});
	}
	if(jTarget.hasClass("object")) {
		jTarget.find("img").css({ width : Math.round(jTarget.width() * src.Manager._ratio), height : Math.round(jTarget.height() * src.Manager._ratio)});
		return;
	}
	var w = Math.round(jTarget.width() * src.Manager._ratio);
	var h = Math.round(jTarget.height() * src.Manager._ratio);
	jTarget.width(w);
	jTarget.height(h);
	if(isMLeft) jTarget.css({ 'margin-left' : -(w / 2)});
};
src.Manager.getRatio = function() {
	return src.Manager._ratio;
};
src.utils = {};
src.utils.Drag = function() { };
src.utils.Drag.__name__ = true;
src.utils.Drag.init = function() {
	src.utils.Drag._isGrabbed = false;
	src.utils.Drag._posiAnimate = false;
	src.utils.Drag._jMainboard = src.view.Mainboard.getMainboardDom();
	src.utils.Drag._jMainmenu = src.view.Mainmenu.getMainmenuDom();
	src.utils.Drag._jMainmenu.find(".slider").find("li").find(".img").on({ 'mousedown touchstart' : src.utils.Drag.grab});
	jp.saken.utils.Dom.jWindow.on("mousedown touchstart",function(event) {
		src.utils.Drag.touchAnimate(event);
	});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.utils.Drag.mousemove, touchmove : src.utils.Drag.mousemove, mouseup : src.utils.Drag.mouseup, touchend : src.utils.Drag.mouseup});
	src.utils.Drag.setBoardObj();
};
src.utils.Drag.setBoardObj = function() {
	src.utils.Drag._jBoardObj = src.utils.Drag._jMainboard.find(".object");
	src.utils.Drag._jBoardObj.on({ 'mousedown touchstart' : src.utils.Drag.grab});
	src.utils.Drag._jBoardObj.on({ 'mouseover touchstart' : src.utils.Drag.showOption});
};
src.utils.Drag.grab = function(event) {
	event.preventDefault();
	src.utils.Drag._jGrabObj = $(this);
	if(src.utils.Drag._jGrabObj.hasClass("drop") || src.utils.Drag._posiAnimate) return;
	src.utils.Drag.getDiff(event);
	var w;
	if(src.utils.Drag._jGrabObj.hasClass("img")) w = Math.round((src.utils.Drag._jGrabObj.parent().parent("li").width() - src.utils.Drag._jGrabObj.find("img").width()) / 2); else w = 0;
	src.utils.Drag._diffX = src.utils.Drag._diffX - w;
	src.utils.Drag.setPosition(event,0,0);
	src.utils.Drag._isGrabbed = true;
	src.view.Trash.getGrabPosi(event);
	src.utils.Drag._jGrabObj.addClass("grab");
};
src.utils.Drag.mousemove = function(event) {
	if(src.utils.Drag._isGrabbed) {
		src.utils.Drag.setPosition(event);
		src.view.Trash.onObj(src.utils.Drag._jGrabObj);
		if(src.utils.Drag._jGrabObj.hasClass("object")) src.view.Trash.show(event);
	}
};
src.utils.Drag.mouseup = function(event) {
	src.utils.Drag._isGrabbed = false;
	if(src.utils.Drag._jGrabObj == null) return;
	if(src.utils.Drag._jGrabObj.hasClass("grab")) {
		src.view.Trash.leaveObj(src.utils.Drag._jGrabObj);
		var h = new js.JQuery("#header").height();
		var w = src.utils.Drag._jMainboard.offset().left;
		src.utils.Drag.setPosition(event,-h,-w);
		src.utils.Drag._jGrabObj.removeClass("grab");
	}
	if(src.utils.Drag._jGrabObj.hasClass("img")) {
		var y;
		if(event.pageY != null) y = event.pageY; else y = event.originalEvent.changedTouches[0].pageY;
		if(src.utils.Drag._jMainmenu.find(".current").offset().top > y) {
			var jTarList = src.utils.Drag._jGrabObj.parent().parent("li");
			jTarList.addClass("drop");
			src.utils.Drag.listToObj(jTarList,event);
			src.utils.Drag._jBoardObj.unbind("mousedown touchstart");
			src.utils.Drag.setBoardObj();
		}
	}
	src.utils.Drag.judgeOnBoard(src.utils.Drag._jGrabObj);
	src.utils.Drag._jGrabObj.css({ opacity : 1});
	src.utils.Drag._jGrabObj = null;
};
src.utils.Drag.setPosition = function(event,top,left) {
	if(left == null) left = 0;
	if(top == null) top = 0;
	var type = event.type;
	var t = 0;
	var l = 0;
	if(type == "mousedown" || type == "mousemove") {
		t = event.clientY;
		l = event.clientX;
	} else if(type == "mouseup") {
		t = event.pageY;
		l = event.pageX;
	} else if(type == "touchend") {
		t = event.originalEvent.changedTouches[0].pageY;
		l = event.originalEvent.changedTouches[0].pageX;
		return;
	} else {
		t = event.originalEvent.touches[0].pageY;
		l = event.originalEvent.touches[0].pageX;
	}
	t = t - src.utils.Drag._diffY + top;
	l = l - src.utils.Drag._diffX + left;
	src.utils.Drag._jGrabObj.css({ top : t, left : l});
};
src.utils.Drag.getDiff = function(event) {
	if(event.offsetY != null) src.utils.Drag._diffY = event.offsetY; else src.utils.Drag._diffY = Math.round(event.originalEvent.touches[0].pageY - src.utils.Drag._jGrabObj.offset().top);
	if(event.offsetX != null) src.utils.Drag._diffX = event.offsetX; else src.utils.Drag._diffX = Math.round(event.originalEvent.touches[0].pageX - src.utils.Drag._jGrabObj.offset().left);
};
src.utils.Drag.listToObj = function(jTarget,event) {
	var id = jTarget.data("id");
	var type = jTarget.data("type");
	var cat = jTarget.data("cat");
	var icon = jTarget.data("icon");
	var price = Std.string(jTarget.data("price"));
	if(price.indexOf(",") > -1) price = price.split(",").join("");
	var length = jTarget.find("dl").find("dd.length").text();
	var color = src.utils.UrlParameter.getParamOption("color");
	var h = new js.JQuery("#header").height();
	var w = src.utils.Drag._jMainboard.offset().left;
	var top;
	if(event.pageY != null) top = event.pageY - h - src.utils.Drag._diffY; else top = event.originalEvent.changedTouches[0].pageY - h - src.utils.Drag._diffY;
	var left;
	if(event.pageX != null) left = event.pageX - w - src.utils.Drag._diffX; else left = event.originalEvent.changedTouches[0].pageX - w - src.utils.Drag._diffX;
	if(type == "accessory" || type == "clothes") {
		var ratio = src.Manager.getRatio();
		var abs = jTarget.data("abs").split(",");
		top = Std.parseInt(abs[0]) * ratio;
		left = Std.parseInt(abs[1]) * ratio;
	}
	if(type == "clothes") {
		src.view.Mainmenu.clearDrop(src.utils.Drag._jBoardObj.filter(".clothes").data("id"));
		src.utils.Drag._jBoardObj.filter(".clothes").remove();
	}
	var html = src.utils.Html.getObj(id,top,left,type,cat,Std.parseInt(price),length,icon,color);
	var jBoard = src.utils.Drag._jMainboard.find(".board");
	jBoard.append(html);
	src.utils.Drag._jGrabObj = jBoard.find(".object." + id);
	TweenMax.set(src.utils.Drag._jGrabObj,{ scaleX : 1.4, scaleY : 1.4});
	TweenMax.to(src.utils.Drag._jGrabObj,0.3,{ scaleX : 1, scaleY : 1, ease : Elastic.easeOut, delay : 0.1, onComplete : function() {
		src.Manager.resizeDom(jBoard.find(".object." + id),false);
	}});
};
src.utils.Drag.judgeOnBoard = function(jTarget) {
	var top = Std.parseInt(jTarget.css("top"));
	var left = Std.parseInt(jTarget.css("left"));
	var bottom = top + jTarget.height();
	var right = left + jTarget.width();
	var areaB = src.utils.Drag._jMainboard.height();
	var areaR = 698;
	var judge = false;
	if(top < 53) {
		top = 53;
		judge = true;
	}
	if(left < 53) {
		left = 53;
		judge = true;
	}
	if(bottom > areaB) {
		top = areaB - jTarget.height();
		judge = true;
	}
	if(right > areaR) {
		left = areaR - jTarget.width();
		judge = true;
	}
	if(jTarget.hasClass("accessory") || jTarget.hasClass("clothes")) {
		if(src.view.Trash.isOnObj(jTarget)) return;
		var ratio = src.Manager.getRatio();
		var abs = src.utils.Drag.getAbsPoint(jTarget);
		top = Math.round(Std.parseInt(abs[0]) * ratio);
		left = Math.round(Std.parseInt(abs[1]) * ratio);
		judge = true;
	}
	if(judge) {
		src.utils.Drag._posiAnimate = true;
		TweenMax.to(jTarget,0.5,{ top : top, left : left, delay : 0.05, ease : Expo.easeOut, onComplete : function() {
			src.Manager.setCounter();
			src.utils.Drag._posiAnimate = false;
		}});
	}
};
src.utils.Drag.getAbsPoint = function(jTarget) {
	var id = jTarget.data("id");
	var data = src.utils.ItemData.getObjData();
	var length = data.length;
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(data[i].id == id) array = data[i].abs;
	}
	return array;
};
src.utils.Drag.showOption = function(event) {
	var jTarget = $(this);
	var length = jTarget.data("length");
	var price = jp.okawa.utils.Estimate.insertComma(Std.string(jTarget.data("price")));
	var html = "<span class=\"object-data\"><span>" + price + "円<br>";
	html += length + "</span></span>";
	jTarget.append(html);
	jTarget.on("mouseleave touchend",function(event1) {
		jTarget.find(".object-data").remove();
		jTarget.unbind("mouseleave touchend");
	});
};
src.utils.Drag.getGrabObj = function() {
	return src.utils.Drag._jGrabObj;
};
src.utils.Drag.getBoardObj = function() {
	return src.utils.Drag._jBoardObj;
};
src.utils.Drag.addBoardObj = function(jBoardObj) {
	src.utils.Drag._jBoardObj = jBoardObj;
};
src.utils.Drag.touchAnimate = function(event) {
	var html = "<div class=\"touch\" style=\"top:" + Std.string(event.clientY) + "px;";
	html += "left:" + Std.string(event.clientX) + "px;\"></div>";
	src.utils.Drag._jMainmenu.append(html);
	var jTar = src.utils.Drag._jMainmenu.find(".touch");
	TweenMax.to(jTar,0.3,{ opacity : 0.2, scaleX : 4, scaleY : 4, ease : Back.easeOut});
	var timer = new haxe.Timer(200);
	timer.run = function() {
		jTar.remove();
		timer.stop();
	};
};
src.utils.Html = function() { };
src.utils.Html.__name__ = true;
src.utils.Html.getObj = function(id,top,left,type,cat,price,length,src,color) {
	var html = "";
	html += "<p class=\"object " + id + " " + type + "\"";
	html += "style=\"top:" + top + "px;left:" + left + "px\"";
	html += "data-id=\"" + id + "\" data-cat=\"" + cat + "\" data-price=\"" + price + "\" data-length=\"" + length + "\">";
	html += "<img src=\"files/img/product/icon/" + color + "/" + src + "\">";
	html += "</p>";
	return html;
};
src.utils.Html.getList = function(id,type,cat,icon,price,bgImg,img,name,length,abs) {
	var html = "";
	html += "<li id=\"" + id + "\" title=\"" + name + "\" ";
	html += "data-id=\"" + id + "\" ";
	html += "data-type=\"" + type + "\" ";
	html += "data-abs=\"" + abs + "\" ";
	html += "data-cat=\"" + cat + "\" ";
	html += "data-icon=\"" + icon + "\" ";
	html += "data-price=\"" + price + "\">";
	html += "<div class=\"revertObj\"></div>";
	html += "<div class=\"img-box\" style=\"background: url(files/img/product/bg/" + bgImg + ") no-repeat center center;\">";
	html += "<div class=\"img\">";
	html += "<img src=\"files/img/product/image/" + img + "\">";
	html += "</div>";
	html += "</div>";
	html += "<dl>";
	html += "<dt>" + name + "</dt>";
	html += "<dd class=\"length\">" + length + "</dd>";
	html += "<dd class=\"price\"><span>" + price + "</span>円</dd>";
	html += "</dl>";
	html += "</li>";
	return html;
};
src.utils.ItemData = function() { };
src.utils.ItemData.__name__ = true;
src.utils.ItemData.set = function(callback) {
	src.utils.ItemData._callback = callback;
	var request = new haxe.Http("files/data/item.json");
	request.onData = src.utils.ItemData.onData;
	request.request(false);
};
src.utils.ItemData.onData = function(data) {
	src.utils.ItemData._itemData = JSON.parse(data);
	src.utils.ItemData._objData = src.utils.ItemData._itemData.object;
	src.utils.ItemData._setData = src.utils.ItemData._itemData.set;
	src.utils.ItemData.setList(src.utils.ItemData._objData);
};
src.utils.ItemData.getItemData = function() {
	return src.utils.ItemData._itemData;
};
src.utils.ItemData.getObjData = function() {
	return src.utils.ItemData._objData;
};
src.utils.ItemData.getSetData = function() {
	return src.utils.ItemData._setData;
};
src.utils.ItemData.setList = function(data) {
	var length = data.length;
	var accessoryHtml = "";
	var bannerHtml = "";
	var paperHtml = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var t = data[i];
		var abs;
		if(t.type == "accessory" || t.type == "clothes") abs = t.abs; else abs = "";
		var html = src.utils.Html.getList(t.id,t.type,t.cat,t.icon,t.price,t.bgImg,t.img,t.name,t.length,abs);
		if(t.cat == "paper") paperHtml += html; else if(t.cat == "accessory") accessoryHtml += html; else if(t.cat == "banner") bannerHtml += html;
	}
	src.utils.ItemData.setHTML(accessoryHtml,bannerHtml,paperHtml);
};
src.utils.ItemData.setHTML = function(accessoryHtml,bannerHtml,paperHtml) {
	var jMainmenu = new js.JQuery("#mainmenu");
	jMainmenu.find("#sale-accessory").find(".slider").find("ul").append(accessoryHtml);
	jMainmenu.find("#sale-banner").find(".slider").find("ul").append(bannerHtml);
	jMainmenu.find("#sale-paper").find(".slider").find("ul").append(paperHtml);
	src.utils.ItemData._callback();
};
src.utils.Log = function() { };
src.utils.Log.__name__ = true;
src.utils.Log.write = function() {
	var request = new haxe.Http("files/php/history.php");
	var param = "?" + src.utils.UrlParameter.getLocation().split("?")[1];
	var user;
	if(param.indexOf("?utm_content=") > -1) user = param.split("?utm_content=").join("").split("&")[0]; else user = "none";
	request.setParameter("act","write");
	request.setParameter("param",param);
	request.setParameter("user",user);
	request.request(true);
};
src.utils.UrlParameter = function() { };
src.utils.UrlParameter.__name__ = true;
src.utils.UrlParameter.init = function() {
	var location = src.utils.UrlParameter.getLocation();
	if(location.indexOf("&color=") > -1) {
		var logColor = location.split("&color=")[1].split("&")[0];
		new js.JQuery("#color-btn").prop("class",logColor);
		var jColorList = new js.JQuery("#sidemenu-right").find("ul.color-list");
		jColorList.find(".current").removeClass("current");
		jColorList.find("." + logColor).addClass("current");
	}
};
src.utils.UrlParameter.remakeObject = function() {
	var url = src.utils.UrlParameter.getLocation();
	src.utils.UrlParameter._user = src.utils.UrlParameter.getParamOption("utm_content");
	if(url.indexOf("?") > -1) {
		var param = url.split("?");
		src.utils.UrlParameter.createObject(param[1]);
	}
	src.utils.UrlParameter.resizeObj();
};
src.utils.UrlParameter.getLocation = function() {
	return jp.saken.utils.Dom.window.location.toString();
};
src.utils.UrlParameter.createObject = function(param) {
	var paramArray = param.split("&");
	var length = paramArray.length;
	var data = src.utils.ItemData.getObjData();
	var color = src.utils.UrlParameter.getColorParam().split("color=").join("");
	var x = 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var item = paramArray[i].split("=");
		if(item[0].indexOf("_x") > -1) x = Std.parseFloat(item[1]);
		if(item[0].indexOf("_y") > -1) {
			var id = item[0].split("_");
			src.utils.UrlParameter.addHtml(id[0],data,color,x,Std.parseFloat(item[1]));
		}
	}
};
src.utils.UrlParameter.addHtml = function(id,data,color,x,y) {
	var target = id;
	var length = data.length;
	var html = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(data[i].id == id) {
			var type = data[i].type;
			var cat = data[i].cat;
			var icon = data[i].icon;
			var price = data[i].price;
			if(price.indexOf(",") > -1) price = price.split(",").join("");
			var length1 = data[i].length;
			var top = y;
			var left = x;
			html += src.utils.Html.getObj(id,top,left,type,cat,Std.parseInt(price),length1,icon,color);
			src.view.Mainmenu.addDrop(id);
		}
	}
	src.view.Mainboard.getMainboardDom().find(".board").append(html);
};
src.utils.UrlParameter.resizeObj = function() {
	var tarArray = src.view.Mainboard.getMainboardDom().find(".board").find(".object");
	var _g1 = 0;
	var _g = tarArray.length;
	while(_g1 < _g) {
		var i = _g1++;
		src.Manager.resizeDom(tarArray.eq(i),true);
	}
};
src.utils.UrlParameter.getParameter = function(jTarget,length,price) {
	var param = "";
	param += src.utils.UrlParameter.getUserParam();
	param += "&" + src.utils.UrlParameter.getColorParam();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(i == 0) param += "&";
		var str;
		if(i == length - 1) str = ""; else str = "&";
		param += src.utils.UrlParameter.getObjectParam(jTarget.eq(i)) + str;
	}
	param += "&" + src.utils.UrlParameter.getPriceParam(price);
	return param;
};
src.utils.UrlParameter.getUserParam = function() {
	return "utm_content=" + src.utils.UrlParameter._user;
};
src.utils.UrlParameter.getColorParam = function() {
	var color = new js.JQuery("#color-btn").prop("class");
	if(color.indexOf(" open") > -1) color = color.split(" open").join("");
	return "color=" + color;
};
src.utils.UrlParameter.getObjectParam = function(jTarget) {
	var ratio = src.Manager.getRatio();
	var id = jTarget.data("id");
	var x = Math.round(Std.parseInt(jTarget.css("left")) / ratio);
	var y = Math.round(Std.parseInt(jTarget.css("top")) / ratio);
	return id + "_x=" + x + "&" + id + "_y=" + y;
};
src.utils.UrlParameter.getPriceParam = function(price) {
	return "price=" + price;
};
src.utils.UrlParameter.change = function(string) {
	var param = "";
	if(string.indexOf("utm_content") == -1) {
		param = "?" + src.utils.UrlParameter.getUserParam() + "&";
		string = string.split("?")[1];
	}
	param += string;
	History.replaceState("","",param);
};
src.utils.UrlParameter.getParamOption = function(string) {
	if(string == null) string = "price";
	string += "=";
	var url = src.utils.UrlParameter.getLocation().split("/");
	var search = url[url.length - 1];
	var option = search.split(string);
	var str = option[1];
	var param = "";
	if(str == null) return "none";
	if(str.indexOf("&") != -1) {
		option = str.split("&");
		param = option[0];
	} else param = str;
	return param;
};
src.view = {};
src.view.Mainboard = function() { };
src.view.Mainboard.__name__ = true;
src.view.Mainboard.init = function() {
	src.view.Mainboard._jMainboard = new js.JQuery("#mainboard");
	src.view.mainboard.Human.init(src.view.Mainboard._jMainboard);
};
src.view.Mainboard.getMainboardDom = function() {
	return src.view.Mainboard._jMainboard;
};
src.view.Mainboard.clear = function(cls) {
	if(cls == null) src.view.Mainboard._jMainboard.find(".object").remove(); else src.view.Mainboard._jMainboard.find("." + cls).remove();
};
src.view.Mainboard.count = function(_jAreaObj,length) {
	var jAreaObj = _jAreaObj;
	var lengthArray = [0,0,0,0];
	if(length > 0) lengthArray = src.view.Mainboard.loop(jAreaObj,length);
	return lengthArray;
};
src.view.Mainboard.loop = function(jItem,length) {
	var price = 0;
	var accessoryLength = 0;
	var bannerLength = 0;
	var paperLength = 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var catData = jItem.eq(i).data("cat");
		var priceData = jItem.eq(i).data("price");
		if(catData == "accessory") accessoryLength++;
		if(catData == "banner") bannerLength++;
		if(catData == "paper") paperLength++;
		price += priceData;
	}
	return [accessoryLength,bannerLength,paperLength,price];
};
src.view.Mainboard.talkHuman = function(str) {
	src.view.mainboard.Human.comment($(this),str);
};
src.view.Mainmenu = function() { };
src.view.Mainmenu.__name__ = true;
src.view.Mainmenu.init = function() {
	src.view.Mainmenu._jMainmenu = new js.JQuery("#mainmenu");
	src.view.Mainmenu._jBtn = src.view.Mainmenu._jMainmenu.find(".ttl").find("p");
	if(src.Manager.getRatio() < 0.75) src.view.Mainmenu._jMainmenu.addClass("ratio");
	var jRevertBtn = src.view.Mainmenu._jMainmenu.find(".slider").find("ul li").find(".revertObj");
	src.view.mainmenu.Scrollbar.init(src.view.Mainmenu._jMainmenu);
	src.view.Mainmenu._jBtn.on("mousedown",function(event) {
		src.view.Mainmenu.clickBtn($(this),event);
	});
	src.view.Mainmenu._jMainmenu.on("mouseleave",function(event1) {
		src.view.Mainmenu._Timer = new haxe.Timer(1000);
		src.view.Mainmenu._Timer.run = src.view.Mainmenu.close;
	});
	src.view.Mainmenu._jMainmenu.on("mouseover",function(event2) {
		if(src.view.Mainmenu._Timer == null) return;
		src.view.Mainmenu._Timer.stop();
	});
	jRevertBtn.on("mousedown",function(event3) {
		var jTar = $(this).parent();
		var id = jTar.prop("id");
		src.view.Mainboard.clear(id);
		jTar.removeClass("drop");
		return false;
	});
};
src.view.Mainmenu.setScrollBtn = function(jUp,jDw,scrollTop,height) {
	if(scrollTop > 0) jUp.show(); else jUp.hide();
	if(scrollTop >= height - 220) jDw.hide(); else jDw.show();
};
src.view.Mainmenu.clickBtn = function(jThis,event) {
	var cls = jThis.prop("class");
	var jTarget = src.view.Mainmenu._jMainmenu.find(".inner");
	var h = jTarget.find("#" + cls).outerHeight() * -1 + 1;
	src.view.Mainmenu.addCurrent(cls);
	if(src.view.Mainmenu._jMainmenu.hasClass("close")) src.view.Mainmenu.open(jTarget,h);
};
src.view.Mainmenu.open = function(jTarget,h) {
	src.view.Mainmenu.clickClose();
	src.view.Mainmenu._jMainmenu.removeClass("close");
	src.view.Mainmenu._jMainmenu.addClass("open");
	TweenMax.to(jTarget,0.3,{ top : h, ease : Expo.easeOut});
};
src.view.Mainmenu.close = function() {
	src.view.Mainmenu._jMainmenu.removeClass("open");
	src.view.Mainmenu._jMainmenu.addClass("close");
	TweenMax.to(src.view.Mainmenu._jMainmenu.find(".inner"),1,{ top : 0, ease : Elastic.easeOut});
	src.view.Mainmenu._Timer.stop();
};
src.view.Mainmenu.addCurrent = function(cls) {
	src.view.Mainmenu._jMainmenu.find("div").removeClass("current");
	src.view.Mainmenu._jMainmenu.find("#" + cls).addClass("current");
};
src.view.Mainmenu.clickClose = function() {
	jp.saken.utils.Dom.jWindow.on("mousedown touchstart",function(event) {
		var y;
		if(event.pageY != null) y = event.pageY; else y = event.originalEvent.touches[0].pageY;
		if(src.view.Mainmenu._jMainmenu.find(".current").offset().top - 100 > y) {
			if(src.view.Mainmenu._jMainmenu.hasClass("open")) {
				src.view.Mainmenu._jMainmenu.removeClass("open");
				src.view.Mainmenu._jMainmenu.addClass("close");
				TweenMax.to(src.view.Mainmenu._jMainmenu.find(".inner"),1,{ top : 0, ease : Elastic.easeOut});
			}
		}
	});
};
src.view.Mainmenu.addDrop = function(id) {
	if(src.view.Mainmenu._jMainmenu.find("#" + id) == null) return;
	src.view.Mainmenu._jMainmenu.find("#" + id).addClass("drop");
};
src.view.Mainmenu.clearDrop = function(id) {
	if(id == "all") src.view.Mainmenu._jMainmenu.find(".drop").removeClass("drop"); else src.view.Mainmenu._jMainmenu.find("#" + id).removeClass("drop");
};
src.view.Mainmenu.getMainmenuDom = function() {
	return src.view.Mainmenu._jMainmenu;
};
src.view.Price = function() { };
src.view.Price.__name__ = true;
src.view.Price.init = function() {
	src.view.Price._jContact = new js.JQuery("#contact");
	src.view.Price._jContactBox = src.view.Price._jContact.find(".contact-box");
	src.view.Price._jImg = src.view.Price._jContactBox.find("#price").find("img");
	src.view.Price._jPrice = src.view.Price._jContactBox.find("#price").find("span");
	src.view.Price._price = 0;
	src.view.Price._jImg.on("mousedown",function(event) {
		event.preventDefault();
		var jTarget = $(this);
		jTarget.parent().append(jTarget.clone().addClass("coin").css({ position : "absolute", left : "15px"}));
		TweenMax.to(jTarget.parent().find(".coin"),0.3,{ y : -60, opacity : 0, onComplete : function() {
			jTarget.parent().find(".coin").remove();
		}});
	});
};
src.view.Price.change = function(price) {
	if(src.view.Price._price == price) return;
	src.view.Price._price = price;
	src.view.Price.motion(jp.okawa.utils.Estimate.insertComma(price == null?"null":"" + price));
	src.view.Price.calPriceSize(price);
};
src.view.Price.motion = function(str) {
	var array = str.split("");
	var html = "";
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		html += "<span>" + array[i] + "</span>";
	}
	src.view.Price._jPrice.html(html);
	var price = src.view.Price._jPrice.find("span");
	var length = price.length;
	var g = length;
	TweenMax.set(price,{ top : -40, opacity : 0});
	var _g2 = 0;
	while(_g2 < length) {
		var i1 = _g2++;
		g--;
		TweenMax.to(price.eq(g),0.1,{ top : 0, opacity : 1, ease : Elastic.easeOut, delay : i1 * 0.1});
	}
};
src.view.Price.calPriceSize = function(price) {
	var jImg = src.view.Price._jContactBox.find("#price").find("img");
	var array = jImg.prop("src").split("/");
	var len = jImg.prop("src").split("/").length;
	var now = array[len - 1];
	var val = "ss.png";
	if(price < 10000) val = "ss.png";
	if(price > 10000 && price < 100000) val = "s.png";
	if(price > 100000 && price < 200000) val = "m.png";
	if(price > 200000) val = "l.png";
	var newImg = now.split("_");
	newImg[newImg.length - 1] = val;
	var newSrc = newImg.join("_");
	array[len - 1] = newSrc;
	jImg.prop("src",array.join("/"));
};
src.view.Price.clear = function() {
	src.view.Price._jPrice.text("0");
};
src.view.ProductLength = function() { };
src.view.ProductLength.__name__ = true;
src.view.ProductLength.init = function() {
	src.view.ProductLength._jLenAccessory = new js.JQuery("#length-accessory").find(".item-length").find("span");
	src.view.ProductLength._jLenBanner = new js.JQuery("#length-banner").find(".item-length").find("span");
	src.view.ProductLength._jLenPaper = new js.JQuery("#length-paper").find(".item-length").find("span");
	src.view.ProductLength._lenAcce = 0;
	src.view.ProductLength._lenBanner = 0;
	src.view.ProductLength._lenPaper = 0;
	if(jp.okawa.utils.Ua.getDevice() == "sp") src.view.ProductLength.setSpMode();
};
src.view.ProductLength.change = function(accessoryLength,bannerLength,paperLength) {
	if(accessoryLength != src.view.ProductLength._lenAcce) {
		src.view.ProductLength._lenAcce = accessoryLength;
		src.view.ProductLength.motion(src.view.ProductLength._jLenAccessory,accessoryLength);
	}
	if(bannerLength != src.view.ProductLength._lenBanner) {
		src.view.ProductLength._lenBanner = bannerLength;
		src.view.ProductLength.motion(src.view.ProductLength._jLenBanner,bannerLength);
	}
	if(paperLength != src.view.ProductLength._lenPaper) {
		src.view.ProductLength._lenPaper = paperLength;
		src.view.ProductLength.motion(src.view.ProductLength._jLenPaper,paperLength);
	}
};
src.view.ProductLength.clear = function() {
	src.view.ProductLength._jLenAccessory.text("0");
	src.view.ProductLength._jLenBanner.text("0");
	src.view.ProductLength._jLenPaper.text("0");
};
src.view.ProductLength.motion = function(jTarget,length) {
	TweenMax.set(jTarget,{ top : -30, opacity : 0});
	jTarget.text(length == null?"null":"" + length);
	TweenMax.to(jTarget,0.5,{ top : 0, opacity : 1, ease : Elastic.easeOut, delay : 0.1});
};
src.view.ProductLength.setSpMode = function() {
	var jSideL = new js.JQuery("#sidemenu-left");
	var jSideR = new js.JQuery("#sidemenu-right");
	var winH = jp.saken.utils.Dom.jWindow.height();
	jSideR.css({ top : "auto", bottom : "60px"});
	jSideL.css({ top : jSideR.offset().top});
};
src.view.Sidemenu = function() {
};
src.view.Sidemenu.__name__ = true;
src.view.Sidemenu.init = function() {
	src.view.Sidemenu._jBtnMatu = new js.JQuery("#set-name-matu");
	src.view.Sidemenu._jBtnTake = new js.JQuery("#set-name-take");
	src.view.Sidemenu._jBtnUme = new js.JQuery("#set-name-ume");
	src.view.Sidemenu._jBtnColor = new js.JQuery("#color-btn");
	src.view.Sidemenu._jBtnHelp = new js.JQuery("#help-btn");
	src.view.Sidemenu._jBtnClear = new js.JQuery("#clear-btn");
	src.view.sidemenu.Lightbox.init();
	src.view.Sidemenu.setRightMenu();
};
src.view.Sidemenu.setRightMenu = function() {
	var data = src.utils.ItemData.getSetData();
	src.view.Sidemenu._jBtnMatu.on("mousedown",function(event) {
		src.view.Sidemenu.setPacage(data[0].url);
	});
	src.view.Sidemenu._jBtnMatu.on("mouseover",function(event1) {
		src.view.Mainboard.talkHuman("松セットです。/高いです。");
	});
	src.view.Sidemenu._jBtnTake.on("mousedown",function(event2) {
		src.view.Sidemenu.setPacage(data[1].url);
	});
	src.view.Sidemenu._jBtnTake.on("mouseover",function(event3) {
		src.view.Mainboard.talkHuman("竹セットです。/やや高いです。");
	});
	src.view.Sidemenu._jBtnUme.on("mousedown",function(event4) {
		src.view.Sidemenu.setPacage(data[2].url);
	});
	src.view.Sidemenu._jBtnUme.on("mouseover",function(event5) {
		src.view.Mainboard.talkHuman("梅セットです。/お手頃ですね。");
	});
	src.view.Sidemenu._jBtnColor.on("mousedown",function(event6) {
		src.view.sidemenu.Color.show($(this));
	});
	src.view.Sidemenu._jBtnColor.on("mouseover",function(event7) {
		src.view.Mainboard.talkHuman("色の変更が出来ます。");
	});
	src.view.Sidemenu._jBtnHelp.on("mousedown",function(event8) {
		src.view.sidemenu.Lightbox.show("help",$(this));
	});
	src.view.Sidemenu._jBtnHelp.on("mouseover",function(event9) {
		src.view.Mainboard.talkHuman("ヘルプです。");
	});
	src.view.Sidemenu._jBtnClear.on("mousedown",function(event10) {
		src.view.Sidemenu.setPacage("?");
		src.view.Price.clear();
		src.view.ProductLength.clear();
		src.view.Mainmenu.clearDrop("all");
	});
	src.view.Sidemenu._jBtnClear.on("mouseover",function(event11) {
		src.view.Mainboard.talkHuman("全部消せます。");
	});
};
src.view.Sidemenu.setPacage = function(data) {
	var url = src.utils.UrlParameter.getLocation();
	if(url.indexOf("_x") > -1) {
		src.view.Mainboard.clear();
		src.view.Mainmenu.clearDrop("all");
	}
	src.utils.UrlParameter.change(data);
	src.utils.UrlParameter.remakeObject();
	src.utils.Drag.setBoardObj();
};
src.view.Trash = function() { };
src.view.Trash.__name__ = true;
src.view.Trash.init = function() {
	src.view.Trash._jTrash = new js.JQuery("#trash");
	src.view.Trash._jTrashBox = src.view.Trash._jTrash.find(".trash-box");
	src.view.Trash._jTrashFront = src.view.Trash._jTrash.find(".trash-front");
	src.view.Trash._jTrashArrow = src.view.Trash._jTrash.find(".trash-arrow");
	src.view.Trash._jTrashBg = src.view.Trash._jTrash.find(".trash-bg");
	src.view.Trash._isGrabbed = false;
	src.view.Trash._isAnimate = false;
	src.view.Trash._isShow = false;
};
src.view.Trash.onObj = function(jTarget) {
	if(src.view.Trash.isOnObj(jTarget)) {
		jTarget.css({ opacity : "0"});
		if(src.view.Trash._isAnimate) return;
		src.view.Trash._isAnimate = true;
		TweenMax.to(src.view.Trash._jTrashBox,1,{ scaleX : 1.4, scaleY : 1.4, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashFront,1,{ scaleX : 1.4, scaleY : 1.4, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashBg,1,{ scaleX : 0.95, scaleY : 0.95, ease : Elastic.easeOut});
	} else {
		jTarget.css({ opacity : "0.9"});
		if(!src.view.Trash._isAnimate) return;
		src.view.Trash._isAnimate = false;
		TweenMax.to(src.view.Trash._jTrashBox,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashFront,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashBg,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
	}
};
src.view.Trash.leaveObj = function(jTarget) {
	src.view.Trash.deleteObj(jTarget);
};
src.view.Trash.hide = function() {
	src.view.Trash._isShow = false;
	if(!src.view.Trash._isGrabbed) {
		TweenMax.to(src.view.Trash._jTrashArrow,0.05,{ y : 60, onComplete : function() {
			src.view.Trash._jTrashArrow.hide();
			TweenMax.set(src.view.Trash._jTrashArrow,{ y : 0});
		}});
		TweenMax.to(src.view.Trash._jTrashFront,0.05,{ y : 60, onComplete : function() {
			src.view.Trash._jTrashFront.hide();
			TweenMax.set(src.view.Trash._jTrashFront,{ y : 0});
		}});
		TweenMax.to(src.view.Trash._jTrashBox,0.05,{ y : 60, onComplete : function() {
			src.view.Trash._jTrashBox.hide();
			src.view.Trash._jTrashBg.stop().fadeOut(100);
			TweenMax.set(src.view.Trash._jTrashBox,{ y : 0});
			if(src.view.Trash._arrowAnimate != null) src.view.Trash._arrowAnimate.pause(0);
		}});
	}
};
src.view.Trash.show = function(event) {
	if(src.view.Trash._grabPosition + 80 > event.pageY && src.view.Trash._grabPosition - 80 < event.pageY) return;
	if(src.view.Trash._isShow) return;
	src.view.Trash._isShow = true;
	TweenMax.set(src.view.Trash._jTrashArrow,{ y : 60});
	src.view.Trash._jTrashArrow.show();
	src.view.Trash._jTrashBox.show();
	src.view.Trash._jTrashFront.show();
	src.view.Trash._jTrashBg.stop().fadeIn(100);
	TweenMax.to(src.view.Trash._jTrashBox,0.05,{ y : -30, onComplete : function() {
		TweenMax.to(src.view.Trash._jTrashBox,0.05,{ y : 0});
	}});
	TweenMax.to(src.view.Trash._jTrashFront,0.05,{ y : -30, onComplete : function() {
		TweenMax.to(src.view.Trash._jTrashFront,0.05,{ y : 0});
	}});
	src.view.Trash._arrowAnimate = TweenMax.to(src.view.Trash._jTrashArrow,0.8,{ y : 30, repeat : -1, yoyo : true, ease : Circ.easeOut});
};
src.view.Trash.deleteObj = function(jTarget) {
	if(src.view.Trash.isOnObj(jTarget)) {
		src.view.Trash._isGrabbed = true;
		jTarget.css({ 'z-index' : "3000"}).css({ opacity : "1"});
		if(src.view.Trash._jTrashBox.width() < jTarget.width()) TweenMax.to(jTarget,0.2,{ scaleX : 0.6, scaleY : 0.7});
		var trashTop = src.view.Trash._jTrashBox.offset().top;
		var trashBtm = trashTop + src.view.Trash._jTrashBox.height();
		var tarBtm = jTarget.offset().top + jTarget.height();
		var btmDiff = trashBtm - tarBtm;
		var top = -200 - btmDiff;
		var left = jTarget.parent().width() / 2 - jTarget.width() / 2;
		TweenMax.to(jTarget,0.2,{ y : top, left : left, delay : 0.2});
		TweenMax.to(jTarget,0.1,{ y : 0, delay : 0.5, onComplete : function() {
			jTarget.remove();
			src.Manager.setCounter();
			src.view.Mainmenu.clearDrop(jTarget.data("id"));
			src.view.Trash._isGrabbed = false;
		}});
		TweenMax.to(src.view.Trash._jTrashBox,0.5,{ y : 15, ease : Elastic.easeIn, delay : 0.4});
		TweenMax.to(src.view.Trash._jTrashFront,0.5,{ y : 15, ease : Elastic.easeIn, delay : 0.4});
		TweenMax.to(src.view.Trash._jTrashBg,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut, delay : 1});
		TweenMax.to(src.view.Trash._jTrashFront,0.8,{ y : 0, scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut, delay : 1});
		TweenMax.to(src.view.Trash._jTrashBox,0.8,{ y : 0, scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut, delay : 1, onComplete : function() {
			if(src.utils.Drag.getGrabObj() == null) src.view.Trash.hide();
		}});
	}
};
src.view.Trash.isOnObj = function(jTarget) {
	var y = jTarget.offset().top;
	var h = y + jTarget.height();
	var x = jTarget.offset().left;
	var w = x + jTarget.width();
	var top = src.view.Trash._jTrashBox.offset().top;
	var left = src.view.Trash._jTrashBox.offset().left;
	var bottom = top + src.view.Trash._jTrashBox.height();
	var right = left + src.view.Trash._jTrashBox.width();
	var judge;
	if(top < h && left < w && bottom > y && right > x) judge = true; else judge = false;
	return judge;
};
src.view.Trash.getGrabPosi = function(event) {
	src.view.Trash._grabPosition = event.pageY;
	console.log(src.view.Trash._grabPosition);
};
src.view.Tutorial = function() { };
src.view.Tutorial.__name__ = true;
src.view.Tutorial.start = function() {
	src.view.Tutorial._jTutorial = new js.JQuery("#tutorial");
	src.view.Tutorial._jTtl = src.view.Tutorial._jTutorial.find("h1");
	src.view.Tutorial._jBox = src.view.Tutorial._jTutorial.find(".tutorial");
	src.view.Tutorial._jImg = src.view.Tutorial._jBox.find(".tutorial-img");
	src.view.Tutorial._jText = src.view.Tutorial._jBox.find(".tutorial-text");
	src.view.Tutorial._jBtn = src.view.Tutorial._jTutorial.find(".start-btn");
	src.view.Tutorial._jBtn.hide();
	if(src.Manager.getRatio() < 1) {
		src.view.Tutorial._jTutorial.css({ top : 0});
		TweenMax.set(src.view.Tutorial._jTutorial,{ scaleX : src.Manager.getRatio(), scaleY : src.Manager.getRatio()});
		src.view.Tutorial._jTutorial.css({ top : "-30px"});
	}
	src.view.Tutorial.timeline();
	jp.saken.utils.Dom.jWindow.on("touchstart",function(event) {
		src.view.Tutorial.hide();
		jp.saken.utils.Dom.jWindow.unbind("touchstart");
	});
	src.view.Tutorial._jBtn.on("mousedown",function(event1) {
		src.view.Tutorial.hide();
		jp.saken.utils.Dom.jWindow.unbind("keydown");
	});
	src.view.Tutorial._jBtn.on("mouseover",function(event2) {
		src.view.Tutorial.onBtn();
	});
	jp.saken.utils.Dom.jWindow.on("keydown",function(event3) {
		if(event3.keyCode == 32) {
			src.view.Tutorial._jBtn.mousedown();
			src.view.Tutorial._jBtn.mouseover();
		}
	});
};
src.view.Tutorial.timeline = function() {
	TweenMax.set(src.view.Tutorial._jTtl,{ scaleY : 1.3, scaleX : 1.3});
	TweenMax.to(src.view.Tutorial._jTtl,1,{ scaleY : 1, scaleX : 1, opacity : 1, ease : Elastic.easeOut, delay : 0.8});
	TweenMax.set(src.view.Tutorial._jImg,{ y : -30});
	TweenMax.to(src.view.Tutorial._jImg,1.8,{ opacity : 1, y : 0, ease : Elastic.easeOut, delay : 1.3});
	TweenMax.set(src.view.Tutorial._jText,{ y : -30});
	TweenMax.to(src.view.Tutorial._jText,1.8,{ opacity : 1, y : 0, ease : Elastic.easeOut, delay : 1.5});
	TweenMax.to(src.view.Tutorial._jBtn,2,{ display : "inline-block", opacity : 1, ease : Expo.easeOut, delay : 2.3});
};
src.view.Tutorial.hide = function() {
	TweenMax.to(src.view.Tutorial._jTutorial,20,{ y : 100, ease : Expo.easeOut});
	src.view.Tutorial._jTutorial.fadeOut(1000,function() {
		src.view.Tutorial._jTutorial.remove();
		src.view.Tutorial.domEffect();
	});
};
src.view.Tutorial.domEffect = function() {
	src.view.Tutorial.fadeIn(new js.JQuery("#header"));
	src.view.Tutorial.fadeIn(new js.JQuery("#header .caution"));
	src.view.Tutorial.fadeIn(new js.JQuery("#contact"));
	src.view.Tutorial.fadeUp(new js.JQuery("#footer"),0.4);
	src.view.Tutorial.fadeUp(new js.JQuery("#mainmenu"),0.4);
	src.view.Tutorial.fadeLeft(new js.JQuery("#sidemenu-left"),0.2);
	src.view.Tutorial.fadeRight(new js.JQuery("#sidemenu-right"),0.2);
	src.view.Tutorial.fadeDown(new js.JQuery("#mainboard"),0.6);
};
src.view.Tutorial.fadeIn = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ y : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, y : 0, ease : Expo.easeOut, delay : i});
};
src.view.Tutorial.fadeDown = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginTop : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginTop : 0, ease : Expo.easeOut, delay : i});
};
src.view.Tutorial.fadeUp = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginBottom : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginBottom : 0, ease : Expo.easeOut, delay : i});
};
src.view.Tutorial.fadeLeft = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginLeft : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginLeft : 0, ease : Expo.easeOut, delay : i});
};
src.view.Tutorial.fadeRight = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginRight : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginRight : 0, ease : Expo.easeOut, delay : i});
};
src.view.Tutorial.onBtn = function() {
	var jTar = src.view.Tutorial._jBtn.find("span");
	TweenMax.to(jTar,0.4,{ css : { rotation : 360}, repeat : -1, ease : Power0.easeOut});
	src.view.Tutorial._jBtn.on("mouseleave",function(event) {
		TweenMax.to(jTar,0,{ css : { rotation : 0}, ease : Expo.easeOut});
		src.view.Tutorial._jBtn.unbind("mouseleave");
	});
};
src.view.mainboard = {};
src.view.mainboard.Human = function() { };
src.view.mainboard.Human.__name__ = true;
src.view.mainboard.Human.init = function(jMainboard) {
	src.view.mainboard.Human._jMainboard = jMainboard;
	src.view.mainboard.Human._jHuman = src.view.mainboard.Human._jMainboard.find(".human");
	src.view.mainboard.Human._jHuman.append("<div class=\"human-talk\"><p></p></div>");
	src.view.mainboard.Human._jTalk = src.view.mainboard.Human._jHuman.find(".human-talk");
	src.view.mainboard.Human._jText = src.view.mainboard.Human._jTalk.find("p");
	src.view.mainboard.Human._SPEED = 0.08;
	src.view.mainboard.Human.talk("ようこそ",1000);
	src.view.mainboard.Human._INTERVAL = 8000;
};
src.view.mainboard.Human.talk = function(str,delay) {
	if(delay == null) delay = 0;
	return;
	src.view.mainboard.Human._jText.children().remove();
	if(str == "quiet") {
		src.view.mainboard.Human._jTalk.hide();
		return;
	}
	src.view.mainboard.Human._jTalk.show();
	src.view.mainboard.Human.setSize(str);
	var timer = new haxe.Timer(delay);
	timer.run = function() {
		src.view.mainboard.Human.typing(str);
		timer.stop();
	};
};
src.view.mainboard.Human.comment = function(jTarget,str) {
	return;
	src.view.mainboard.Human.talk(str);
	jTarget.on("mouseleave",function(event) {
		src.view.mainboard.Human.talk("quiet");
		src.view.mainboard.Human._jText.children().remove();
		jTarget.unbind("mouseleave");
	});
};
src.view.mainboard.Human.randamtalk = function() {
	var text = src.view.mainboard.Human.talkArray();
	var num = Math.floor(Math.random() * text.length);
	src.view.mainboard.Human.talk(text[num]);
};
src.view.mainboard.Human.setSize = function(str) {
	var linefeed = 0;
	var lineHight = 20;
	var padding = -30;
	var arrow = -45;
	if(str.indexOf("/") > -1) linefeed = str.split("/").length - 1;
	src.view.mainboard.Human._jTalk.css({ top : padding + -(linefeed * lineHight) + arrow + "px"});
};
src.view.mainboard.Human.typing = function(str) {
	var array = str.split("");
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		var text = src.view.mainboard.Human.wordWrap(array[i]);
		if(array[i] == "/") text = text.split("<span>/</span>").join("<br>");
		src.view.mainboard.Human._jText.append(text);
		var jSpan = src.view.mainboard.Human._jText.find("span");
		var length = jSpan.length;
		var _g2 = 0;
		while(_g2 < length) {
			var i1 = [_g2++];
			src.view.mainboard.Human._jText.find("span").eq(i1[0]).hide();
			TweenMax.to(src.view.mainboard.Human._jText.find("span").eq(i1[0]),0,{ delay : src.view.mainboard.Human._SPEED * i1[0], onComplete : (function(i1) {
				return function() {
					src.view.mainboard.Human._jText.find("span").eq(i1[0]).show();
				};
			})(i1)});
		}
	}
};
src.view.mainboard.Human.wordWrap = function(str) {
	return "<span>" + str + "</span>";
};
src.view.mainboard.Human.talkArray = function() {
	var array = ["おはよう","安くない？","やっす","現在の金額は" + new js.JQuery("#contact").find("#price").text() + "です。"];
	return array;
};
src.view.mainmenu = {};
src.view.mainmenu.Scrollbar = function() { };
src.view.mainmenu.Scrollbar.__name__ = true;
src.view.mainmenu.Scrollbar.init = function(jMainmenu) {
	src.view.mainmenu.Scrollbar._jMainmenu = jMainmenu;
	src.view.mainmenu.Scrollbar._jSlider = src.view.mainmenu.Scrollbar._jMainmenu.find(".slider");
	var browser = jp.okawa.utils.Ua.getBrowserName();
	var mouseevent;
	if(browser == "Firefox") mouseevent = "wheel"; else mouseevent = "mousewheel";
	if(mouseevent.indexOf("IE") > -1) mouseevent = "mousewheel"; else mouseevent = mouseevent;
	src.view.mainmenu.Scrollbar.set();
	jp.saken.utils.Dom.jWindow.on("resize",src.view.mainmenu.Scrollbar.set);
	src.view.mainmenu.Scrollbar._jSlider.on(mouseevent,src.view.mainmenu.Scrollbar.onMousewheel);
	src.view.mainmenu.Scrollbar._jSlider.on("touchstart",src.view.mainmenu.Scrollbar.setTouchPosition);
	src.view.mainmenu.Scrollbar._jSlider.on("touchmove",src.view.mainmenu.Scrollbar.onMousewheel);
	src.view.mainmenu.Scrollbar._jMainmenu.find(".scroll-navi").on("mousedown touchstart",src.view.mainmenu.Scrollbar.onMousedown);
};
src.view.mainmenu.Scrollbar.set = function(event) {
	var length = src.view.mainmenu.Scrollbar._jSlider.length;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		src.view.mainmenu.Scrollbar.getDom(src.view.mainmenu.Scrollbar._jSlider.eq(i));
		var scale = src.view.mainmenu.Scrollbar.getScale();
		var nH = Math.round(src.view.mainmenu.Scrollbar._jScroll.height() * scale / 100);
		src.view.mainmenu.Scrollbar._jNavi.height(nH);
	}
};
src.view.mainmenu.Scrollbar.getDom = function(jTarget) {
	src.view.mainmenu.Scrollbar._jInner = jTarget.find("ul");
	src.view.mainmenu.Scrollbar._jScroll = jTarget.siblings(".slider-scroll");
	src.view.mainmenu.Scrollbar._jNavi = src.view.mainmenu.Scrollbar._jScroll.find(".scroll-navi");
	src.view.mainmenu.Scrollbar._max = (src.view.mainmenu.Scrollbar._jInner.height() - src.view.mainmenu.Scrollbar._jSlider.height()) * -1 + 20;
	src.view.mainmenu.Scrollbar._posi = Std.parseInt(src.view.mainmenu.Scrollbar._jInner.css("margin-top"));
	src.view.mainmenu.Scrollbar._ratio = src.view.mainmenu.Scrollbar.getScale();
};
src.view.mainmenu.Scrollbar.getScale = function() {
	var vH = src.view.mainmenu.Scrollbar._jSlider.height();
	var tH = src.view.mainmenu.Scrollbar._jInner.height() - 20;
	var sH = src.view.mainmenu.Scrollbar._jScroll.height();
	var scale = vH * 100 / tH;
	return scale;
};
src.view.mainmenu.Scrollbar.onMousewheel = function(event) {
	var delta = event.originalEvent.wheelDelta;
	if(delta == null) delta = Math.round(event.originalEvent.deltaY * -120);
	if(event.type == "touchmove") {
		var y;
		if(src.view.mainmenu.Scrollbar._touchPosiY > event.originalEvent.touches[0].pageY) y = -1; else y = 1;
		delta = Math.round(-(event.originalEvent.touches[0].pageY / 10) * y);
	}
	src.view.mainmenu.Scrollbar.getDom($(this));
	src.view.mainmenu.Scrollbar.move(delta);
};
src.view.mainmenu.Scrollbar.onMousedown = function(event) {
	var jTarget = $(this).parent(".slider-scroll").siblings(".slider");
	var base = event.pageY;
	src.view.mainmenu.Scrollbar.getDom(jTarget);
	var onMousemove = function(event1) {
		var diff = base - event1.pageY;
		src.view.mainmenu.Scrollbar.move(diff * 15);
		return false;
	};
	var onMouseup;
	var onMouseup1 = null;
	onMouseup1 = function(event2) {
		jp.saken.utils.Dom.jBody.unbind("mousemove",onMousemove).unbind("mouseup",onMouseup1);
	};
	onMouseup = onMouseup1;
	jp.saken.utils.Dom.jBody.on({ mousemove : onMousemove, mouseup : onMouseup});
};
src.view.mainmenu.Scrollbar.move = function(delta) {
	delta = Math.round(delta * .3);
	var val = src.view.mainmenu.Scrollbar._posi + delta;
	if(0 < val) val = 0;
	if(src.view.mainmenu.Scrollbar._max > val) val = src.view.mainmenu.Scrollbar._max;
	TweenMax.to(src.view.mainmenu.Scrollbar._jInner,0.1,{ marginTop : val, ease : "linear"});
	val = (val * src.view.mainmenu.Scrollbar._ratio / 100 | 0) * -1;
	TweenMax.to(src.view.mainmenu.Scrollbar._jNavi,0.1,{ marginTop : val, ease : "linear"});
};
src.view.mainmenu.Scrollbar.setTouchPosition = function(event) {
	src.view.mainmenu.Scrollbar._touchPosiY = event.originalEvent.touches[0].pageY;
};
src.view.sidemenu = {};
src.view.sidemenu.Color = function() { };
src.view.sidemenu.Color.__name__ = true;
src.view.sidemenu.Color.show = function(jBtn) {
	src.view.sidemenu.Color._jSidemenuRight = new js.JQuery("#sidemenu-right");
	src.view.sidemenu.Color._jCloseBtn = src.view.sidemenu.Color._jSidemenuRight.find(".close-btn");
	src.view.sidemenu.Color._jColorInner = src.view.sidemenu.Color._jSidemenuRight.find(".color-inner");
	src.view.sidemenu.Color._jColorConfig = src.view.sidemenu.Color._jSidemenuRight.find(".color-config");
	src.view.sidemenu.Color._jColorList = src.view.sidemenu.Color._jColorInner.find(".color-list");
	if(jBtn.hasClass("open")) {
		src.view.sidemenu.Color.hide(jBtn);
		return;
	}
	src.view.sidemenu.Color._jCloseBtn.show();
	TweenMax.to(src.view.sidemenu.Color._jColorInner,0.5,{ x : -78, ease : Expo.easeOut});
	src.view.sidemenu.Color.changeColor(jBtn,src.view.sidemenu.Color._jColorConfig);
	src.view.sidemenu.Color._jCloseBtn.on("mousedown",function(event) {
		src.view.sidemenu.Color.hide(jBtn);
		src.view.sidemenu.Color._jColorConfig.find(".close-btn").unbind("mousedown");
	});
};
src.view.sidemenu.Color.hide = function(jBtn) {
	src.view.sidemenu.Color._jCloseBtn.hide();
	jBtn.removeClass("open");
	TweenMax.to(src.view.sidemenu.Color._jColorInner,0.5,{ x : 0, ease : Expo.easeOut});
};
src.view.sidemenu.Color.changeColor = function(jBtn,jbox) {
	src.view.sidemenu.Color._jColorList.find("li").on("mousedown",function(event) {
		var jAreaObj = new js.JQuery("#mainboard").find(".object");
		var target = $(this);
		if(target.hasClass("current")) return;
		var cls = target.prop("class");
		jBtn.removeClass();
		jBtn.addClass(cls);
		src.view.sidemenu.Color._jColorList.find("li").removeClass("current");
		target.addClass("current");
		if(jAreaObj != null) src.view.sidemenu.Color.changeObjColor(jAreaObj,cls);
	});
};
src.view.sidemenu.Color.changeObjColor = function(jAreaObj,cls) {
	var length = jAreaObj.length;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var jObj = jAreaObj.eq(i).find("img");
		var src = jObj.prop("src");
		var array = src.split("/");
		var color = array[array.length - 2];
		var newSrc = src.split("/" + color + "/").join("/" + cls + "/");
		jObj.prop("src",newSrc);
	}
};
src.view.sidemenu.Lightbox = function() {
	src.view.Sidemenu.call(this);
};
src.view.sidemenu.Lightbox.__name__ = true;
src.view.sidemenu.Lightbox.init = function() {
	src.view.sidemenu.Lightbox._jLightBox = new js.JQuery("#lightbox");
	src.view.sidemenu.Lightbox._jLightBoxBg = src.view.sidemenu.Lightbox._jLightBox.find(".lightbox-bg");
	src.view.sidemenu.Lightbox._jLightText = src.view.sidemenu.Lightbox._jLightBox.find(".caution");
	src.view.sidemenu.Lightbox._jLightSub = src.view.sidemenu.Lightbox._jLightBox.find("h3");
	src.view.sidemenu.Lightbox._jLightText.hide();
};
src.view.sidemenu.Lightbox.show = function(cls,jBtn) {
	var jBox = src.view.sidemenu.Lightbox._jLightBox.find("." + cls);
	var sPEED = 300;
	jBox.width(50);
	src.view.sidemenu.Lightbox._jLightBox.fadeIn(sPEED,function() {
		src.view.sidemenu.Lightbox._jLightText.hide();
		src.view.sidemenu.Lightbox._jLightSub.hide();
		jBox.show();
		TweenMax.to(jBox,1,{ width : 800, ease : Elastic.easeOut, onComplete : function() {
			src.view.sidemenu.Lightbox._jLightText.fadeIn(100);
			src.view.sidemenu.Lightbox._jLightSub.fadeIn(100);
		}});
	});
	jBox.find(".close-btn").on("mousedown",function(event) {
		src.view.sidemenu.Lightbox.hide(jBox,sPEED);
	});
	src.view.sidemenu.Lightbox._jLightBoxBg.on("mousedown",function(event1) {
		src.view.sidemenu.Lightbox.hide(jBox,sPEED);
		src.view.sidemenu.Lightbox._jLightBoxBg.unbind("mousedown");
	});
};
src.view.sidemenu.Lightbox.hide = function(jBox,sPEED) {
	jBox.fadeOut(sPEED);
	src.view.sidemenu.Lightbox._jLightBox.fadeOut(sPEED);
	jBox.find(".close-btn").unbind("mousedown");
};
src.view.sidemenu.Lightbox.__super__ = src.view.Sidemenu;
src.view.sidemenu.Lightbox.prototype = $extend(src.view.Sidemenu.prototype,{
});
String.__name__ = true;
Array.__name__ = true;
var q = window.jQuery;
js.JQuery = q;
jp.okawa.utils.Ua.window = window;
jp.okawa.utils.Ua.userAgent = jp.okawa.utils.Ua.window.navigator.userAgent;
jp.saken.utils.Dom.document = window.document;
jp.saken.utils.Dom.window = window;
jp.saken.utils.Dom.jWindow = new js.JQuery(jp.saken.utils.Dom.window);
jp.saken.utils.Dom.body = jp.saken.utils.Dom.document.body;
jp.saken.utils.Dom.jBody = new js.JQuery(jp.saken.utils.Dom.body);
jp.saken.utils.Dom.userAgent = jp.saken.utils.Dom.window.navigator.userAgent;
src.Main.main();
})();
