(function(window,$,_) {

	var _$startBtn;
	
	$(document).on('ready',function(){

		_$startBtn = $('#start-btn');
		init();

		return false;
		
	});

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		setURL();

	}

	/* =======================================================================
	Set URL
	========================================================================== */
	function setURL() {

		var $target = _$startBtn.find('a');
		var href    = $target.prop('href');
		var param   = '?utm_content=' + getParam();
		$target.prop('href',href + param);

		return false;
	}

	/* =======================================================================
	Get Param
	========================================================================== */
	function getParam() {

		var url = location.href;

		if (url.indexOf('?') < 0 || url.indexOf('=') < 0) return 'none';

		var parameters  = url.split("?");
		var params      = parameters[1].split("&");
		var paramsArray = [];

		for ( i = 0, len = params.length; i < len; i++ ) {

			var neet = params[i].split("=");
			paramsArray.push(neet[0]);
			paramsArray[neet[0]] = neet[1];

		}

		var id = paramsArray["utm_content"];

		return id;
	}

	return false;
})(window,jQuery,baseJS);