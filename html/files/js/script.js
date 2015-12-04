(function () { "use strict";
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
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
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
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = true;
haxe.Http.prototype = {
	request: function(post) {
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
var js = {};
var jp = {};
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
	src.Manager._jPrice = new js.JQuery("#contact").find("#price");
	src.data.Data.get(src.Manager.start);
};
src.Manager.start = function() {
	src.judge.Log.checkUrl();
	src.drop.Drop.init();
	src.judge.Judge.init();
	src.animate.Animate.init();
};
src.animate = {};
src.animate.Animate = function() { };
src.animate.Animate.__name__ = true;
src.animate.Animate.init = function() {
	src.animate.Animate._jMenu = src.Manager._jMenu;
	src.animate.Animate._jBtn = src.animate.Animate._jMenu.find(".ttl").find("p");
	src.animate.Animate._jBtn.on("click",function(event) {
		var jThis = $(this);
		src.animate.Animate.clickBtn(jThis,event);
	});
	src.animate.Animate._jMenu.on("mouseleave",function(event1) {
		src.animate.Animate.animateClose();
	});
};
src.animate.Animate.clickBtn = function(jThis,event) {
	var cls = jThis.prop("class");
	var target = src.animate.Animate._jMenu.find(".inner");
	var h = target.find("#" + cls).outerHeight() * -1 + 1;
	src.animate.Animate.addCurrent(cls);
	if(src.animate.Animate._jMenu.prop("class") == "close") src.animate.Animate.animateOpen(target,h);
};
src.animate.Animate.animateOpen = function(target,h) {
	src.animate.Animate.addOpen();
	target.animate({ top : h + "px"});
};
src.animate.Animate.animateClose = function() {
	src.animate.Animate.addClose();
	var target = src.animate.Animate._jMenu.find(".inner");
	target.animate({ top : 0 + "px"});
};
src.animate.Animate.addCurrent = function(cls) {
	src.animate.Animate._jMenu.find("div").removeClass("current");
	src.animate.Animate._jMenu.find("#" + cls).addClass("current");
};
src.animate.Animate.addOpen = function() {
	src.animate.Animate._jMenu.removeClass("close");
	src.animate.Animate._jMenu.addClass("open");
};
src.animate.Animate.addClose = function() {
	src.animate.Animate._jMenu.removeClass("open");
	src.animate.Animate._jMenu.addClass("close");
};
src.data = {};
src.data.Data = function() { };
src.data.Data.__name__ = true;
src.data.Data.get = function(callback) {
	src.data.Data._callback = callback;
	var request = new haxe.Http("files/data/data.json");
	request.onError = function(data) {
		console.log("error!");
	};
	request.onData = src.data.Data.onData;
	request.request(false);
};
src.data.Data.onData = function(data) {
	src.Manager._Data = JSON.parse(data);
	src.data.Set.init(src.data.Data._callback);
};
src.data.Set = function() { };
src.data.Set.__name__ = true;
src.data.Set.init = function(_callback) {
	src.data.Set.loop(src.Manager._Data,_callback);
};
src.data.Set.loop = function(data,_callback) {
	var length = data.object.length;
	var paper_array = "";
	var accessory_array = "";
	var banar_array = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var obj = src.data.Set.makeHtml(data.object[i]);
		if(obj[1] == "paper") paper_array += obj[0]; else if(obj[1] == "accessory") accessory_array += obj[0]; else if(obj[1] == "banar") banar_array += obj[0];
	}
	src.Manager._jMenu.find("#sale-paper").find(".slider").find("ul").append(paper_array);
	src.Manager._jMenu.find("#sale-accessory").find(".slider").find("ul").append(accessory_array);
	src.Manager._jMenu.find("#sale-banar").find(".slider").find("ul").append(banar_array);
	_callback();
};
src.data.Set.makeHtml = function(target) {
	var html = "";
	html += "<li title=\"" + Std.string(target.id) + "\" ";
	html += "data-type=\"" + Std.string(target.type) + "\" ";
	html += "data-price=\"" + Std.string(target.price) + "\">";
	html += "<div class=\"img-box\">";
	html += "<div class=\"img\">";
	html += "<img src=\"files/img/prodct/" + Std.string(target.img) + "\">";
	html += "</div>";
	html += "</div>";
	html += "<dl>";
	html += "<dt>" + Std.string(target.name) + "</dt>";
	html += "<dd class=\"length\">" + Std.string(target.length) + "</dd>";
	html += "<dd class=\"price\"><span>" + Std.string(target.price) + "</span>円</dd>";
	html += "</dl>";
	html += "</li>";
	return [html,target.type];
};
src.drop = {};
src.drop.Drop = function() { };
src.drop.Drop.__name__ = true;
src.drop.Drop.init = function() {
	src.drop.Drop._STATUS = false;
	src.drop.Drop._jArea = src.Manager._jArea;
	src.drop.Drop._jMenu = src.Manager._jMenu;
	src.drop.Drop._jMenu.find(".slider").find("li").find("img").on("mousedown",function(event) {
		event.preventDefault();
		return false;
	});
	src.drop.Drop._jMenu.find(".slider").find("li").on({ mousedown : src.drop.Drop.getTarget});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.drop.Drop.moveDrag, mouseup : src.drop.Drop.leaveDrag});
};
src.drop.Drop.getTarget = function(event) {
	src.drop.Drop._STATUS = true;
	src.drop.Drop.target = $(this);
	src.drop.Drop.getDiff(event,src.drop.Drop.target);
	src.drop.Drop.target.addClass("drop");
	src.drop.Drop.catchTarget = src.drop.Drop.target.find(".img");
};
src.drop.Drop.getDiff = function(event,target) {
	src.drop.Drop._dy = event.clientY - target.offset().top;
	src.drop.Drop._dx = event.clientX - target.offset().left;
};
src.drop.Drop.moveItem = function(event) {
	if(src.drop.Drop._STATUS) {
		var h = new js.JQuery("#header").height();
		var w = src.drop.Drop._jArea.offset().left;
		if(src.drop.Drop._jMenu.find(".drop").length > 0) {
			h = src.drop.Drop._jMenu.find(".current").offset().top;
			w = src.drop.Drop.catchTarget.parent().offset().left;
		}
		src.drop.Drop.catchTarget.css({ position : "absolute", top : event.clientY - h - src.drop.Drop._dy, left : event.clientX - w - src.drop.Drop._dx});
	}
};
src.drop.Drop.createImg = function(target,event) {
	var html = src.drop.Drop.createHtml(target,event);
	console.log(html);
	src.drop.Drop._jArea.find("#layer-" + html[1]).append(html[0]);
	src.drop.Drop._jArea.find("p").on("mousedown",function(event1) {
		target = $(this);
		src.drop.Drop.getDiff(event1,target);
		src.drop.Drop._STATUS = true;
		src.drop.Drop.catchTarget = $(this);
	});
};
src.drop.Drop.createHtml = function(target,event) {
	var title = target.prop("title");
	var type = target.data("type");
	var price = target.data("price");
	var html = "<p class=\"" + title + "\"";
	var h = new js.JQuery("#header").height();
	var w = src.drop.Drop._jArea.offset().left;
	var top = event.clientY - h - src.drop.Drop._dy;
	var left = event.clientX - w - src.drop.Drop._dx;
	html += "style=\"position:absolute;top:" + top + "px;left:" + left + "px\"";
	html += "data-type=\"" + type + "\" data-price=\"" + price + "\">";
	html += "<img src=\"files/img/drop_item/" + title + ".png\">";
	html += "</p>";
	return [html,type];
};
src.drop.Drop.moveDrag = function(event) {
	src.drop.Drop.moveItem(event);
	if(src.drop.Drop._STATUS) src.drop.Drop.catchTarget.removeClass("catch");
};
src.drop.Drop.leaveDrag = function(event) {
	src.drop.Drop._STATUS = false;
	if(src.drop.Drop.catchTarget.parent().parent("li").length > 0) {
		src.drop.Drop.createImg(src.drop.Drop.catchTarget.parent().parent("li"),event);
		src.drop.Drop.catchTarget.remove();
		src.drop.Drop._jMenu.find(".drop").removeClass("drop");
	}
};
src.judge = {};
src.judge.Judge = function() { };
src.judge.Judge.__name__ = true;
src.judge.Judge.init = function() {
	src.judge.Judge._jArea = src.Manager._jArea;
	src.judge.Judge._jPrice = src.Manager._jPrice;
	jp.saken.utils.Dom.jWindow.on("mouseup",function(event) {
		src.judge.Judge.getItemLength();
	});
};
src.judge.Judge.getItemLength = function() {
	var jItem = src.judge.Judge._jArea.find("p");
	var length = jItem.length;
	if(length > 0) src.judge.Judge.loop(jItem,length);
	src.judge.Log.init(jItem,src.judge.Judge._jPrice);
};
src.judge.Judge.loop = function(jItem,length) {
	var price = 0;
	var accessory_length = 0;
	var banar_length = 0;
	var paper_length = 0;
	var jSideL = new js.JQuery("#sidemenu-left");
	var jPrice = src.judge.Judge._jPrice.find("span");
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var type_data = jItem.eq(i).data("type");
		var price_data = jItem.eq(i).data("price");
		if(type_data == "accessory") accessory_length++;
		if(type_data == "banar") banar_length++;
		if(type_data == "paper") paper_length++;
		price += price_data;
	}
	jSideL.find("#length-accessory").find(".item-length").find("span").text(accessory_length);
	jSideL.find("#length-banar").find(".item-length").find("span").text(banar_length);
	jSideL.find("#length-paper").find(".item-length").find("span").text(paper_length);
	jPrice.text(price);
};
src.judge.Log = function() { };
src.judge.Log.__name__ = true;
src.judge.Log.init = function(jTarget,jPrice) {
	src.judge.Log._jPrice = jPrice;
	var string = "";
	var _g1 = 0;
	var _g = jTarget.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tex;
		if(i == jTarget.length - 1) tex = ""; else tex = "&";
		string += src.judge.Log.makeObjectParam(jTarget.eq(i)) + tex;
	}
	string += "&" + src.judge.Log.makePriceParam();
	jp.saken.utils.Dom.window.history.replaceState("","","?" + string);
};
src.judge.Log.makeObjectParam = function(jTarget) {
	var id = jTarget.prop("class");
	var x = jTarget.css("left").replace("px","");
	var y = jTarget.css("top").replace("px","");
	return "obj=" + id + "|" + x + "|" + y;
};
src.judge.Log.makePriceParam = function() {
	var jPrice = src.judge.Log._jPrice.find("span").text();
	return "price=" + jPrice;
};
src.judge.Log.checkUrl = function() {
	var url;
	url = jp.saken.utils.Dom.jWindow[0].location.search;
	if(url.indexOf("?") > -1) {
		var param = url.replace("?","");
		src.judge.Log.remakeObject(param);
	}
};
src.judge.Log.remakeObject = function(param) {
	var _param = param.split("&");
	var _g1 = 0;
	var _g = _param.length;
	while(_g1 < _g) {
		var i = _g1++;
		var item = _param[i].split("=");
		if(item[0] == "obj") src.judge.Log.makeHtml(item[1]); else if(item[0] == "price") src.Manager._jPrice.text(item[1]);
	}
};
src.judge.Log.makeHtml = function(string) {
	var target = string.split("|");
	var _Data = src.Manager._Data;
	console.log(_Data.object);
	var _g1 = 0;
	var _g = _Data.object.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(_Data.object[i].id == target[0]) {
			var title = target[0];
			var type = _Data.object[i].type;
			var price = _Data.object[i].price;
			var html = "<p class=\"" + title + "\"";
			var top = target[2];
			var left = target[1];
			html += "style=\"position:absolute;top:" + top + "px;left:" + left + "px\"";
			html += "data-type=\"" + type + "\" data-price=\"" + price + "\">";
			html += "<img src=\"files/img/drop_item/" + title + ".png\">";
			html += "</p>";
			src.Manager._jArea.find("#layer-" + type).append(html);
		}
	}
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
