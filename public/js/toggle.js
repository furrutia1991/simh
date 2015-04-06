$(document).ready(function(){  
 alert('hello'); 
 
  $("#todas").change(function()
  {
  	var a = $(this).prop('checked');
  	alert(a);
  	if (a ==true)
  	{
  		on();
	}
	else
	{
		off();
 	}

  })
});  

function on()
  		{ 
  		//	$('#ruido').bootstrapToggle('on')
  			$('#movimiento').prop('checked', true).change()
  			$('#ruido').prop('checked', true).change()
  			$('#temperatura').prop('checked', true).change()
  			$('#luces').prop('checked', true).change()
  			$('#humedad').prop('checked', true).change()
  		
  		}

function off()
		{ 
		//	$('#ruido').bootstrapToggle('off')
			$('#movimiento').prop('checked', false).change()
  			$('#ruido').prop('checked', false).change()
 			$('#temperatura').prop('checked', false).change()
  			$('#luces').prop('checked', false).change()
  			$('#humedad').prop('checked', false).change()
		
		}