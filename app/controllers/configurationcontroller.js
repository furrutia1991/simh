var configurationcontroller = function (server) {
	server.get('/configuracion', function  (req, res) {
		res.render('configuration.html');
	});

}

module.exports = configurationcontroller;