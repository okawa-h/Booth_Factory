(function () { "use strict";
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
var Lambda = function() { };
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
var Std = function() { };
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
var jp = {};
jp.okawa = {};
jp.okawa.utils = {};
jp.okawa.utils.Estimate = function() { };
jp.okawa.utils.Estimate.insertComma = function(numberString) {
	var ereg = new EReg("(\\d)(?=(\\d{3})+$)","g");
	return ereg.replace(numberString,"$1,");
};
var js = {};
jp.saken = {};
jp.saken.utils = {};
jp.saken.utils.Dom = function() { };
js.Browser = function() { };
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var src = {};
src.Main = function() { };
src.Main.main = function() {
	new js.JQuery("document").ready(src.Manager.init);
};
src.Manager = function() { };
src.Manager.init = function(event) {
	src.Manager._jMenu = new js.JQuery("#mainmenu");
	src.Manager._jArea = new js.JQuery("#mainboard");
	src.view.Data.set(src.Manager._jMenu,src.Manager.start);
	src.view.Log.write();
};
src.Manager.start = function() {
	src.utils.Param.init(src.Manager._jArea);
	src.animate.Animate.init(src.Manager._jMenu,src.Manager._jArea);
	src.view.Board.init(src.Manager._jArea);
	src.view.Price.init();
	src.view.Mainmenu.init(src.Manager._jMenu);
	src.view.Sidemenu.init(src.Manager._Data);
	src.view.ProductLength.init();
	src.view.Trash.init();
	src.utils.Param.remakeObject();
	src.Manager.setCounter();
	src.utils.Drag.init(src.Manager._jArea,src.Manager._jAreaObj,src.Manager._jMenu);
	jp.saken.utils.Dom.jWindow.on("mouseup",function(event) {
		src.Manager.setCounter();
		src.view.Log.write();
		src.view.Trash.hide(src.Manager._DragObj);
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
		src.view.Mainmenu.addDrop(src.Manager._jAreaObj.eq(i).data("id"));
	}
	var accessoryLength = lengthArray[0];
	var bannerlength = lengthArray[1];
	var paperLength = lengthArray[2];
	var price = lengthArray[3];
	src.view.ProductLength.change(accessoryLength,bannerlength,paperLength);
	src.view.Price.change(price);
	var param = src.utils.Param.make(src.Manager._jAreaObj,length,price);
	src.utils.Param.change("?" + param);
	src.animate.Animate.hoverObject(src.Manager._jAreaObj);
};
src.animate = {};
src.animate.Animate = function() { };
src.animate.Animate.init = function(jMenu,jArea) {
	src.animate.Animate._jMenu = jMenu;
	src.animate.Animate._jArea = jArea;
	src.animate.Animate._jTitle = new js.JQuery("#header").find("h1");
};
src.animate.Animate.setup = function() {
	var leftMenu = new js.JQuery("#sidemenu-left").find("li");
	var rightMenu = new js.JQuery("#sidemenu-right").find("div");
	var rightListMenu = new js.JQuery("#sidemenu-right").find("li");
	TweenMax.staggerFromTo(leftMenu,1,{ x : -300},{ x : 0, ease : Elastic.easeInOut, onComplete : function() {
		TweenMax.staggerFromTo(rightMenu,0.5,{ x : 300},{ x : 0, ease : Elastic.easeInOut},0.2);
	}},0.2);
};
src.animate.Animate.vibrationObj = function(target) {
	src.animate.Animate._timeline = new TimelineMax({ repeat : -1}).to(target,0.001,{ transform : "rotate(0.4deg) translate(1px,-1px)"},"").to(target,0.001,{ transform : "rotate(0.8deg) translate(0px,1px)"},"").to(target,0.001,{ transform : "rotate(0.4deg) translate(-1px,0)"},"").to(target,0.001,{ transform : "rotate(0deg) translate(0,0)"},"").to(target,0.001,{ transform : "rotate(-0.4deg) translate(1px,0)"},"").to(target,0.001,{ transform : "rotate(-0.8deg) translate(0,1px)"},"").to(target,0.001,{ transform : "rotate(-0.4deg) translate(-1px,-1px)"},"").to(target,0.001,{ transform : "rotate(0deg) translate(0,0)"},"");
};
src.animate.Animate.stopTimeline = function(target) {
	src.animate.Animate._timeline.pause();
	src.animate.Animate._timeline.to(target,0.001,{ transform : "rotate(0deg) translate(0,0)"},"");
};
src.animate.Animate.hoverObject = function(_jAreaObj) {
	_jAreaObj.on("mouseover",function(event) {
		if($(this).hasClass("accessory")) return;
		TweenMax.to($(this),1,{ scaleX : 1.05, scaleY : 1.05, ease : Elastic.easeOut});
	});
	_jAreaObj.on("mouseleave",function(event1) {
		if($(this).hasClass("accessory")) return;
		TweenMax.to($(this),0,{ scaleX : 1, scaleY : 1, ease : Expo.easeOut});
	});
};
src.utils = {};
src.utils.Drag = function() { };
src.utils.Drag.init = function(jArea,jAreaObj,jMenu) {
	src.utils.Drag._Status = false;
	src.utils.Drag._jArea = jArea;
	src.utils.Drag._jAreaObj = jAreaObj;
	src.utils.Drag._jMenu = jMenu;
	src.utils.Drag._jMenu.find(".slider").find("li").on({ mousedown : src.utils.Drag.grabList});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.utils.Drag.mousemove, mouseup : src.utils.Drag.mouseup});
	src.utils.Drag._jAreaObj.on("mousedown",function(event) {
		src.utils.Drag.grabObject($(this),event);
	});
};
src.utils.Drag.grabList = function(event) {
	event.preventDefault();
	var target = $(this);
	src.Manager._DragObj = target.find(".img");
	src.Manager._DragObj.addClass("grab");
	src.utils.Drag._Status = true;
	src.utils.Drag.getDiff(event,target);
	src.utils.Drag.mousemove(event);
};
src.utils.Drag.grabObject = function(target,event) {
	event.preventDefault();
	src.Manager._DragObj = target;
	if(src.Manager._DragObj.hasClass("accessory")) return;
	src.Manager._DragObj.addClass("grab");
	src.utils.Drag.getDiff(event,src.Manager._DragObj);
	src.utils.Drag._Status = true;
	src.Manager._DragObj.css({ top : event.clientY - src.utils.Drag._diffY, left : event.clientX - src.utils.Drag._diffX});
	src.view.Trash.show();
};
src.utils.Drag.getDiff = function(event,target) {
	src.utils.Drag._diffY = event.offsetY;
	src.utils.Drag._diffX = event.offsetX;
};
src.utils.Drag.mousemove = function(event) {
	if(src.utils.Drag._Status) src.Manager._DragObj.css({ top : event.clientY - src.utils.Drag._diffY, left : event.clientX - src.utils.Drag._diffX});
};
src.utils.Drag.mouseup = function(event) {
	src.utils.Drag._Status = false;
	if(src.Manager._DragObj == null) return;
	if(src.Manager._DragObj.hasClass("grab")) {
		var h = new js.JQuery("#header").height();
		var w = src.utils.Drag._jArea.offset().left;
		src.Manager._DragObj.css({ top : event.pageY - h - src.utils.Drag._diffY, left : event.pageX - w - src.utils.Drag._diffX});
		src.Manager._DragObj.removeClass("grab");
	}
	if(src.Manager._DragObj.parent().parent("li").length > 0) {
		if(src.utils.Drag._jMenu.find(".current").offset().top > event.pageY) {
			src.Manager._DragObj.parent().parent("li").addClass("drop");
			src.utils.Drag.createListToObj(src.Manager._DragObj.parent().parent("li"),event);
			src.utils.Drag._jAreaObj.off("mousedown");
			src.utils.Drag._jAreaObj = src.utils.Drag._jArea.find(".object");
			src.utils.Drag._jAreaObj.on("mousedown",function(event1) {
				src.utils.Drag.grabObject($(this),event1);
			});
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
	var price = target.data("price");
	var color = src.utils.Param.getParamOption("color");
	var top = event.pageY - new js.JQuery("#header").height() - src.utils.Drag._diffY;
	var left = event.pageX - src.utils.Drag._jArea.offset().left - src.utils.Drag._diffX;
	if(type == "accessory") {
		var abs = target.data("abs").split(",");
		top = Std.parseFloat(abs[0]);
		left = Std.parseFloat(abs[1]);
	}
	var html = src.utils.Html.getObj(id,top,left,type,cat,price,icon,color);
	src.utils.Drag._jArea.find(".board").append(html);
	src.Manager._DragObj = src.utils.Drag._jArea.find(".board").find(".object." + id);
};
src.utils.Drag.judgeArea = function(jTarget) {
	if(jTarget.hasClass("accessory")) return;
	var SPEED = 200;
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
	jTarget.animate({ top : t, left : l},SPEED);
};
src.utils.Drag.getObject = function() {
	src.utils.Drag._jAreaObj = src.utils.Drag._jArea.find(".object");
	src.utils.Drag._jAreaObj.on("mousedown",function(event) {
		src.utils.Drag.grabObject($(this),event);
	});
};
src.utils.Html = function() { };
src.utils.Html.getObj = function(id,top,left,type,cat,price,src,color) {
	var html = "";
	html += "<p class=\"object " + id + " " + type + "\"";
	html += "style=\"top:" + top + "px;left:" + left + "px\"";
	html += "data-id=\"" + id + "\" data-cat=\"" + cat + "\" data-price=\"" + price + "\">";
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
src.utils.Param = function() { };
src.utils.Param.init = function(jArea) {
	src.utils.Param._jArea = jArea;
};
src.utils.Param.remakeObject = function() {
	var url = jp.saken.utils.Dom.jWindow[0].location;
	if(url == null) url = "null"; else url = "" + url;
	if(url.indexOf("?") > -1) {
		var param = url.split("?");
		src.utils.Param.createObject(param[1]);
	}
};
src.utils.Param.createObject = function(param) {
	var paramArray = param.split("&");
	var length = paramArray.length;
	var data = src.Manager._Data;
	var color = src.utils.Param.getColorParam().split("color=").join("");
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var item = paramArray[i].split("=");
		if(item[0] == "obj") src.utils.Param.addHtml(item[1],data,color);
	}
};
src.utils.Param.addHtml = function(string,data,color) {
	var target = string.split("-");
	var length = data.object.length;
	var html = "";
	var id = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(data.object[i].id == target[0]) {
			id = target[0];
			var type = data.object[i].type;
			var cat = data.object[i].cat;
			var icon = data.object[i].icon;
			var price = data.object[i].price;
			var top = Std.parseFloat(target[2]);
			var left = Std.parseFloat(target[1]);
			html += src.utils.Html.getObj(id,top,left,type,cat,price,icon,color);
			src.view.Mainmenu.addDrop(id);
		}
	}
	src.utils.Param._jArea.find(".board").append(html);
};
src.utils.Param.make = function(jTarget,length,price) {
	var param = "";
	param += src.utils.Param.getColorParam();
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
src.utils.Param.getObjectParam = function(jTarget) {
	var id = jTarget.data("id");
	var x = jTarget.css("left").split("px").join("");
	var y = jTarget.css("top").split("px").join("");
	return "obj=" + id + "-" + x + "-" + y;
};
src.utils.Param.getPriceParam = function(price) {
	return "price=" + price;
};
src.utils.Param.getColorParam = function() {
	var color = new js.JQuery("#color-btn").prop("class");
	return "color=" + color;
};
src.utils.Param.change = function(string) {
	History.replaceState("","",string);
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
	if(str.indexOf("&") != -1) {
		option = str.split("&");
		param = option[0];
	} else param = str;
	return param;
};
src.view = {};
src.view.Board = function() { };
src.view.Board.init = function(jArea) {
	src.view.Board._jArea = jArea;
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
		if(t.type == "accessory") abs = t.abs; else abs = "";
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
src.view.Log = function() { };
src.view.Log.write = function() {
	var request = new haxe.Http("files/php/history.php");
	var param = jp.saken.utils.Dom.jWindow[0].location.search;
	request.onError = function(data) {
	};
	request.onData = src.view.Log.onData;
	request.setParameter("act","write");
	request.setParameter("param",param);
	request.request(true);
};
src.view.Log.onData = function(data) {
};
src.view.Mainmenu = function() { };
src.view.Mainmenu.init = function(jMenu) {
	src.view.Mainmenu._jMenu = jMenu;
	src.view.Mainmenu._jBtn = src.view.Mainmenu._jMenu.find(".ttl").find("p");
	src.view.Mainmenu._jScrollUp = jMenu.find(".slider-up");
	src.view.Mainmenu._jScrollDw = jMenu.find(".slider-down");
	src.view.Mainmenu._jBtn.on("mousedown",function(event) {
		src.view.Mainmenu.clickBtn($(this),event);
	});
	src.view.Mainmenu._jMenu.on("mouseleave",function(event1) {
		src.view.Mainmenu.close();
	});
	src.view.Mainmenu._jScrollUp.on("mousedown",function(event2) {
		src.view.Mainmenu.scroll($(this),"-=165px");
	});
	src.view.Mainmenu._jScrollDw.on("mousedown",function(event3) {
		src.view.Mainmenu.scroll($(this),"165px");
	});
};
src.view.Mainmenu.scroll = function(jThis,param) {
	var jTarget = jThis.prev(".slider").find("ul");
	jTarget.animate({ 'margin-top' : param});
};
src.view.Mainmenu.clickBtn = function(jThis,event) {
	var cls = jThis.prop("class");
	var target = src.view.Mainmenu._jMenu.find(".inner");
	var h = target.find("#" + cls).outerHeight() * -1 + 1;
	src.view.Mainmenu.addCurrent(cls);
	if(src.view.Mainmenu._jMenu.prop("class") == "close") src.view.Mainmenu.open(target,h);
};
src.view.Mainmenu.open = function(target,h) {
	src.view.Mainmenu._jMenu.removeClass("close");
	src.view.Mainmenu._jMenu.addClass("open");
	TweenMax.to(target,0.3,{ top : h, ease : Sine.easeOut});
};
src.view.Mainmenu.close = function() {
	src.view.Mainmenu._jMenu.removeClass("open");
	src.view.Mainmenu._jMenu.addClass("close");
	TweenMax.to(src.view.Mainmenu._jMenu.find(".inner"),1,{ top : 0, ease : Elastic.easeOut});
};
src.view.Mainmenu.addCurrent = function(cls) {
	src.view.Mainmenu._jMenu.find("div").removeClass("current");
	src.view.Mainmenu._jMenu.find("#" + cls).addClass("current");
};
src.view.Mainmenu.addDrop = function(id) {
	if(src.view.Mainmenu._jMenu.find("#" + id) == null) return;
	src.view.Mainmenu._jMenu.find("#" + id).addClass("drop");
};
src.view.Mainmenu.clearDrop = function(id) {
	if(id == "all") src.view.Mainmenu._jMenu.find(".drop").removeClass("drop"); else src.view.Mainmenu._jMenu.find("#" + id).removeClass("drop");
};
src.view.Price = function() { };
src.view.Price.init = function() {
	src.view.Price._jContact = new js.JQuery("#contact");
	src.view.Price._jContactBox = src.view.Price._jContact.find(".contact-box");
	src.view.Price._jPrice = src.view.Price._jContactBox.find("#price").find("span");
};
src.view.Price.change = function(price) {
	src.view.Price.calPriceSize(price);
	var reprice = jp.okawa.utils.Estimate.insertComma(price == null?"null":"" + price);
	src.view.Price._jPrice.text(reprice);
};
src.view.Price.calPriceSize = function(price) {
	var val = "icon_price_";
	var str = src.view.Price._jContactBox.css("background-image");
	if(10000 > price) val += "ss"; else if(50000 > price) val += "s"; else if(100000 > price) val += "m"; else if(200000 < price) val += "l";
	val += ".png";
	var txt = str.split("url(\"")[1];
	var url = txt.split("\")")[0];
	var urlArr = url.split("/");
	var tar = urlArr[urlArr.length - 1];
	tar = url.split(tar).join(val);
	src.view.Price._jContactBox.css({ background : "url(\"" + tar + "\") no-repeat 15px 50% #fff"});
};
src.view.Price.clear = function() {
	src.view.Price._jPrice.text("0");
};
src.view.ProductLength = function() { };
src.view.ProductLength.init = function() {
	src.view.ProductLength.lengthAccessory = new js.JQuery("#length-accessory").find(".item-length").find("span");
	src.view.ProductLength.lengthBanner = new js.JQuery("#length-banner").find(".item-length").find("span");
	src.view.ProductLength.lengthPaper = new js.JQuery("#length-paper").find(".item-length").find("span");
};
src.view.ProductLength.change = function(accessoryLength,bannerLength,paperLength) {
	src.view.ProductLength.lengthAccessory.text(accessoryLength == null?"null":"" + accessoryLength);
	src.view.ProductLength.lengthBanner.text(bannerLength == null?"null":"" + bannerLength);
	src.view.ProductLength.lengthPaper.text(paperLength == null?"null":"" + paperLength);
};
src.view.ProductLength.clear = function() {
	src.view.ProductLength.lengthAccessory.text("0");
	src.view.ProductLength.lengthBanner.text("0");
	src.view.ProductLength.lengthPaper.text("0");
};
src.view.Sidemenu = function() { };
src.view.Sidemenu.init = function(data) {
	src.view.Sidemenu._jBtnMatu = new js.JQuery("#set-name-matu");
	src.view.Sidemenu._jBtnTake = new js.JQuery("#set-name-take");
	src.view.Sidemenu._jBtnUme = new js.JQuery("#set-name-ume");
	src.view.Sidemenu._jBtnColor = new js.JQuery("#color-btn");
	src.view.Sidemenu._jColorList = src.view.Sidemenu._jBtnColor.find(".color-list");
	src.view.Sidemenu._jBtnClear = new js.JQuery("#help-btn");
	src.view.Sidemenu.setRightMenu(data);
};
src.view.Sidemenu.setRightMenu = function(data) {
	src.view.Sidemenu._jBtnMatu.on("mousedown",function(event) {
		src.view.Sidemenu.setPacage(data.set[0].url);
	});
	src.view.Sidemenu._jBtnTake.on("mousedown",function(event1) {
		src.view.Sidemenu.setPacage(data.set[1].url);
	});
	src.view.Sidemenu._jBtnUme.on("mousedown",function(event2) {
		src.view.Sidemenu.setPacage(data.set[2].url);
	});
	src.view.Sidemenu._jBtnColor.on("mousedown",function(event3) {
		src.view.Sidemenu.showChangeColor();
	});
	src.view.Sidemenu._jColorList.find("li").on("mousedown",function(event4) {
		src.view.Sidemenu.changeColor($(this));
	});
	src.view.Sidemenu._jBtnClear.on("mousedown",function(event5) {
		src.view.Sidemenu.setPacage("?");
		src.view.Price.clear();
		src.view.ProductLength.clear();
		src.view.Mainmenu.clearDrop("all");
	});
};
src.view.Sidemenu.setPacage = function(data) {
	var url = jp.saken.utils.Dom.jWindow[0].location;
	if(url == null) url = "null"; else url = "" + url;
	if(url.indexOf("obj") > -1) src.view.Board.clear();
	src.utils.Param.change(data);
	src.utils.Param.remakeObject();
	src.utils.Drag.getObject();
};
src.view.Sidemenu.showChangeColor = function() {
	if(src.view.Sidemenu._jColorList.hasClass("open")) {
		src.view.Sidemenu._jColorList.animate({ width : "0px", 'margin-left' : "0px"},null,function() {
			src.view.Sidemenu._jColorList.hide();
		});
		src.view.Sidemenu._jColorList.removeClass("open");
		return;
	}
	src.view.Sidemenu._jColorList.show();
	src.view.Sidemenu._jColorList.addClass("open");
	src.view.Sidemenu._jColorList.animate({ width : "200px", 'margin-left' : "-150px"});
};
src.view.Sidemenu.changeColor = function(target) {
	if(target.hasClass("current")) return;
	var cls = target.prop("class");
	src.view.Sidemenu._jBtnColor.removeClass();
	src.view.Sidemenu._jBtnColor.addClass(cls);
	src.view.Sidemenu._jColorList.find("li").removeClass("current");
	target.addClass("current");
};
src.view.Trash = function() { };
src.view.Trash.init = function() {
	src.view.Trash._jTrash = new js.JQuery("#trash");
	src.view.Trash._jTrashBox = src.view.Trash._jTrash.find(".trash-box");
	src.view.Trash._jTrashArrow = src.view.Trash._jTrash.find(".trash-arrow");
	src.view.Trash._jTrashBox.on("mouseover",function(event) {
		TweenMax.to(src.view.Trash._jTrash,1,{ scaleX : 1.2, scaleY : 1.2, ease : Elastic.easeOut});
		src.view.Trash._jTrashBox.off("mouseup");
		src.view.Trash._jTrashBox.on("mouseup",function(event1) {
			src.view.Trash.deleteObj(src.Manager._DragObj,event1);
		});
	});
	src.view.Trash._jTrashBox.on("mouseleave",function(event2) {
		TweenMax.to(src.view.Trash._jTrash,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
	});
};
src.view.Trash.show = function() {
	src.view.Trash._jTrashBox.show();
	src.view.Trash._jTrashArrow.show(null,function() {
	});
};
src.view.Trash.hide = function(target) {
	if(target == null) src.view.Trash._jTrashBox.hide(); else src.view.Trash._jTrashBox.delay(3000).hide();
	src.view.Trash._jTrashArrow.hide();
};
src.view.Trash.deleteObj = function(target,event) {
	var judge = src.view.Trash.judgeDelete(event);
	if(judge) {
		var id = target.data("id");
		src.view.Mainmenu.clearDrop(id);
		TweenMax.to(target,0.6,{ scaleX : 2.0, scaleY : 2.0, ease : Elastic.easeOut, onComplete : function() {
			target.remove();
		}});
	}
};
src.view.Trash.judgeDelete = function(event) {
	var y = 0;
	var x = 0;
	y = event.clientY;
	x = event.clientX;
	var top = src.view.Trash._jTrashBox.offset().top;
	var left = src.view.Trash._jTrashBox.offset().left;
	var bottom = top + src.view.Trash._jTrashBox.height();
	var right = left + src.view.Trash._jTrashBox.width();
	var judge;
	if(y > top && bottom > y && x > left && right > x) judge = true; else judge = false;
	return judge;
};
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
