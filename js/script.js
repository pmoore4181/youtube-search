$(document).ready(function) {
	// searachbar handler
	function(){
		var searchField = $('#query');
		var icon = $("#searchbutton")

		// focus event handler
		$('searchField').on('focus', function{
			$(this).animate({ width:'100%' }, 400);
			$(icon).animate({ right: '10px' }, 400);
		})

		// blur event handler
		$('searchField').on('blur', function{
			if (searchField.val() == '') {
				
			}
		})
	}
}