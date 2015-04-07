var express = require('express.io'),
    ws = require("nodejs-websocket"),
	swig = require('swig'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	formidable = require('formidable');


        
    var server = express();
    server.http().io();

var clients = [];

// Scream server example: "hi" -> "HI!!!" 
var ws_server = ws.createServer(function (conn){
    clients.push(conn);
}).listen(8000);






server.io.route('ready', function (socket){
    socket.io.emit('hola', {data: 'hola'});
    console.log('cliente conectado');
});



server.io.route('listo', function (socket){
    console.log('cliente listo');
    socket.io.emit('ok', {data: 'estoy listo'});

});

server.io.route('lights-on', function (socket){
    clients.forEach(function(item){
        item.sendText('lights-on');
    })
})

server.io.route('lights-off', function (socket){
    clients.forEach(function(item){
        item.sendText('lights-off');
    })
})


server.io.route('light-sound', function (socket){
    clients.forEach(function(item){
        item.sendText('light-sound');
    })
})




/*modules*/
require('./passport')(passport);
require('./app/models');


/*settings*/
server.engine('html', swig.renderFile);
server.set('view engine', 'html' );
server.set('views', __dirname + '/app/views/');
server.use(express.static('./public'));
var port = process.env.PORT || 3000;

server.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(passport.session());
server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});




/*controllers*/
require('./app/controllers/homecontroller')(server, passport, formidable);
require('./app/controllers/apicontroller')(server, formidable);
require('./app/controllers/recordcontroller')(server);
require('./app/controllers/actualstatecontroller')(server);
require('./app/controllers/configurationcontroller')(server);
require('./app/controllers/controlscontroller')(server);



server.listen(3000, function (){
    console.log('servidor escuchando...')
});

