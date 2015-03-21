if (!global.hasOwnProperty('db')) { 
  var mongoose = require('mongoose');
 
  // the application is executed on the local machine ...
  
  mongoose.connect('mongodb://localhost/simh');
 
 
  global.db = {
 
    mongoose: mongoose,
 
    //models
    User: require('./user')(mongoose),
    
    // agregar más modelos aquí en caso de haberlos
  };
 
}
 
module.exports = global.db;
