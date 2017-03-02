package src.utils;

import js.jquery.JQuery;
import jp.okawa.utils.Ua;

class UserAgent {

	public static function isMobile():Bool {

		var isMobile : Bool = (Ua.getDevice() == 'sp');

		if (isMobile) {
			new JQuery('#all').hide();
			new JQuery('body,html').css({ 'min-width':'100%' });
			new JQuery('body').append(getHTML());
		}

		return isMobile;

	}

		private static function getHTML():String {

			return
				'<div id="mobile-view">
					<p>まるごとブースファクトリーは<br>スマートフォンではご利用できません。<br>PCやタブレットでお楽しみください。</p>
				</div>';

		}

}
