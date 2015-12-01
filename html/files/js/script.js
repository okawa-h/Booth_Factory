(function () { "use strict";
var js = {};
var jp = {};
jp.saken = {};
jp.saken.utils = {};
jp.saken.utils.Dom = function() { };
var src = {};
src.Main = function() { };
src.Main.main = function() {
	new js.JQuery("document").ready(src.Manager.init);
};
src.Manager = function() { };
src.Manager.init = function(event) {
	src.Manager._jItem = new js.JQuery("#mainmenu");
	src.Manager._jArea = new js.JQuery("#mainboard");
	src.Manager._jPrice = new js.JQuery("#contact").find("#price");
	src.drop.Drop.init(src.Manager._jItem.find(".slider").find("li"),src.Manager._jArea);
	src.judge.Judge.init(src.Manager._jArea,src.Manager._jPrice);
	src.animate.Animate.init(src.Manager._jItem);
};
src.animate = {};
src.animate.Animate = function() { };
src.animate.Animate.init = function(_jItem) {
	src.animate.Animate._jMenu = _jItem;
	src.animate.Animate._jBtn = src.animate.Animate._jMenu.find(".ttl").find("p");
	src.animate.Animate._jBtn.on("click",function(event) {
		var jThis = $(this);
		src.animate.Animate.clickBtn(jThis,event,src.animate.Animate._jMenu,src.animate.Animate._jBtn);
	});
	src.animate.Animate._jMenu.on("mouseleave",function(event1) {
		src.animate.Animate.animateClose();
	});
};
src.animate.Animate.clickBtn = function(jThis,event,_jMenu,_jBtn) {
	var cls = jThis.prop("class");
	var target = _jMenu.find(".inner");
	var h = target.find("#" + cls).outerHeight() * -1 + 1;
	src.animate.Animate.addCurrent(cls);
	if(_jMenu.prop("class") == "close") src.animate.Animate.animateOpen(target,h);
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
src.drop = {};
src.drop.Drop = function() { };
src.drop.Drop.init = function(_jItem,_jArea) {
	src.drop.Drop._STATUS = false;
	src.drop.Drop._Area = _jArea;
	_jItem.find("img").on("mousedown",function(event) {
		event.preventDefault();
		return false;
	});
	_jItem.on({ mousedown : src.drop.Drop.getTarget});
	jp.saken.utils.Dom.jWindow.on({ mousemove : src.drop.Drop.moveDrag, mouseup : src.drop.Drop.leaveDrag});
};
src.drop.Drop.getTarget = function(event) {
	src.drop.Drop._STATUS = true;
	src.drop.Drop.target = $(this);
	src.drop.Drop.getDiff(event,src.drop.Drop.target);
	src.drop.Drop.createImg(src.drop.Drop.target);
	src.drop.Drop.target.addClass("drop");
};
src.drop.Drop.createImg = function(target) {
	var html = src.drop.Drop.createHtml(target);
	var dash = new js.JQuery("#dashboard");
	dash.append(html[0]);
	src.drop.Drop.catchTarget = src.drop.Drop._Area.find(".catch");
	src.drop.Drop._Area.find("p").on("mousedown",function(event) {
		target = $(this);
		src.drop.Drop.getDiff(event,target);
		src.drop.Drop._STATUS = true;
		src.drop.Drop.catchTarget = $(this);
	});
};
src.drop.Drop.getDiff = function(event,target) {
	src.drop.Drop._dy = event.clientY - target.offset().top;
	src.drop.Drop._dx = event.clientX - target.offset().left;
};
src.drop.Drop.moveItem = function(event) {
	var h = new js.JQuery("#header").height();
	if(src.drop.Drop._STATUS) src.drop.Drop.catchTarget.css({ position : "absolute", top : event.clientY - h - src.drop.Drop._dy, left : event.clientX - src.drop.Drop._Area.offset().left - src.drop.Drop._dx});
};
src.drop.Drop.createHtml = function(target) {
	var title = target.prop("title");
	var type = target.data("type");
	var price = target.data("price");
	var html = "<p class=\"catch\" data-type=\"" + type + "\" data-price=\"" + price + "\">";
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
};
src.judge = {};
src.judge.Judge = function() { };
src.judge.Judge.init = function(_jArea,_jPrice) {
	jp.saken.utils.Dom.jWindow.on("mouseup",function(event) {
		src.judge.Judge.getItemLength(_jArea,_jPrice);
	});
};
src.judge.Judge.getItemLength = function(_jArea,_jPrice) {
	var jItem = _jArea.find("p");
	var length = jItem.length;
	if(length > 0) src.judge.Judge.loop(jItem,length,_jPrice);
};
src.judge.Judge.loop = function(jItem,length,_jPrice) {
	var price = 0;
	var accessory_length = 0;
	var banar_length = 0;
	var paper_length = 0;
	var jSideL = new js.JQuery("#sidemenu-left");
	var jPrice = _jPrice.find("span");
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
