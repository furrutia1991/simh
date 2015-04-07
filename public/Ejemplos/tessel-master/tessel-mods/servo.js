var tessel = require('tessel')
  ,servolib = require('servo-pca9685')
  ,servo = servolib.use(tessel.port['B'])
  ,servo1 = 1;

servo.on('ready', function(){
  var position = 0;

  servo.configure(servo1, 0.05, 0.12, function(){
    setInterval(function(){
      servo.move(servo1, position);
      position += 0.1;
      if(position > 1){
        position = 0;
      }
    }, 500);
  })
})
