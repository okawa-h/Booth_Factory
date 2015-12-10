(function () { "use strict";
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
	src.operation.Param.init(src.Manager._jArea,src.Manager._jAreaObj,src.Manager._jPrice);
	src.Manager.set(src.view.Board.init(src.Manager._jArea,src.Manager._jAreaObj));
	src.operation.Drag.init(src.Manager._jArea,src.Manager._jAreaObj,src.Manager._jMenu);
	src.animate.Animate.init(src.Manager._jMenu,src.Manager._jArea);
	src.view.Trash.init();
	src.view.Sidemenu.init(src.Manager._Data);
	jp.saken.utils.Dom.jWindow.on("click",function(event) {
		src.Manager.set(src.view.Board.count());
	});
	jp.saken.utils.Dom.jWindow.on("mouseup",function(event1) {
		src.Manager.set(src.view.Board.count());
		src.view.Log.write();
		src.view.Trash.none(src.operation.Drag._catchTarget);
		src.operation.Drag.on();
	});
};
src.Manager.set = function(array) {
	src.Manager._jAreaObj = src.Manager._jArea.find("p");
	var accessoryLength = array[0];
	var banarLength = array[1];
	var paperLength = array[2];
	var price = array[3];
	src.view.ProductLength.change(accessoryLength,banarLength,paperLength);
	src.view.Price.change(price);
	var param = src.operation.Param.make(src.Manager._jAreaObj,price);
	src.operation.Param.change("?" + param);
};
src.animate = {};
src.animate.Animate = function() { };
src.animate.Animate.init = function(jMenu,jArea) {
	src.animate.Animate._jMenu = jMenu;
	src.animate.Animate._jArea = jArea;
	src.animate.Mainmenu.init(src.animate.Animate._jMenu);
	src.animate.Title.init();
};
src.animate.Animate.setup = function() {
	var leftMenu = new js.JQuery("#sidemenu-left").find("li");
	var rightMenu = new js.JQuery("#sidemenu-right").find("div");
	var rightListMenu = new js.JQuery("#sidemenu-right").find("li");
	TweenMax.staggerFromTo(leftMenu,1,{ x : -300},{ x : 0, ease : Elastic.easeInOut, onComplete : function() {
		TweenMax.staggerFromTo(rightMenu,0.5,{ x : 300},{ x : 0, ease : Elastic.easeInOut},0.2);
	}},0.2);
};
src.animate.Animate.vibrationItem = function(target) {
	var timeline = new TimelineMax({ repeat : -1});
	timeline.to(target,0.001,{ transform : "rotate(0.4deg) translate(1px,-1px)"});
	timeline.to(target,0.001,{ transform : "rotate(0.8deg) translate(0px,1px)"});
	timeline.to(target,0.001,{ transform : "rotate(0.4deg) translate(-1px,0)"});
	timeline.to(target,0.001,{ transform : "rotate(0deg) translate(0,0)"});
	timeline.to(target,0.001,{ transform : "rotate(-0.4deg) translate(1px,0)"});
	timeline.to(target,0.001,{ transform : "rotate(-0.8deg) translate(0,1px)"});
	timeline.to(target,0.001,{ transform : "rotate(-0.4deg) translate(-1px,-1px)"});
	timeline.to(target,0.001,{ transform : "rotate(0deg) translate(0,0)"});
	target.on("mouseup",function(event) {
		timeline.pause();
		timeline.to(target,0.001,{ transform : "rotate(0deg) translate(0,0)"});
	});
};
src.animate.AnimationTrash = function() { };
src.animate.AnimationTrash.init = function(jTrash,jTrashBox,jTrashArrow) {
	src.animate.AnimationTrash._jTrash = jTrash;
	src.animate.AnimationTrash._jTrashBox = jTrashBox;
	src.animate.AnimationTrash._jTrashArrow = jTrashArrow;
	src.animate.AnimationTrash.hover();
};
src.animate.AnimationTrash.hover = function() {
	src.animate.AnimationTrash._jTrashBox.on("mouseover",function(event) {
		TweenMax.to(src.animate.AnimationTrash._jTrash,1,{ scaleX : 1.3, scaleY : 1.3, ease : Elastic.easeOut});
	});
	src.animate.AnimationTrash._jTrashBox.on("mouseleave",function(event1) {
		TweenMax.to(src.animate.AnimationTrash._jTrash,1,{ scaleX : 1.0, scaleY : 1.0, ease : Elastic.easeOut});
	});
};
src.animate.AnimationTrash.hide = function() {
	src.animate.AnimationTrash._jTrashBox.delay(3000).hide();
};
src.animate.AnimationTrash.deleteObj = function(target) {
	TweenMax.to(target,0.6,{ scaleX : 3.0, scaleY : 3.0, ease : Elastic.easeOut, onComplete : function() {
		target.remove();
	}});
};
src.animate.Mainmenu = function() { };
src.animate.Mainmenu.init = function(jMenu) {
	src.animate.Mainmenu._jMenu = jMenu;
	src.animate.Mainmenu._jBtn = src.animate.Mainmenu._jMenu.find(".ttl").find("p");
	src.animate.Mainmenu._jBtn.on("click",function(event) {
		var jThis = $(this);
		src.animate.Mainmenu.clickBtn(jThis,event);
	});
	src.animate.Mainmenu._jMenu.on("mouseleave",function(event1) {
		src.animate.Mainmenu.animateCloseMenu();
	});
};
src.animate.Mainmenu.clickBtn = function(jThis,event) {
	var cls = jThis.prop("class");
	var target = src.animate.Mainmenu._jMenu.find(".inner");
	var h = target.find("#" + cls).outerHeight() * -1 + 1;
	src.animate.Mainmenu.addCurrent(cls);
	if(src.animate.Mainmenu._jMenu.prop("class") == "close") src.animate.Mainmenu.animateOpenMenu(target,h);
};
src.animate.Mainmenu.animateOpenMenu = function(target,h) {
	src.animate.Mainmenu._jMenu.removeClass("close");
	src.animate.Mainmenu._jMenu.addClass("open");
	target.animate({ top : h + "px"});
};
src.animate.Mainmenu.animateCloseMenu = function() {
	src.animate.Mainmenu._jMenu.removeClass("open");
	src.animate.Mainmenu._jMenu.addClass("close");
	src.animate.Mainmenu._jMenu.find(".inner").animate({ top : 0 + "px"});
};
src.animate.Mainmenu.addCurrent = function(cls) {
	src.animate.Mainmenu._jMenu.find("div").removeClass("current");
	src.animate.Mainmenu._jMenu.find("#" + cls).addClass("current");
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
src.operation.Create.makeObjHtml = function(id,top,left,type,price,src) {
	var html = "";
	html += "<p class=\"" + id + "\"";
	html += "style=\"position:absolute;top:" + top + "px;left:" + left + "px\"";
	html += "data-type=\"" + type + "\" data-price=\"" + price + "\">";
	html += "<img src=\"files/img/product/icon/" + src + ".png\">";
	html += "</p>";
	return html;
};
src.operation.Create.makeListHtml = function(id,type,price,bgImg,img,name,length) {
	var html = "";
	html += "<li title=\"" + id + "\" ";
	html += "data-type=\"" + type + "\" ";
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
	src.operation.Drag._STATUS = false;
	src.operation.Drag._jArea = jArea;
	src.operation.Drag._jAreaObj = jAreaObj;
	src.operation.Drag._jMenu = jMenu;
	src.operation.Drag._jMenu.find(".slider").find("li").find("img").on("mousedown",function(event) {
		event.preventDefault();
		return false;
	});
	src.operation.Drag._jMenu.find(".slider").find("li").on({ mousedown : src.operation.Drag.getListTarget});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.operation.Drag.mousemove, mouseup : src.operation.Drag.mouseup});
	src.operation.Drag.on();
};
src.operation.Drag.getListTarget = function(event) {
	src.operation.Drag._STATUS = true;
	var target = $(this);
	src.operation.Drag.getDiff(event,target);
	target.addClass("drop");
	src.operation.Drag._catchTarget = target.find(".img");
};
src.operation.Drag.getDiff = function(event,target) {
	src.operation.Drag._diffY = event.clientY - target.offset().top;
	src.operation.Drag._diffX = event.clientX - target.offset().left;
};
src.operation.Drag.on = function() {
	src.operation.Drag._jAreaObj = src.operation.Drag._jArea.find("p");
	src.operation.Drag._jAreaObj.on("mousedown",function(event) {
		src.operation.Drag._catchTarget = $(this);
		src.animate.Animate.vibrationItem(src.operation.Drag._catchTarget);
		src.operation.Drag.getDiff(event,src.operation.Drag._catchTarget);
		src.operation.Drag._STATUS = true;
		src.view.Trash.view();
	});
};
src.operation.Drag.mousemove = function(event) {
	if(src.operation.Drag._STATUS) {
		var h = new js.JQuery("#header").height();
		var w = src.operation.Drag._jArea.offset().left;
		if(src.operation.Drag._jMenu.find(".drop").length > 0) {
			h = src.operation.Drag._jMenu.find(".current").offset().top;
			w = src.operation.Drag._catchTarget.parent().offset().left;
		}
		src.operation.Drag._catchTarget.css({ position : "absolute", top : event.clientY - h - src.operation.Drag._diffY, left : event.clientX - w - src.operation.Drag._diffX});
	}
};
src.operation.Drag.mouseup = function(event) {
	src.operation.Drag._STATUS = false;
	src.view.Trash.objDelete(src.operation.Drag._catchTarget,event);
	if(src.operation.Drag._catchTarget == undefined) {
	} else if(src.operation.Drag._catchTarget.parent().parent("li").length > 0) {
		src.operation.Drag.createListToObj(src.operation.Drag._catchTarget.parent().parent("li"),event);
		src.operation.Drag._catchTarget.remove();
		src.operation.Drag._jMenu.find(".drop").removeClass("drop");
	}
};
src.operation.Drag.createListToObj = function(target,event) {
	var title = target.prop("title");
	var type = target.data("type");
	var price = target.data("price");
	var top = event.clientY - new js.JQuery("#header").height() - src.operation.Drag._diffY;
	var left = event.clientX - src.operation.Drag._jArea.offset().left - src.operation.Drag._diffX;
	var html = src.operation.Create.makeObjHtml(title,top,left,type,price,title);
	src.operation.Drag._jArea.find("#layer-" + type).append(html);
};
src.operation.Param = function() { };
src.operation.Param.init = function(jArea,jAreaObj,jPrice) {
	src.operation.Param._jArea = jArea;
	src.operation.Param._jAreaObj = jAreaObj;
	src.operation.Param._jPrice = jPrice;
	src.operation.Param.remakeObject();
};
src.operation.Param.remakeObject = function() {
	var url = jp.saken.utils.Dom.jWindow[0].location.search;
	if(url.indexOf("?") > -1) {
		var param = url.replace("?","");
		src.operation.Param.createObject(param);
	}
};
src.operation.Param.createObject = function(param) {
	var paramArray = param.split("&");
	var data = src.Manager._Data;
	var _g1 = 0;
	var _g = paramArray.length;
	while(_g1 < _g) {
		var i = _g1++;
		var item = paramArray[i].split("=");
		if(item[0] == "obj") src.operation.Param.addHtml(item[1],data);
	}
};
src.operation.Param.addHtml = function(string,data) {
	var target = string.split("|");
	var _g1 = 0;
	var _g = data.object.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(data.object[i].id == target[0]) {
			var title = target[0];
			var type = data.object[i].type;
			var price = data.object[i].price;
			var top = target[2];
			var left = target[1];
			var html = src.operation.Create.makeObjHtml(title,top,left,type,price,title);
			src.operation.Param._jArea.find("#layer-" + type).append(html);
		}
	}
};
src.operation.Param.make = function(jTarget,price) {
	var param = "";
	var _g1 = 0;
	var _g = jTarget.length;
	while(_g1 < _g) {
		var i = _g1++;
		var str;
		if(i == jTarget.length - 1) str = ""; else str = "&";
		param += src.operation.Param.makeObjectParam(jTarget.eq(i)) + str;
	}
	param += "&" + src.operation.Param.makePriceParam(price);
	return param;
};
src.operation.Param.makeObjectParam = function(jTarget) {
	var id = jTarget.prop("class");
	var x = jTarget.css("left").replace("px","");
	var y = jTarget.css("top").replace("px","");
	return "obj=" + id + "|" + x + "|" + y;
};
src.operation.Param.makePriceParam = function(price) {
	return "price=" + price;
};
src.operation.Param.change = function(string) {
	jp.saken.utils.Dom.window.history.replaceState("","",string);
};
src.view = {};
src.view.Board = function() { };
src.view.Board.init = function(jArea,jAreaObj) {
	src.view.Board._jArea = jArea;
	src.view.Board._jAreaObj = jAreaObj;
	return src.view.Board.count();
};
src.view.Board.clear = function() {
	src.view.Board._jArea.find("p").remove();
};
src.view.Board.count = function() {
	var jAreaObj = src.view.Board._jArea.find("p");
	var length = jAreaObj.length;
	var array = [0,0,0,0];
	if(length > 0) array = src.view.Board.loop(jAreaObj,length);
	return array;
};
src.view.Board.loop = function(jItem,length) {
	var price = 0;
	var accessoryLength = 0;
	var banarLength = 0;
	var paperLength = 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var typeData = jItem.eq(i).data("type");
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
		var html = src.operation.Create.makeListHtml(t.id,t.type,t.price,t.bgImg,t.img,t.name,t.length);
		if(t.type == "paper") paperHtml += html; else if(t.type == "accessory") accessoryHtml += html; else if(t.type == "banar") banarHtml += html;
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
src.view.Price = function() { };
src.view.Price.change = function($int) {
	new js.JQuery("#contact").find("#price").find("span").text($int);
};
src.view.ProductLength = function() { };
src.view.ProductLength.change = function(accessoryLength,banarLength,paperLength) {
	new js.JQuery("#length-accessory").find(".item-length").find("span").text(accessoryLength);
	new js.JQuery("#length-banar").find(".item-length").find("span").text(banarLength);
	new js.JQuery("#length-paper").find(".item-length").find("span").text(paperLength);
};
src.view.Sidemenu = function() { };
src.view.Sidemenu.init = function(data) {
	src.view.Sidemenu._jBtnMatu = new js.JQuery("#set-name-matu");
	src.view.Sidemenu._jBtnTake = new js.JQuery("#set-name-take");
	src.view.Sidemenu._jBtnUme = new js.JQuery("#set-name-ume");
	src.view.Sidemenu._jBtnClear = new js.JQuery("#help-btn");
	src.view.Sidemenu.onRightMenu(data);
};
src.view.Sidemenu.onRightMenu = function(data) {
	src.view.Sidemenu._jBtnMatu.on("click",function(event) {
		src.view.Sidemenu.setPacage(data.set[0].url);
	});
	src.view.Sidemenu._jBtnTake.on("click",function(event1) {
		src.view.Sidemenu.setPacage(data.set[1].url);
	});
	src.view.Sidemenu._jBtnUme.on("click",function(event2) {
		src.view.Sidemenu.setPacage(data.set[2].url);
	});
	src.view.Sidemenu._jBtnClear.on("click",function(event3) {
		src.view.Sidemenu.setPacage("?");
		src.view.Price.change(0);
		src.view.ProductLength.change(0,0,0);
	});
};
src.view.Sidemenu.setPacage = function(data) {
	var url = jp.saken.utils.Dom.window.location.search;
	if(url.indexOf("obj") > -1) src.view.Board.clear();
	src.operation.Param.change(data);
	src.operation.Param.remakeObject();
	src.operation.Drag.on();
};
src.view.Trash = function() { };
src.view.Trash.init = function() {
	src.view.Trash._jTrash = new js.JQuery("#trash");
	src.view.Trash._jTrashBox = src.view.Trash._jTrash.find(".trash-box");
	src.view.Trash._jTrashArrow = src.view.Trash._jTrash.find(".trash-arrow");
	src.animate.AnimationTrash.init(src.view.Trash._jTrash,src.view.Trash._jTrashBox,src.view.Trash._jTrashArrow);
};
src.view.Trash.view = function() {
	src.view.Trash._jTrashBox.fadeIn();
	src.view.Trash._jTrashArrow.fadeIn(null,function() {
		TweenMax.to(src.view.Trash._jTrashArrow,0.5,{ top : "-25%", repeat : -1, yoyo : true, ease : Circ.easeOut});
	});
};
src.view.Trash.none = function(target) {
	if(target == null) src.view.Trash._jTrashBox.hide(); else src.animate.AnimationTrash.hide();
	src.view.Trash._jTrashArrow.hide();
};
src.view.Trash.objDelete = function(target,event) {
	var judge = src.view.Trash.judgeDelete(event);
	if(judge) src.animate.AnimationTrash.deleteObj(target);
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
