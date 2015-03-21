$(document).ready(function() {
	$('.actual-photo')
	.mouseover(function(event) {
		$('.take-picture').css('display', 'block');;
	})
	.mouseout(function(event) {
		$('.take-picture').css('display', 'none');		
	});

});