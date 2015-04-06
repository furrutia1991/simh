module.exports = function (server) {

	server.get('/historial', function (req, res) {
		res.render('record.html');
	});
}