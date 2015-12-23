(function () { "use strict";
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
var js = {};
var jp = {};
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
	src.Manager._jPrice = new js.JQuery("#contact").find("#price");
	src.Manager._lengthAccessory = new js.JQuery("#length-accessory").find(".item-length").find("span");
	src.Manager._lengthBanar = new js.JQuery("#length-Banar").find(".item-length").find("span");
	src.Manager._lengthPaper = new js.JQuery("#length-Paper").find(".item-length").find("span");
	src.view.Data.get(src.Manager._jMenu,src.Manager.start);
	src.view.Log.write();
};
src.Manager.start = function() {
	src.operation.Param.init(src.Manager._jArea);
	src.animate.Animate.init(src.Manager._jMenu,src.Manager._jArea);
	src.view.Board.init(src.Manager._jArea);
	src.view.Mainmenu.init(src.Manager._jMenu);
	src.view.Sidemenu.init(src.Manager._Data);
	src.view.ProductLength.init();
	src.view.Trash.init();
	src.operation.Param.remakeObject();
	src.Manager.setCounter();
	src.operation.Drag.init(src.Manager._jArea,src.Manager._jAreaObj,src.Manager._jMenu);
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
	var banarLength = lengthArray[1];
	var paperLength = lengthArray[2];
	var price = lengthArray[3];
	src.view.ProductLength.change(accessoryLength,banarLength,paperLength);
	src.view.Price.change(price);
	var param = src.operation.Param.make(src.Manager._jAreaObj,length,price);
	src.operation.Param.change("?" + param);
	src.animate.Animate.hoverObject(src.Manager._jAreaObj);
};
src.animate = {};
src.animate.Animate = function() { };
src.animate.Animate.init = function(jMenu,jArea) {
	src.animate.Animate._jMenu = jMenu;
	src.animate.Animate._jArea = jArea;
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
		TweenMax.to($(this),1,{ scaleX : 1.05, scaleY : 1.05, ease : Elastic.easeOut});
	});
	_jAreaObj.on("mouseleave",function(event1) {
		TweenMax.to($(this),0,{ scaleX : 1, scaleY : 1, ease : Expo.easeOut});
	});
};
src.animate.Title = function() { };
src.animate.Title.init = function() {
	src.animate.Title._jTitle = new js.JQuery("#header").find("h1");
	src.animate.Title.view();
};
src.animate.Title.view = function() {
	TweenMax.to(src.animate.Title._jTitle,0.5,{ top : "-50px", repeat : 3, yoyo : true, ease : Circ.easeOut});
};
src.operation = {};
src.operation.Create = function() { };
src.operation.Create.makeObjHtml = function(id,top,left,type,cat,price,src,color) {
	var html = "";
	html += "<p class=\"object " + id + " " + type + "\"";
	html += "style=\"top:" + top + "px;left:" + left + "px\"";
	html += "data-id=\"" + id + "\" data-cat=\"" + cat + "\" data-price=\"" + price + "\">";
	html += "<img src=\"files/img/product/icon/" + color + "/" + src + "\">";
	html += "</p>";
	return html;
};
src.operation.Create.makeListHtml = function(id,type,cat,icon,price,bgImg,img,name,length) {
	var html = "";
	html += "<li id=\"" + id + "\" title=\"" + name + "\" ";
	html += "data-id=\"" + id + "\" ";
	html += "data-type=\"" + type + "\" ";
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
src.operation.Drag = function() { };
src.operation.Drag.init = function(jArea,jAreaObj,jMenu) {
	src.operation.Drag._Status = false;
	src.operation.Drag._jArea = jArea;
	src.operation.Drag._jAreaObj = jAreaObj;
	src.operation.Drag._jMenu = jMenu;
	src.operation.Drag._jMenu.find(".slider").find("li").find("img").on("mousedown",function(event) {
		event.preventDefault();
		return false;
	});
	src.operation.Drag._jMenu.find(".slider").find("li").on({ mousedown : src.operation.Drag.grabList});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.operation.Drag.mousemove, mouseup : src.operation.Drag.mouseup});
	src.operation.Drag._jAreaObj.on("mousedown",function(event1) {
		src.operation.Drag.grabObject($(this),event1);
	});
};
src.operation.Drag.grabList = function(event) {
	var target = $(this);
	if(target.hasClass("drop")) return;
	src.Manager._DragObj = target.find(".img");
	src.Manager._DragObj.addClass("grab");
	src.operation.Drag._Status = true;
	src.operation.Drag.getDiff(event,target);
	src.operation.Drag.mousemove(event);
};
src.operation.Drag.grabObject = function(target,event) {
	src.Manager._DragObj = target;
	src.Manager._DragObj.addClass("grab");
	src.operation.Drag.getDiff(event,src.Manager._DragObj);
	src.operation.Drag._Status = true;
	src.Manager._DragObj.css({ top : event.clientY - src.operation.Drag._diffY, left : event.clientX - src.operation.Drag._diffX});
	src.view.Trash.show();
};
src.operation.Drag.getDiff = function(event,target) {
	src.operation.Drag._diffY = event.offsetY;
	src.operation.Drag._diffX = event.offsetX;
};
src.operation.Drag.mousemove = function(event) {
	if(src.operation.Drag._Status) src.Manager._DragObj.css({ top : event.clientY - src.operation.Drag._diffY, left : event.clientX - src.operation.Drag._diffX});
};
src.operation.Drag.mouseup = function(event) {
	src.operation.Drag._Status = false;
	if(src.Manager._DragObj == null) return;
	if(src.Manager._DragObj.hasClass("grab")) {
		var h = new js.JQuery("#header").height();
		var w = src.operation.Drag._jArea.offset().left;
		src.Manager._DragObj.css({ top : event.pageY - h - src.operation.Drag._diffY, left : event.pageX - w - src.operation.Drag._diffX});
		src.Manager._DragObj.removeClass("grab");
	}
	if(src.Manager._DragObj.parent().parent("li").length > 0) {
		if(src.operation.Drag._jMenu.find(".current").offset().top > event.pageY) {
			src.Manager._DragObj.parent().parent("li").addClass("drop");
			src.operation.Drag.createListToObj(src.Manager._DragObj.parent().parent("li"),event);
			src.operation.Drag._jAreaObj.off("mousedown");
			src.operation.Drag._jAreaObj = src.operation.Drag._jArea.find(".object");
			src.operation.Drag._jAreaObj.on("mousedown",function(event1) {
				src.operation.Drag.grabObject($(this),event1);
			});
		}
	}
	src.operation.Drag.judgeArea(src.Manager._DragObj);
	src.Manager._DragObj = null;
};
src.operation.Drag.createListToObj = function(target,event) {
	var id = target.data("id");
	var type = target.data("type");
	var cat = target.data("cat");
	var icon = target.data("icon");
	var price = target.data("price");
	var color = src.operation.Param.getParamOption("color");
	var top = event.pageY - new js.JQuery("#header").height() - src.operation.Drag._diffY;
	var left = event.pageX - src.operation.Drag._jArea.offset().left - src.operation.Drag._diffX;
	var html = src.operation.Create.makeObjHtml(id,top,left,type,cat,price,icon,color);
	src.operation.Drag._jArea.find(".board").append(html);
	src.Manager._DragObj = src.operation.Drag._jArea.find(".board").find(".object." + id);
};
src.operation.Drag.judgeArea = function(jTarget) {
	var SPEED = 200;
	var top = jTarget.css("top").split("px").join("");
	var left = jTarget.css("left").split("px").join("");
	var t = Std.parseInt(top);
	var l = Std.parseInt(left);
	var bottom = t + jTarget.height();
	var right = l + jTarget.width();
	var areaB = src.operation.Drag._jArea.height();
	var areaR = src.operation.Drag._jArea.width();
	if(top.indexOf("-") == 0) t = 0;
	if(left.indexOf("-") == 0) l = 0;
	if(bottom > areaB) t = areaB - jTarget.height();
	if(right > areaR) l = areaR - jTarget.width();
	jTarget.animate({ top : t, left : l},SPEED);
};
src.operation.Drag.getObject = function() {
	src.operation.Drag._jAreaObj = src.operation.Drag._jArea.find(".object");
	src.operation.Drag._jAreaObj.on("mousedown",function(event) {
		src.operation.Drag.grabObject($(this),event);
	});
};
src.operation.Param = function() { };
src.operation.Param.init = function(jArea) {
	src.operation.Param._jArea = jArea;
};
src.operation.Param.remakeObject = function() {
	var url = jp.saken.utils.Dom.jWindow[0].location;
	if(url == null) url = "null"; else url = "" + url;
	if(url.indexOf("?") > -1) {
		var param = url.split("?");
		src.operation.Param.createObject(param[1]);
	}
};
src.operation.Param.createObject = function(param) {
	var paramArray = param.split("&");
	var length = paramArray.length;
	var data = src.Manager._Data;
	var color = src.operation.Param.makeColorParam().split("color=").join("");
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var item = paramArray[i].split("=");
		if(item[0] == "obj") src.operation.Param.addHtml(item[1],data,color);
	}
};
src.operation.Param.addHtml = function(string,data,color) {
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
			html += src.operation.Create.makeObjHtml(id,top,left,type,cat,price,icon,color);
			src.view.Mainmenu.addDrop(id);
		}
	}
	src.operation.Param._jArea.find(".board").append(html);
};
src.operation.Param.make = function(jTarget,length,price) {
	var param = "";
	param += src.operation.Param.makeColorParam();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(i == 0) param += "&";
		var str;
		if(i == length - 1) str = ""; else str = "&";
		param += src.operation.Param.makeObjectParam(jTarget.eq(i)) + str;
	}
	param += "&" + src.operation.Param.makePriceParam(price);
	return param;
};
src.operation.Param.makeObjectParam = function(jTarget) {
	var id = jTarget.data("id");
	var x = jTarget.css("left").split("px").join("");
	var y = jTarget.css("top").split("px").join("");
	return "obj=" + id + "-" + x + "-" + y;
};
src.operation.Param.makePriceParam = function(price) {
	return "price=" + price;
};
src.operation.Param.makeColorParam = function() {
	var color = new js.JQuery("#color-btn").prop("class");
	return "color=" + color;
};
src.operation.Param.change = function(string) {
	History.replaceState("","",string);
};
src.operation.Param.get = function() {
	var param = jp.saken.utils.Dom.window.history;
	return param;
};
src.operation.Param.getParamOption = function(string) {
	if(string == null) string = "price";
	string += "=";
	var option = jp.saken.utils.Dom.window.location.search.split(string);
	var option2 = option[1];
	var option3 = "";
	if(option2.indexOf("&") != -1) {
		option = option2.split("&");
		option3 = option[0];
	} else option3 = option2;
	return option3;
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
	var banarLength = 0;
	var paperLength = 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var typeData = jItem.eq(i).data("cat");
		var priceData = jItem.eq(i).data("price");
		if(typeData == "accessory") accessoryLength++;
		if(typeData == "banar") banarLength++;
		if(typeData == "paper") paperLength++;
		price += priceData;
	}
	return [accessoryLength,banarLength,paperLength,price];
};
src.view.Data = function() { };
src.view.Data.get = function(jMenu,callback) {
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
	var banarHtml = "";
	var paperHtml = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var t = data.object[i];
		var html = src.operation.Create.makeListHtml(t.id,t.type,t.cat,t.icon,t.price,t.bgImg,t.img,t.name,t.length);
		if(t.cat == "paper") paperHtml += html; else if(t.cat == "accessory") accessoryHtml += html; else if(t.cat == "banar") banarHtml += html;
	}
	src.view.Data.setHTML(accessoryHtml,banarHtml,paperHtml);
};
src.view.Data.setHTML = function(accessoryHtml,banarHtml,paperHtml) {
	src.view.Data._jMenu.find("#sale-accessory").find(".slider").find("ul").append(accessoryHtml);
	src.view.Data._jMenu.find("#sale-banar").find(".slider").find("ul").append(banarHtml);
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
	src.view.Mainmenu.setListSize(jMenu);
	src.view.Mainmenu._jBtn.on("mousedown",function(event) {
		src.view.Mainmenu.clickBtn($(this),event);
	});
	src.view.Mainmenu._jMenu.on("mouseleave",function(event1) {
		src.view.Mainmenu.close();
	});
};
src.view.Mainmenu.setListSize = function(jMenu) {
	jMenu.find(".slider").find("ul").each(function() {
		var jThis = $(this);
		var jList = jThis.find("li");
		var right;
		if(jList.css("margin-right")) right = jList.css("margin-right").replace("px",""); else right = "0";
		var length = jList.length;
		var width = jList.width();
		jThis.width((width + Std.parseInt(right) + 10) * length);
	});
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
src.view.Price.change = function(price) {
	new js.JQuery("#contact").find("#price").find("span").text(price == null?"null":"" + price);
};
src.view.Price.clear = function() {
	new js.JQuery("#contact").find("#price").find("span").text("0");
};
src.view.ProductLength = function() { };
src.view.ProductLength.init = function() {
	src.view.ProductLength.lengthAccessory = new js.JQuery("#length-accessory").find(".item-length").find("span");
	src.view.ProductLength.lengthBanar = new js.JQuery("#length-banar").find(".item-length").find("span");
	src.view.ProductLength.lengthPaper = new js.JQuery("#length-paper").find(".item-length").find("span");
};
src.view.ProductLength.change = function(accessoryLength,banarLength,paperLength) {
	src.view.ProductLength.lengthAccessory.text(accessoryLength == null?"null":"" + accessoryLength);
	src.view.ProductLength.lengthBanar.text(banarLength == null?"null":"" + banarLength);
	src.view.ProductLength.lengthPaper.text(paperLength == null?"null":"" + paperLength);
};
src.view.ProductLength.clear = function() {
	src.view.ProductLength.lengthAccessory.text("0");
	src.view.ProductLength.lengthBanar.text("0");
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
	src.operation.Param.change(data);
	src.operation.Param.remakeObject();
	src.operation.Drag.getObject();
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
		target.remove();
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
