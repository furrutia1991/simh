var homecontroller = function  (server, passport, formidable) {

	server.get('/welcome', function (req, res) {
		res.render('welcome.html', {firstTime: true});
	});
	server.get('/', function  (req, res) {

		res.render('login.html');
	});

//	server.get('/configuracion',function(req,res) 
//		{res.render('configuracion.html');
//	});

	server.post('/save-user', function  (req, res) {
		var form = new formidable.IncomingForm();
		 
	    form.parse(req, function(err, fields, files) {
	   
	    	if (fields.email && fields.password)
	    	{
	    		db.User.findById(req.user._id, function (err, user) {
	    			if (err)throw(err);
	    			user.email = fields.email;
	    			user.password = fields.password;
	    			user.save(function (err) {
	    				throw (err);
	    			});
	    			return res.redirect('/home');
	    		});
	    	}

	    });
	});

	server.get('/home',function (req, res) {
		db.User.findById(req.user._id, function  (err, user) {
			if (err) throw(err);
			if (!(user.email && user.password))
			{
				return res.redirect('/welcome');
				
			}
			else
			{
				return res.render('home.html', {user: req.user});
			}
		});
		
	});

	server.get('/welcome', function  (req, res) {
		res.render('')
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