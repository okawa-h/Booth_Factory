package src.utils;

import js.Browser;
import js.html.Window;
import js.jquery.JQuery;
import js.jquery.Event;

class Dom {

	public static var jWindow : JQuery = new JQuery(Browser.window);
	public static var window  : Window = Browser.window;
	public static var jBody   : JQuery = new JQuery('body');

}
