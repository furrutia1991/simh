module.exports = function (server){
	server.get('/controles', function (req, res){
		return res.render('controls.html');
	})
}