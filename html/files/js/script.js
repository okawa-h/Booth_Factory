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
	src.drop.Drop.init();
};
src.drop = {};
src.drop.Drop = function() { };
src.drop.Drop.init = function() {
	console.log("test");
};
src.drop.Drop.test = function(event) {
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
