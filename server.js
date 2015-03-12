var express = require('express'),
	swig = require('swig'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
	passport = require('passport'),
	mongoose = require('mongoose');

var server = express();

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




/*controllers*/
require('./app/controllers/homecontroller')(server, passport, mongoose);




server.listen(port, function  () {
	console.log('escuchando en el puerto ' + port);
});

