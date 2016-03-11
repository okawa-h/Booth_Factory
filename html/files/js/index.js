(function(window,$,_) {
	
	$(document).on('ready',function(){

		init();

		return false;
		
	});

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		$('li').on({'mouseenter':onMouse});

		ajaxstart('show');

	}

	return false;
})(window,jQuery,baseJS);