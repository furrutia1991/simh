var actualstatecontroller = function (server) {
	server.get('/estado-actual', function  (req, res) {
		res.render('actualstate.html');
	});

}

module.exports = actualstatecontroller;