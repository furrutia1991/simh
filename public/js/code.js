$(document).ready(function() {
	var socket = io.connect();
    socket
    .on("ok", function(data) {
        console.log(data.data);
    })
    .emit('ready');
    

	$('.actual-photo')
	.mouseover(function(event) {
		$('.take-picture').css('display', 'block');;
	})
	.mouseout(function(event) {
		$('.take-picture').css('display', 'none');		
	});

	$('.btn-actual').click(function(event) {		
		socket.emit('light-sound');	
	});

});