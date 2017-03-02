package src.utils;

import js.jquery.JQuery;
import jp.okawa.utils.Ua;

class UserAgent {

	public static function isMobile():Bool {

		var isMobile : Bool = (Ua.getDevice() == 'sp');

		if (isMobile) {
			new JQuery('body').append(getHTML());
		}

		return isMobile;

	}

		private static function getHTML():String {

			return
				'<div id="mobile-view">
					<p>申し訳ございません。<br>PCでお楽しみください。</p>
				</div>';

		}

}
