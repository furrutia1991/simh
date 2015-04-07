var tessel = require('tessel');
var ws = require("nodejs-websocket");
var ambientlib = require('ambient-attx4');
var port = 8000;


var ambient = ambientlib.use(tessel.port['A']);

// INSERT SERVER IP ADDRESS HERE. Always prepend with 'ws://' to indicate websocket
var connection = ws.connect('ws://192.168.43.162:' + port, function() {
  console.log('conectado');
  // When we connect to the server, send some catchy text
  connection.sendText("My milkshake brings all the boys to the yard")
});

// When we get text back
connection.on('text', function(text) {
  console.log(text);
  var led1 = tessel.led[0].output(1);
  var led2 = tessel.led[1].output(0);

  switch(text){

    case 'lights-on':
      // print it out
        led1.toggle();
        led2.toggle();
      
      break;
    case 'lights-off':
      led1.toggle();
      led2.toggle();
      break;
    case 'light-sound':
      light_sound();
      break;
  }
})




function light_sound()
{
  
   // Get points of light and sound data.
    setInterval( function () {
      ambient.getLightLevel( function(err, ldata) {
        if (err) throw err;
        ambient.getSoundLevel( function(err, sdata) {
          if (err) throw err;
          console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
          
      });
    })}, 500); // The readings will happen every .5 seconds unless the trigger is hit

    ambient.setLightTrigger(0.5);

    // Set a light level trigger
    // The trigger is a float between 0 and 1
    ambient.on('light-trigger', function(data) {
      console.log("Our light trigger was hit:", data);

      // Clear the trigger so it stops firing
      ambient.clearLightTrigger();
      //After 1.5 seconds reset light trigger
      setTimeout(function () {

          ambient.setLightTrigger(0.5);

      },1500);
    });

    // Set a sound level trigger
    // The trigger is a float between 0 and 1
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
      console.log("Something happened with sound: ", data);

      // Clear it
      ambient.clearSoundTrigger();

      //After 1.5 seconds reset sound trigger
      setTimeout(function () {

          ambient.setSoundTrigger(0.1);

      },1500);

    });
  

  ambient.on('error', function (err) {
    console.log(err)
  });

}