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
	src.Manager._jMenu = new js.JQuery("#mainmenu");
	src.Manager._jArea = new js.JQuery("#mainboard");
	src.Manager.getWindowScale();
	src.view.Intro.start();
	src.view.Data.set(src.Manager._jMenu,src.Manager.start);
	src.utils.Log.write();
};
src.Manager.start = function() {
	src.utils.Param.init(src.Manager._jArea);
	src.view.Board.init(src.Manager._jArea);
	src.view.Price.init();
	src.view.mainmenu.Mainmenu.init(src.Manager._jMenu,src.Manager._jArea);
	src.view.sidemenu.Sidemenu.init(src.Manager._Data);
	src.view.ProductLength.init();
	src.view.Trash.init();
	src.utils.Param.remakeObject();
	src.Manager.setCounter();
	src.utils.Drag.init(src.Manager._jArea,src.Manager._jAreaObj,src.Manager._jMenu);
	src.view.board.Human.talk("ようこそ");
	jp.saken.utils.Dom.jWindow.on("mouseup",function(event) {
		src.Manager.setCounter();
		src.utils.Log.write();
		src.view.Trash.hide();
	});
};
src.Manager.setCounter = function() {
	src.Manager._jAreaObj = src.Manager._jArea.find(".object");
	var length;
	if(src.Manager._jAreaObj == null) length = 0; else length = src.Manager._jAreaObj.length;
	var lengthArray = src.view.Board.count(src.Manager._jAreaObj,length);
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		src.view.mainmenu.Mainmenu.addDrop(src.Manager._jAreaObj.eq(i).data("id"));
	}
	var accessoryLength = lengthArray[0];
	var bannerlength = lengthArray[1];
	var paperLength = lengthArray[2];
	var price = lengthArray[3];
	src.view.ProductLength.change(accessoryLength,bannerlength,paperLength);
	src.view.Price.change(price);
	var param = src.utils.Param.make(src.Manager._jAreaObj,length,price);
	src.utils.Param.change("?" + param);
};
src.Manager.getWindowScale = function() {
	var maxSize = 810;
	var winH = jp.saken.utils.Dom.jWindow.height();
	src.Manager._scale = 1;
	if(maxSize > winH) {
		src.Manager._scale = 100 * winH / maxSize / 100 * 0.9;
		src.Manager.resizeDom(src.Manager._jArea,false,true);
		src.Manager.resizeDom(src.Manager._jArea.find(".board .human"),true);
		src.Manager.resizeDom(src.Manager._jArea.find(".board .desk"),true);
		src.Manager.resizeDom(src.Manager._jArea.find(".board .desk .desk-table"),true);
		src.Manager.resizeDom(src.Manager._jArea.find(".board .desk .desk-left"),true);
		src.Manager.resizeDom(src.Manager._jArea.find(".board .desk .desk-right"),true);
		var jSidemenu = new js.JQuery("#sidemenu-right");
		TweenMax.set(jSidemenu,{ scaleX : src.Manager._scale, scaleY : src.Manager._scale});
		var top = Std.parseInt(jSidemenu.css("top").split("px").join(""));
		jSidemenu.css({ top : Math.round(top * src.Manager._scale)});
	}
};
src.Manager.resizeDom = function(target,posi,mLeft) {
	if(mLeft == null) mLeft = false;
	if(posi == null) posi = false;
	if(src.Manager._scale == 1) return;
	if(posi) {
		var left = Std.parseInt(target.css("left").split("px").join(""));
		target.css({ left : Math.round(left * src.Manager._scale)});
		var top = Std.parseInt(target.css("top").split("px").join(""));
		target.css({ top : Math.round(top * src.Manager._scale)});
	}
	if(target.hasClass("object")) {
		TweenMax.set(target,{ scaleX : src.Manager._scale, scaleY : src.Manager._scale});
		return;
	}
	var w = Math.round(target.width() * src.Manager._scale);
	var h = Math.round(target.height() * src.Manager._scale);
	target.width(w);
	target.height(h);
	if(mLeft) target.css({ 'margin-left' : -(w / 2)});
};
src.utils = {};
src.utils.Drag = function() { };
src.utils.Drag.__name__ = true;
src.utils.Drag.init = function(jArea,jAreaObj,jMenu) {
	src.utils.Drag._isGrabbed = false;
	src.utils.Drag._jArea = jArea;
	src.utils.Drag._jAreaObj = jAreaObj;
	src.utils.Drag._jMenu = jMenu;
	src.utils.Drag._jMenu.find(".slider").find("li").on({ mousedown : src.utils.Drag.grabList});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.utils.Drag.mousemove, mouseup : src.utils.Drag.mouseup});
	src.utils.Drag._jAreaObj.on("mousedown",function(event) {
		src.utils.Drag.grabObject($(this),event);
	});
	src.utils.Drag._jAreaObj.on("mouseover",function(event1) {
		src.utils.Drag.showOption($(this));
	});
};
src.utils.Drag.grabList = function(event) {
	event.preventDefault();
	var target = $(this);
	if(target.hasClass("drop")) return;
	src.Manager._DragObj = target.find(".img");
	src.utils.Drag._isGrabbed = true;
	src.utils.Drag.getDiff(event,target);
	var w = (src.Manager._DragObj.width() - src.Manager._DragObj.find("img").width()) / 2;
	src.Manager._DragObj.css({ top : event.clientY - src.utils.Drag._diffY, left : event.clientX - src.utils.Drag._diffX + w});
	src.Manager._DragObj.addClass("grab");
};
src.utils.Drag.grabObject = function(target,event) {
	event.preventDefault();
	src.Manager._DragObj = target;
	src.utils.Drag.getDiff(event,src.Manager._DragObj);
	var h = new js.JQuery("#header").height();
	var w = src.utils.Drag._jArea.offset().left;
	src.Manager._DragObj.css({ top : event.clientY - src.utils.Drag._diffY, left : event.clientX - src.utils.Drag._diffX});
	console.log(event.clientX - src.utils.Drag._diffX);
	src.Manager._DragObj.addClass("grab");
	src.utils.Drag._isGrabbed = true;
	src.view.Trash.show();
};
src.utils.Drag.getDiff = function(event,target) {
	src.utils.Drag._diffY = event.offsetY;
	src.utils.Drag._diffX = event.offsetX;
};
src.utils.Drag.mousemove = function(event) {
	if(src.utils.Drag._isGrabbed) {
		src.Manager._DragObj.css({ top : event.clientY - src.utils.Drag._diffY, left : event.clientX - src.utils.Drag._diffX});
		src.view.Trash.onObj(src.Manager._DragObj);
	}
};
src.utils.Drag.mouseup = function(event) {
	src.utils.Drag._isGrabbed = false;
	if(src.Manager._DragObj == null) return;
	if(src.Manager._DragObj.hasClass("grab")) {
		src.view.Trash.leaveObj(src.Manager._DragObj);
		var h = new js.JQuery("#header").height();
		var w = src.utils.Drag._jArea.offset().left;
		console.log("kiteru");
		src.Manager._DragObj.css({ top : event.pageY - h - src.utils.Drag._diffY, left : event.pageX - w - src.utils.Drag._diffX});
		src.Manager._DragObj.removeClass("grab");
	}
	if(src.Manager._DragObj.hasClass("img")) {
		if(src.utils.Drag._jMenu.find(".current").offset().top > event.pageY) {
			src.Manager._DragObj.parent().parent("li").addClass("drop");
			src.utils.Drag.createListToObj(src.Manager._DragObj.parent().parent("li"),event);
			src.utils.Drag._jAreaObj.unbind("mousedown");
			src.utils.Drag.getObject();
		}
	}
	src.utils.Drag.judgeArea(src.Manager._DragObj);
	src.Manager._DragObj = null;
};
src.utils.Drag.createListToObj = function(target,event) {
	var id = target.data("id");
	var type = target.data("type");
	var cat = target.data("cat");
	var icon = target.data("icon");
	var price = Std.string(target.data("price"));
	if(price.indexOf(",") > -1) price = price.split(",").join("");
	var length = target.find("dl").find("dd.length").text();
	var color = src.utils.Param.getParamOption("color");
	var top = event.pageY - new js.JQuery("#header").height() - src.utils.Drag._diffY;
	var left = event.pageX - src.utils.Drag._jArea.offset().left - src.utils.Drag._diffX;
	if(type == "accessory" || type == "clothes") {
		var abs = target.data("abs").split(",");
		top = Std.parseFloat(abs[0]);
		left = Std.parseFloat(abs[1]);
	}
	if(type == "clothes") {
		src.view.mainmenu.Mainmenu.clearDrop(src.utils.Drag._jAreaObj.filter(".clothes").data("id"));
		src.utils.Drag._jAreaObj.filter(".clothes").remove();
	}
	var html = src.utils.Html.getObj(id,top,left,type,cat,Std.parseInt(price),length,icon,color);
	var jBoard = src.utils.Drag._jArea.find(".board");
	jBoard.append(html);
	src.Manager._DragObj = jBoard.find(".object." + id);
	TweenMax.set(src.Manager._DragObj,{ scaleX : 1.4, scaleY : 1.4});
	TweenMax.to(src.Manager._DragObj,0.3,{ scaleX : 1, scaleY : 1, ease : Elastic.easeOut, delay : 0.1, onComplete : function() {
		src.Manager.resizeDom(jBoard.find(".object." + id),false);
	}});
};
src.utils.Drag.judgeArea = function(jTarget) {
	var top = jTarget.css("top").split("px").join("");
	var left = jTarget.css("left").split("px").join("");
	var t = Std.parseInt(top);
	var l = Std.parseInt(left);
	var bottom = t + jTarget.height();
	var right = l + jTarget.width();
	var areaB = src.utils.Drag._jArea.height();
	var areaR = src.utils.Drag._jArea.width();
	if(top.indexOf("-") == 0) t = 0;
	if(left.indexOf("-") == 0) l = 0;
	if(bottom > areaB) t = areaB - jTarget.height();
	if(right > areaR) l = areaR - jTarget.width();
	if(jTarget.hasClass("accessory") || jTarget.hasClass("clothes")) {
		if(src.view.Trash.judgeOnObj(jTarget)) return;
		var abs = src.utils.Drag.absPosition(jTarget);
		t = Std.parseInt(abs[0]);
		l = Std.parseInt(abs[1]);
	}
	TweenMax.to(jTarget,0.5,{ top : t, left : l, delay : 0.05, ease : Expo.easeOut});
};
src.utils.Drag.absPosition = function(target) {
	var id = target.data("id");
	var data = src.Manager._Data;
	var array = [];
	var _g1 = 0;
	var _g = data.object.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(data.object[i].id == (id == null?"null":"" + id)) array = data.object[i].abs;
	}
	return array;
};
src.utils.Drag.getObject = function() {
	src.utils.Drag._jAreaObj = src.utils.Drag._jArea.find(".object");
	src.utils.Drag._jAreaObj.on("mousedown",function(event) {
		src.utils.Drag.grabObject($(this),event);
	});
	src.utils.Drag._jAreaObj.on("mouseover",function(event1) {
		src.utils.Drag.showOption($(this));
	});
};
src.utils.Drag.showOption = function(target) {
	var length = target.data("length");
	var price = target.data("price");
	var html = "<span class=\"object-data\"><span>" + length + "<br>";
	html += price + "円</span></span>";
	target.append(html);
	target.on("mouseleave",function(event) {
		target.find(".object-data").remove();
		target.unbind("mouseleave");
	});
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
	html += "<div class=\"revertObj\">×</div>";
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
src.utils.Log = function() { };
src.utils.Log.__name__ = true;
src.utils.Log.write = function() {
	var request = new haxe.Http("files/php/history.php");
	var param = "?" + jp.saken.utils.Dom.window.location.toString().split("?")[1];
	var user;
	if(param.indexOf("?utm_content=") > -1) user = param.split("?utm_content=").join("").split("&")[0]; else user = "none";
	request.onError = function(data) {
	};
	request.onData = function(data1) {
	};
	request.setParameter("act","write");
	request.setParameter("param",param);
	request.setParameter("user",user);
	request.request(true);
};
src.utils.Param = function() { };
src.utils.Param.__name__ = true;
src.utils.Param.init = function(jArea) {
	src.utils.Param._jArea = jArea;
	var location = jp.saken.utils.Dom.window.location.toString();
	if(location.indexOf("&color=") > -1) {
		var logColor = location.split("&color=")[1].split("&")[0];
		new js.JQuery("#color-btn").prop("class",logColor);
		var jColorList = new js.JQuery("#sidemenu-right").find("ul.color-list");
		jColorList.find(".current").removeClass("current");
		jColorList.find("." + logColor).addClass("current");
	}
};
src.utils.Param.remakeObject = function() {
	var url = jp.saken.utils.Dom.window.location.toString();
	src.utils.Param._user = src.utils.Param.getParamOption("utm_content");
	if(url.indexOf("?") > -1) {
		var param = url.split("?");
		src.utils.Param.createObject(param[1]);
	}
	src.utils.Param.resizeObj();
};
src.utils.Param.createObject = function(param) {
	var paramArray = param.split("&");
	var length = paramArray.length;
	var data = src.Manager._Data;
	var color = src.utils.Param.getColorParam().split("color=").join("");
	var x = 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var item = paramArray[i].split("=");
		if(item[0].indexOf("_x") > -1) x = Std.parseFloat(item[1]);
		if(item[0].indexOf("_y") > -1) {
			var id = item[0].split("_");
			src.utils.Param.addHtml(id[0],data,color,x,Std.parseFloat(item[1]));
		}
	}
};
src.utils.Param.addHtml = function(id,data,color,x,y) {
	var target = id;
	var length = data.object.length;
	var html = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(data.object[i].id == id) {
			var type = data.object[i].type;
			var cat = data.object[i].cat;
			var icon = data.object[i].icon;
			var price = data.object[i].price;
			if(price.indexOf(",") > -1) price = price.split(",").join("");
			var length1 = data.object[i].length;
			var top = y;
			var left = x;
			html += src.utils.Html.getObj(id,top,left,type,cat,Std.parseInt(price),length1,icon,color);
			src.view.mainmenu.Mainmenu.addDrop(id);
		}
	}
	src.utils.Param._jArea.find(".board").append(html);
};
src.utils.Param.resizeObj = function() {
	var tarArray = src.utils.Param._jArea.find(".board").find(".object");
	var _g1 = 0;
	var _g = tarArray.length;
	while(_g1 < _g) {
		var i = _g1++;
		src.Manager.resizeDom(tarArray.eq(i),true);
	}
};
src.utils.Param.make = function(jTarget,length,price) {
	var param = "";
	param += src.utils.Param.getUserParam();
	param += "&" + src.utils.Param.getColorParam();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(i == 0) param += "&";
		var str;
		if(i == length - 1) str = ""; else str = "&";
		param += src.utils.Param.getObjectParam(jTarget.eq(i)) + str;
	}
	param += "&" + src.utils.Param.getPriceParam(price);
	return param;
};
src.utils.Param.getUserParam = function() {
	return "utm_content=" + src.utils.Param._user;
};
src.utils.Param.getColorParam = function() {
	var color = new js.JQuery("#color-btn").prop("class");
	if(color.indexOf(" open") > -1) color = color.split(" open").join("");
	return "color=" + color;
};
src.utils.Param.getObjectParam = function(jTarget) {
	var id = jTarget.data("id");
	var x = jTarget.css("left").split("px").join("");
	var y = jTarget.css("top").split("px").join("");
	return id + "_x=" + x + "&" + id + "_y=" + y;
};
src.utils.Param.getPriceParam = function(price) {
	return "price=" + price;
};
src.utils.Param.change = function(string) {
	var param = "";
	if(string.indexOf("utm_content") == -1) {
		param = "?" + src.utils.Param.getUserParam() + "&";
		string = string.split("?")[1];
	}
	param += string;
	History.replaceState("","",param);
};
src.utils.Param.get = function() {
	var param = jp.saken.utils.Dom.window.history;
	return param;
};
src.utils.Param.getParamOption = function(string) {
	if(string == null) string = "price";
	string += "=";
	var url = jp.saken.utils.Dom.window.location.toString().split("/");
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
src.view.Board = function() { };
src.view.Board.__name__ = true;
src.view.Board.init = function(jArea) {
	src.view.Board._jArea = jArea;
	src.view.board.Human.init(src.view.Board._jArea);
};
src.view.Board.clear = function() {
	src.view.Board._jArea.find(".object").remove();
};
src.view.Board.count = function(_jAreaObj,length) {
	var jAreaObj = _jAreaObj;
	var lengthArray = [0,0,0,0];
	if(length > 0) lengthArray = src.view.Board.loop(jAreaObj,length);
	return lengthArray;
};
src.view.Board.loop = function(jItem,length) {
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
src.view.Data = function() { };
src.view.Data.__name__ = true;
src.view.Data.set = function(jMenu,callback) {
	src.view.Data._jMenu = jMenu;
	src.view.Data._callback = callback;
	var request = new haxe.Http("files/data/data.json");
	request.onError = function(data) {
	};
	request.onData = src.view.Data.onData;
	request.request(false);
};
src.view.Data.onData = function(data) {
	src.Manager._Data = JSON.parse(data);
	src.view.Data.loop(src.Manager._Data);
};
src.view.Data.loop = function(data) {
	var length = data.object.length;
	var accessoryHtml = "";
	var bannerHtml = "";
	var paperHtml = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var t = data.object[i];
		var abs;
		if(t.type == "accessory" || t.type == "clothes") abs = t.abs; else abs = "";
		var html = src.utils.Html.getList(t.id,t.type,t.cat,t.icon,t.price,t.bgImg,t.img,t.name,t.length,abs);
		if(t.cat == "paper") paperHtml += html; else if(t.cat == "accessory") accessoryHtml += html; else if(t.cat == "banner") bannerHtml += html;
	}
	src.view.Data.setHTML(accessoryHtml,bannerHtml,paperHtml);
};
src.view.Data.setHTML = function(accessoryHtml,bannerHtml,paperHtml) {
	src.view.Data._jMenu.find("#sale-accessory").find(".slider").find("ul").append(accessoryHtml);
	src.view.Data._jMenu.find("#sale-banner").find(".slider").find("ul").append(bannerHtml);
	src.view.Data._jMenu.find("#sale-paper").find(".slider").find("ul").append(paperHtml);
	src.view.Data._callback();
};
src.view.Intro = function() { };
src.view.Intro.__name__ = true;
src.view.Intro.start = function() {
	var introSwitch = true;
	src.view.Intro._jIntro = new js.JQuery("#intro");
	src.view.Intro._jTtl = src.view.Intro._jIntro.find("h1");
	src.view.Intro._jLoad = src.view.Intro._jIntro.find(".intro-metar");
	src.view.Intro._jMater = src.view.Intro._jLoad.find("span");
	if(introSwitch) src.view.Intro.timeline(); else {
		src.view.Intro.hide();
		src.view.Intro.domEffect();
	}
};
src.view.Intro.timeline = function() {
	TweenMax.set(src.view.Intro._jTtl,{ opacity : 0, y : -50});
	TweenMax.to(src.view.Intro._jTtl,2,{ opacity : 1, y : 0, ease : Expo.easeOut, delay : 0});
	TweenMax.set(src.view.Intro._jLoad,{ y : -50});
	TweenMax.to(src.view.Intro._jLoad,1.8,{ opacity : 1, y : 0, ease : Expo.easeOut, delay : 0.4});
	TweenMax.to(src.view.Intro._jMater,1.5,{ width : src.view.Intro._jLoad.width(), ease : Quart.easeOut, delay : 1.4, onComplete : function() {
		src.view.Intro._jIntro.fadeOut(1000,function() {
			src.view.Intro.hide();
			src.view.Intro.domEffect();
		});
	}});
};
src.view.Intro.hide = function() {
	src.view.Intro._jIntro.hide();
};
src.view.Intro.domEffect = function() {
	src.view.Intro.fadeIn(new js.JQuery("#header"));
	src.view.Intro.fadeUp(new js.JQuery("#footer"),0.4);
	src.view.Intro.fadeUp(new js.JQuery("#mainmenu"),0.4);
	src.view.Intro.fadeLeft(new js.JQuery("#sidemenu-left"),0.2);
	src.view.Intro.fadeRight(new js.JQuery("#sidemenu-right"),0.2);
	src.view.Intro.fadeDown(new js.JQuery("#mainboard"),0.6);
};
src.view.Intro.fadeIn = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ y : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, y : 0, ease : Expo.easeOut, delay : i});
};
src.view.Intro.fadeDown = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginTop : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginTop : 0, ease : Expo.easeOut, delay : i});
};
src.view.Intro.fadeUp = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginBottom : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginBottom : 0, ease : Expo.easeOut, delay : i});
};
src.view.Intro.fadeLeft = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginLeft : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginLeft : 0, ease : Expo.easeOut, delay : i});
};
src.view.Intro.fadeRight = function(target,i) {
	if(i == null) i = 0;
	TweenMax.set(target,{ marginRight : "-50px"});
	TweenMax.to(target,1,{ opacity : 1, marginRight : 0, ease : Expo.easeOut, delay : i});
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
		var target = $(this);
		target.parent().append(target.clone().addClass("coin").css({ position : "absolute", left : "15px"}));
		TweenMax.to(target.parent().find(".coin"),0.3,{ y : -60, opacity : 0, onComplete : function() {
			target.parent().find(".coin").remove();
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
	src.view.ProductLength._lengthAccessory = new js.JQuery("#length-accessory").find(".item-length").find("span");
	src.view.ProductLength._lengthBanner = new js.JQuery("#length-banner").find(".item-length").find("span");
	src.view.ProductLength._lengthPaper = new js.JQuery("#length-paper").find(".item-length").find("span");
	src.view.ProductLength._lenAcce = 0;
	src.view.ProductLength._lenBanner = 0;
	src.view.ProductLength._lenPaper = 0;
	if(jp.okawa.utils.Ua.getDevice() == "sp") src.view.ProductLength.setSpMode();
};
src.view.ProductLength.change = function(accessoryLength,bannerLength,paperLength) {
	if(accessoryLength != src.view.ProductLength._lenAcce) {
		src.view.ProductLength._lenAcce = accessoryLength;
		src.view.ProductLength.motion(src.view.ProductLength._lengthAccessory,accessoryLength);
	}
	if(bannerLength != src.view.ProductLength._lenBanner) {
		src.view.ProductLength._lenBanner = bannerLength;
		src.view.ProductLength.motion(src.view.ProductLength._lengthBanner,bannerLength);
	}
	if(paperLength != src.view.ProductLength._lenPaper) {
		src.view.ProductLength._lenPaper = paperLength;
		src.view.ProductLength.motion(src.view.ProductLength._lengthPaper,paperLength);
	}
};
src.view.ProductLength.clear = function() {
	src.view.ProductLength._lengthAccessory.text("0");
	src.view.ProductLength._lengthBanner.text("0");
	src.view.ProductLength._lengthPaper.text("0");
};
src.view.ProductLength.motion = function(target,length) {
	TweenMax.set(target,{ top : -30, opacity : 0});
	target.text(length == null?"null":"" + length);
	TweenMax.to(target,0.5,{ top : 0, opacity : 1, ease : Elastic.easeOut, delay : 0.1});
};
src.view.ProductLength.setSpMode = function() {
	var h = jp.saken.utils.Dom.jWindow.height();
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
};
src.view.Trash.onObj = function(target) {
	if(src.view.Trash.judgeOnObj(target)) {
		target.css({ opacity : "0"});
		TweenMax.to(src.view.Trash._jTrashBox,1,{ scaleX : 1.4, scaleY : 1.4, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashFront,1,{ scaleX : 1.4, scaleY : 1.4, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashBg,1,{ scaleX : 0.95, scaleY : 0.95, ease : Elastic.easeOut});
	} else {
		target.css({ opacity : "1"});
		TweenMax.to(src.view.Trash._jTrashBox,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashFront,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
		TweenMax.to(src.view.Trash._jTrashBg,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
	}
};
src.view.Trash.leaveObj = function(target) {
	src.view.Trash.deleteObj(target);
};
src.view.Trash.hide = function() {
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
			if(src.view.Trash._ArrowAnimate != null) src.view.Trash._ArrowAnimate.pause(0);
		}});
	}
};
src.view.Trash.show = function() {
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
	src.view.Trash._ArrowAnimate = TweenMax.to(src.view.Trash._jTrashArrow,0.8,{ y : 30, repeat : -1, yoyo : true, ease : Circ.easeOut});
};
src.view.Trash.deleteObj = function(target) {
	if(src.view.Trash.judgeOnObj(target)) {
		src.view.Trash._isGrabbed = true;
		var id = target.data("id");
		target.css({ 'z-index' : "3000"}).css({ opacity : "1"});
		var trashW = src.view.Trash._jTrashBox.width();
		if(trashW < target.width()) TweenMax.to(target,0.2,{ scaleX : 0.6, scaleY : 0.7});
		var trashTop = src.view.Trash._jTrashBox.offset().top;
		var trashBtm = trashTop + src.view.Trash._jTrashBox.height();
		var tarBtm = target.offset().top + target.height();
		var btmDiff = trashBtm - tarBtm;
		var top = -200 - btmDiff;
		var left = target.parent().width() / 2 - target.width() / 2;
		TweenMax.to(target,0.2,{ y : top, left : left, delay : 0.2});
		TweenMax.to(target,0.1,{ y : 0, delay : 0.5, onComplete : function() {
			target.remove();
			src.Manager.setCounter();
			src.view.mainmenu.Mainmenu.clearDrop(id);
			src.view.Trash._isGrabbed = false;
		}});
		TweenMax.to(src.view.Trash._jTrashBox,0.5,{ y : 15, ease : Elastic.easeIn, delay : 0.4});
		TweenMax.to(src.view.Trash._jTrashFront,0.5,{ y : 15, ease : Elastic.easeIn, delay : 0.4});
		TweenMax.to(src.view.Trash._jTrashBg,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut, delay : 1});
		TweenMax.to(src.view.Trash._jTrashFront,0.8,{ y : 0, scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut, delay : 1});
		TweenMax.to(src.view.Trash._jTrashBox,0.8,{ y : 0, scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut, delay : 1, onComplete : function() {
			if(src.Manager._DragObj == null) src.view.Trash.hide();
		}});
	}
};
src.view.Trash.judgeOnObj = function(target) {
	var y = target.offset().top;
	var h = y + target.height();
	var x = target.offset().left;
	var w = x + target.width();
	var top = src.view.Trash._jTrashBox.offset().top;
	var left = src.view.Trash._jTrashBox.offset().left;
	var bottom = top + src.view.Trash._jTrashBox.height();
	var right = left + src.view.Trash._jTrashBox.width();
	var judge;
	if(top < h && left < w && bottom > y && right > x) judge = true; else judge = false;
	return judge;
};
src.view.Tutorial = function() { };
src.view.Tutorial.__name__ = true;
src.view.Tutorial.Start = function() {
};
src.view.board = {};
src.view.board.Human = function() { };
src.view.board.Human.__name__ = true;
src.view.board.Human.init = function(jArea) {
	src.view.board.Human._SPEED = 0.08;
	src.view.board.Human._jArea = jArea;
	src.view.board.Human._jHuman = src.view.board.Human._jArea.find(".human");
	src.view.board.Human._jHuman.append("<div class=\"human-talk\"><p></p></div>");
	src.view.board.Human._jTalk = src.view.board.Human._jHuman.find(".human-talk");
	src.view.board.Human._jText = src.view.board.Human._jTalk.find("p");
	src.view.board.Human._Timer = new haxe.Timer(8000);
	src.view.board.Human._Timer.run = src.view.board.Human.randamtalk;
};
src.view.board.Human.talk = function(str,delay) {
	if(delay == null) delay = 0;
	src.view.board.Human._jText.children().remove();
	if(str == "quiet") {
		src.view.board.Human._jTalk.hide();
		return;
	}
	src.view.board.Human._jTalk.show();
	src.view.board.Human.set(str);
	var timer = new haxe.Timer(delay);
	timer.run = function() {
		src.view.board.Human.typing(str);
		timer.stop();
	};
};
src.view.board.Human.comment = function(jTarget,str) {
	src.view.board.Human._Timer.stop();
	src.view.board.Human.talk(str);
	jTarget.on("mouseleave",function(event) {
		src.view.board.Human.talk("quiet");
		src.view.board.Human._Timer = new haxe.Timer(8000);
		src.view.board.Human._Timer.run = src.view.board.Human.randamtalk;
		jTarget.unbind("mouseleave");
	});
};
src.view.board.Human.randamtalk = function() {
	var text = src.view.board.Human.talkArray();
	var num = Math.floor(Math.random() * text.length);
	src.view.board.Human.talk(text[num]);
};
src.view.board.Human.set = function(str) {
	var linefeed = 0;
	var lineHight = 20;
	var padding = -30;
	var arrow = -45;
	if(str.indexOf("/") > -1) linefeed = str.split("/").length - 1;
	src.view.board.Human._jTalk.css({ top : padding + -(linefeed * lineHight) + arrow + "px"});
};
src.view.board.Human.typing = function(str) {
	var array = str.split("");
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = [_g1++];
		var text = [src.view.board.Human.wordWrap(array[i[0]])];
		TweenMax.to(src.view.board.Human._jText,0,{ delay : src.view.board.Human._SPEED * i[0], onComplete : (function(text,i) {
			return function() {
				if(array[i[0]] == "/") text[0] = text[0].split("<span>/</span>").join("<br>");
				src.view.board.Human._jText.append(text[0]);
			};
		})(text,i)});
	}
};
src.view.board.Human.wordWrap = function(str) {
	return "<span>" + str + "</span>";
};
src.view.board.Human.talkArray = function() {
	var array = ["おはよう","安くない？","やっす","現在の金額は" + new js.JQuery("#contact").find("#price").text() + "です。"];
	return array;
};
src.view.mainmenu = {};
src.view.mainmenu.Mainmenu = function() { };
src.view.mainmenu.Mainmenu.__name__ = true;
src.view.mainmenu.Mainmenu.init = function(jMenu,jArea) {
	src.view.mainmenu.Mainmenu._jArea = jArea;
	src.view.mainmenu.Mainmenu._jMenu = jMenu;
	src.view.mainmenu.Mainmenu._jBtn = src.view.mainmenu.Mainmenu._jMenu.find(".ttl").find("p");
	var jRevertBtn = jMenu.find(".slider").find("ul li").find(".revertObj");
	src.view.mainmenu.Scrollbar.init(src.view.mainmenu.Mainmenu._jMenu);
	src.view.mainmenu.Mainmenu._jBtn.on("mousedown",function(event) {
		src.view.mainmenu.Mainmenu.clickBtn($(this),event);
	});
	src.view.mainmenu.Mainmenu._jMenu.on("mouseleave",function(event1) {
		src.view.mainmenu.Mainmenu._Timer = new haxe.Timer(1000);
		src.view.mainmenu.Mainmenu._Timer.run = src.view.mainmenu.Mainmenu.close;
	});
	src.view.mainmenu.Mainmenu._jMenu.on("mouseover",function(event2) {
		if(src.view.mainmenu.Mainmenu._Timer == null) return;
		src.view.mainmenu.Mainmenu._Timer.stop();
	});
	jRevertBtn.on("mousedown",function(event3) {
		var jTar = $(this).parent();
		var id = jTar.prop("id");
		src.view.mainmenu.Mainmenu._jArea.find("." + id).remove();
		jTar.removeClass("drop");
		return false;
	});
};
src.view.mainmenu.Mainmenu.setScrollBtn = function(jUp,jDw,scrollTop,height) {
	if(scrollTop > 0) jUp.show(); else jUp.hide();
	if(scrollTop >= height - 220) jDw.hide(); else jDw.show();
};
src.view.mainmenu.Mainmenu.clickBtn = function(jThis,event) {
	var cls = jThis.prop("class");
	var target = src.view.mainmenu.Mainmenu._jMenu.find(".inner");
	var h = target.find("#" + cls).outerHeight() * -1 + 1;
	src.view.mainmenu.Mainmenu.addCurrent(cls);
	if(src.view.mainmenu.Mainmenu._jMenu.prop("class") == "close") src.view.mainmenu.Mainmenu.open(target,h);
};
src.view.mainmenu.Mainmenu.open = function(target,h) {
	src.view.mainmenu.Mainmenu._jMenu.removeClass("close");
	src.view.mainmenu.Mainmenu._jMenu.addClass("open");
	TweenMax.to(target,0.3,{ top : h, ease : Expo.easeOut});
};
src.view.mainmenu.Mainmenu.close = function() {
	src.view.mainmenu.Mainmenu._jMenu.removeClass("open");
	src.view.mainmenu.Mainmenu._jMenu.addClass("close");
	TweenMax.to(src.view.mainmenu.Mainmenu._jMenu.find(".inner"),1,{ top : 0, ease : Elastic.easeOut});
	src.view.mainmenu.Mainmenu._Timer.stop();
};
src.view.mainmenu.Mainmenu.addCurrent = function(cls) {
	src.view.mainmenu.Mainmenu._jMenu.find("div").removeClass("current");
	src.view.mainmenu.Mainmenu._jMenu.find("#" + cls).addClass("current");
};
src.view.mainmenu.Mainmenu.addDrop = function(id) {
	if(src.view.mainmenu.Mainmenu._jMenu.find("#" + id) == null) return;
	src.view.mainmenu.Mainmenu._jMenu.find("#" + id).addClass("drop");
};
src.view.mainmenu.Mainmenu.clearDrop = function(id) {
	if(id == "all") src.view.mainmenu.Mainmenu._jMenu.find(".drop").removeClass("drop"); else src.view.mainmenu.Mainmenu._jMenu.find("#" + id).removeClass("drop");
};
src.view.mainmenu.Scrollbar = function() { };
src.view.mainmenu.Scrollbar.__name__ = true;
src.view.mainmenu.Scrollbar.init = function(jMenu) {
	src.view.mainmenu.Scrollbar._jMenu = jMenu;
	src.view.mainmenu.Scrollbar._jSlider = jMenu.find(".slider");
	var browser = jp.okawa.utils.Ua.getBrowserName();
	var mouseevent;
	if(browser == "Firefox") mouseevent = "wheel"; else mouseevent = "mousewheel";
	if(mouseevent.indexOf("IE") > -1) mouseevent = "mousewheel"; else mouseevent = mouseevent;
	src.view.mainmenu.Scrollbar.set();
	jp.saken.utils.Dom.jWindow.on("resize",src.view.mainmenu.Scrollbar.set);
	src.view.mainmenu.Scrollbar._jSlider.on(mouseevent,src.view.mainmenu.Scrollbar.onMousewheel);
	jMenu.find(".scroll-navi").on("mousedown",src.view.mainmenu.Scrollbar.onMousedown);
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
src.view.mainmenu.Scrollbar.getDom = function(target) {
	src.view.mainmenu.Scrollbar._jInner = target.find("ul");
	src.view.mainmenu.Scrollbar._jScroll = target.siblings(".slider-scroll");
	src.view.mainmenu.Scrollbar._jNavi = src.view.mainmenu.Scrollbar._jScroll.find(".scroll-navi");
	src.view.mainmenu.Scrollbar._max = (src.view.mainmenu.Scrollbar._jInner.height() - src.view.mainmenu.Scrollbar._jSlider.height()) * -1 + 20;
	src.view.mainmenu.Scrollbar._posi = Std.parseInt(src.view.mainmenu.Scrollbar._jInner.css("margin-top"));
	src.view.mainmenu.Scrollbar._scale = src.view.mainmenu.Scrollbar.getScale();
};
src.view.mainmenu.Scrollbar.getScale = function() {
	var vH = src.view.mainmenu.Scrollbar._jSlider.height();
	var tH = src.view.mainmenu.Scrollbar._jInner.height() - 20;
	var sH = src.view.mainmenu.Scrollbar._jScroll.height();
	var scale = vH * 100 / tH;
	return scale;
};
src.view.mainmenu.Scrollbar.onMousewheel = function(event) {
	var target = $(this);
	var delta = event.originalEvent.wheelDelta;
	if(delta == null) delta = Math.round(event.originalEvent.deltaY * -120);
	src.view.mainmenu.Scrollbar.getDom(target);
	src.view.mainmenu.Scrollbar.move(delta);
};
src.view.mainmenu.Scrollbar.onMousedown = function(event) {
	var target = $(this).parent(".slider-scroll").siblings(".slider");
	var base = event.pageY;
	src.view.mainmenu.Scrollbar.getDom(target);
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
	val = (val * src.view.mainmenu.Scrollbar._scale / 100 | 0) * -1;
	TweenMax.to(src.view.mainmenu.Scrollbar._jNavi,0.1,{ marginTop : val, ease : "linear"});
};
src.view.sidemenu = {};
src.view.sidemenu.Color = function() { };
src.view.sidemenu.Color.__name__ = true;
src.view.sidemenu.Color.show = function(jBtn) {
	src.view.sidemenu.Color._jbox = new js.JQuery(".color-config");
	src.view.sidemenu.Color._jColorList = src.view.sidemenu.Color._jbox.find(".color-list");
	if(jBtn.hasClass("open")) {
		src.view.sidemenu.Color.hide(jBtn);
		return;
	}
	src.view.sidemenu.Color._jbox.fadeIn(300,function() {
		TweenMax.set(src.view.sidemenu.Color._jbox,{ x : 0});
		TweenMax.to(src.view.sidemenu.Color._jbox,0.2,{ width : 100, x : 0, ease : Expo.easeOut, onComplete : function() {
			src.view.sidemenu.Color._jColorList.fadeIn();
			jBtn.addClass("open");
		}});
		TweenMax.to(src.view.sidemenu.Color._jbox,0.2,{ height : 140, delay : 0.4, ease : Expo.easeOut});
	});
	src.view.sidemenu.Color.changeColor(jBtn,src.view.sidemenu.Color._jbox);
	src.view.sidemenu.Color._jbox.find(".close-btn").on("mousedown",function(event) {
		src.view.sidemenu.Color.hide(jBtn);
		src.view.sidemenu.Color._jbox.find(".close-btn").unbind("mousedown");
	});
};
src.view.sidemenu.Color.hide = function(jBtn) {
	src.view.sidemenu.Color._jbox.stop().fadeOut(300,function() {
		src.view.sidemenu.Color._jbox.css({ width : 0, height : 0});
		src.view.sidemenu.Color._jColorList.hide();
		jBtn.removeClass("open");
	});
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
src.view.sidemenu.Sidemenu = function() {
};
src.view.sidemenu.Sidemenu.__name__ = true;
src.view.sidemenu.Sidemenu.init = function(data) {
	src.view.sidemenu.Sidemenu._jBtnMatu = new js.JQuery("#set-name-matu");
	src.view.sidemenu.Sidemenu._jBtnTake = new js.JQuery("#set-name-take");
	src.view.sidemenu.Sidemenu._jBtnUme = new js.JQuery("#set-name-ume");
	src.view.sidemenu.Sidemenu._jBtnColor = new js.JQuery("#color-btn");
	src.view.sidemenu.Sidemenu._jBtnHelp = new js.JQuery("#help-btn");
	src.view.sidemenu.Sidemenu._jLightBox = new js.JQuery("#lightbox");
	src.view.sidemenu.Lightbox.init(src.view.sidemenu.Sidemenu._jLightBox);
	src.view.sidemenu.Sidemenu.setRightMenu(data);
};
src.view.sidemenu.Sidemenu.setRightMenu = function(data) {
	src.view.sidemenu.Sidemenu._jBtnMatu.on("mousedown",function(event) {
		src.view.sidemenu.Sidemenu.setPacage(data.set[0].url);
	});
	src.view.sidemenu.Sidemenu._jBtnMatu.on("mouseover",function(event1) {
		src.view.board.Human.comment($(this),"松セットです。/高いです。");
	});
	src.view.sidemenu.Sidemenu._jBtnTake.on("mousedown",function(event2) {
		src.view.sidemenu.Sidemenu.setPacage(data.set[1].url);
	});
	src.view.sidemenu.Sidemenu._jBtnTake.on("mouseover",function(event3) {
		src.view.board.Human.comment($(this),"竹セットです。/やや高いです。");
	});
	src.view.sidemenu.Sidemenu._jBtnUme.on("mousedown",function(event4) {
		src.view.sidemenu.Sidemenu.setPacage(data.set[2].url);
	});
	src.view.sidemenu.Sidemenu._jBtnUme.on("mouseover",function(event5) {
		src.view.board.Human.comment($(this),"梅セットです。/お手頃ですね。");
	});
	src.view.sidemenu.Sidemenu._jBtnColor.on("mousedown",function(event6) {
		src.view.sidemenu.Color.show($(this));
	});
	src.view.sidemenu.Sidemenu._jBtnColor.on("mouseover",function(event7) {
		src.view.board.Human.comment($(this),"色の変更が出来ます。");
	});
	src.view.sidemenu.Sidemenu._jBtnHelp.on("mousedown",function(event8) {
		src.view.sidemenu.Lightbox.show("help",$(this));
	});
	src.view.sidemenu.Sidemenu._jBtnHelp.on("mouseover",function(event9) {
		src.view.board.Human.comment($(this),"ヘルプです。");
	});
	new js.JQuery("#clear-btn").on("mousedown",function(event10) {
		src.view.sidemenu.Sidemenu.setPacage("?");
		src.view.Price.clear();
		src.view.ProductLength.clear();
		src.view.mainmenu.Mainmenu.clearDrop("all");
	});
	new js.JQuery("#clear-btn").on("mouseover",function(event11) {
		src.view.board.Human.comment($(this),"全部消せます。");
	});
};
src.view.sidemenu.Sidemenu.setPacage = function(data) {
	var url = jp.saken.utils.Dom.window.location.toString();
	if(url.indexOf("_x") > -1) {
		src.view.Board.clear();
		src.view.mainmenu.Mainmenu.clearDrop("all");
	}
	src.utils.Param.change(data);
	src.utils.Param.remakeObject();
	src.utils.Drag.getObject();
};
src.view.sidemenu.Lightbox = function() {
	src.view.sidemenu.Sidemenu.call(this);
};
src.view.sidemenu.Lightbox.__name__ = true;
src.view.sidemenu.Lightbox.init = function(jLightBox) {
	src.view.sidemenu.Lightbox._jLightBox = jLightBox;
};
src.view.sidemenu.Lightbox.show = function(cls,jBtn) {
	var jbox = src.view.sidemenu.Lightbox._jLightBox.find("." + cls);
	var sPEED = 300;
	jbox.width(50);
	src.view.sidemenu.Lightbox._jLightBox.fadeIn(sPEED,function() {
		jbox.show();
		TweenMax.to(jbox,1,{ width : 300, ease : Elastic.easeOut});
	});
	jbox.find(".close-btn").on("mousedown",function(event) {
		jbox.fadeOut(sPEED);
		src.view.sidemenu.Lightbox._jLightBox.fadeOut(sPEED);
		jbox.find(".close-btn").unbind("mousedown");
	});
};
src.view.sidemenu.Lightbox.__super__ = src.view.sidemenu.Sidemenu;
src.view.sidemenu.Lightbox.prototype = $extend(src.view.sidemenu.Sidemenu.prototype,{
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
