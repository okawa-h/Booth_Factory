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
	src.Manager._jArea = new js.JQuery("#play-room");
	src.Manager._jPrice = new js.JQuery("#price-room").find("h1");
	src.drop.Drop.init(src.Manager._jItem.find(".slider").find("li"),src.Manager._jArea);
	src.drop.Juge.init(src.Manager._jPrice,src.Manager._jItem);
	src.animate.Menu.init();
};
src.animate = {};
src.animate.Menu = function() { };
src.animate.Menu.init = function() {
	src.animate.Menu._jMenu = new js.JQuery("#mainmenu");
	src.animate.Menu._jBtn = src.animate.Menu._jMenu.find(".ttl").find("p");
	src.animate.Menu._jBtn.on("mousedown",function(event) {
		var jThis = $(this);
		src.animate.Menu.clickBtn(jThis,event,src.animate.Menu._jMenu,src.animate.Menu._jBtn);
	});
	src.animate.Menu._jMenu.on("mouseleave",function(event1) {
		src.animate.Menu.animateClose();
	});
};
src.animate.Menu.clickBtn = function(jThis,event,_jMenu,_jBtn) {
	var cls = jThis.prop("class");
	var target = _jMenu.find(".inner");
	var h = target.find("#" + cls).outerHeight() * -1 + 1;
	src.animate.Menu.addCurrent(cls);
	if(_jMenu.prop("class") == "close") src.animate.Menu.animateOpen(target,h);
};
src.animate.Menu.animateOpen = function(target,h) {
	src.animate.Menu.addOpen();
	target.animate({ top : h + "px"});
};
src.animate.Menu.animateClose = function() {
	src.animate.Menu.addClose();
	var target = src.animate.Menu._jMenu.find(".inner");
	target.animate({ top : 0 + "px"});
};
src.animate.Menu.addCurrent = function(cls) {
	src.animate.Menu._jMenu.find("div").removeClass("current");
	src.animate.Menu._jMenu.find("#" + cls).addClass("current");
};
src.animate.Menu.addOpen = function() {
	src.animate.Menu._jMenu.removeClass("close");
	src.animate.Menu._jMenu.addClass("open");
};
src.animate.Menu.addClose = function() {
	src.animate.Menu._jMenu.removeClass("open");
	src.animate.Menu._jMenu.addClass("close");
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
	src.drop.Drop.createImg($(this));
	src.drop.Drop.target.addClass("drop");
	src.drop.Drop._dy = event.pageY - src.drop.Drop.target.offset().top;
	src.drop.Drop._dx = event.pageX - src.drop.Drop.target.offset().left;
};
src.drop.Drop.createImg = function(target) {
	var title = target.prop("title");
	var html = "<p class=\"catch\"><img src=\"files/img/drop_item/" + title + ".png\"></p>";
	src.drop.Drop._Area.append(html);
	src.drop.Drop.catchTarget = src.drop.Drop._Area.find(".catch");
	console.log(title);
	src.drop.Drop._Area.find("p").on("mousedown",function(event) {
		target = $(this);
		src.drop.Drop._dy = event.pageY - target.offset().top;
		src.drop.Drop._dx = event.pageX - target.offset().left;
		src.drop.Drop._STATUS = true;
		src.drop.Drop.catchTarget = $(this);
	});
};
src.drop.Drop.moveDrag = function(event) {
	src.drop.Drop.moveItem(event);
	if(src.drop.Drop._STATUS) src.drop.Drop.catchTarget.removeClass("catch");
};
src.drop.Drop.leaveDrag = function(event) {
	src.drop.Drop._STATUS = false;
};
src.drop.Drop.moveItem = function(event) {
	if(src.drop.Drop._STATUS) src.drop.Drop.catchTarget.css({ position : "absolute", top : event.pageY - src.drop.Drop._dy, left : event.pageX - src.drop.Drop._dx});
};
src.drop.Juge = function() { };
src.drop.Juge.init = function(_jPrice,_jItem) {
	_jPrice.on("mousedown",function(event) {
		src.drop.Juge.getPrice(event,_jPrice,_jItem);
	});
};
src.drop.Juge.getPrice = function(event,_jPrice,_jItem) {
	console.log(_jItem.find(".drop").length);
	var buyItem = _jItem.find(".drop");
	console.log(src.drop.Juge.price);
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
