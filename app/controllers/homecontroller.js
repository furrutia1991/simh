var homecontroller = function  (server, passport) {
	server.get('/', function  (req, res) {

		res.render('login.html');
	});

	server.get('/home', function (req, res) {
		
		res.render('home.html', {user: req.user});
	});

	server.get('/twitter', passport.authenticate('twitter'));
	server.get('/twitter/callback',passport.authenticate('twitter', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));
	server.get('/facebook', passport.authenticate('facebook'));

	server.get('/facebook/callback/', passport.authenticate('facebook',{	       
	     successRedirect:"/home",
	     failureRedirect:"/"
	 }));
}



module.exports = homecontroller;