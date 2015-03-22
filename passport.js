TwitterStrategy = require('passport-twitter').Strategy,
FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function  (passport) {
	passport.serializeUser(function  (user, done) {
		done(null,user);
	});
	passport.deserializeUser(function  (obj, done) {
		done(null,obj);
	});
	
	passport.use(new TwitterStrategy({
		consumerKey: 's2Bz0Zk0UBZlrViaobeyyucSz',
		consumerSecret: 'PUyFK0tIPEVxMVD827aR1JLnW2Vn0oWqyYI4pRAeBHiQvVSAa6',
		callbackURL: '/twitter/callback'	
	}, function  (accessToken, refreshToken, profile, done) {
		db.User.findOne({provider_id: profile.id}, function  (err, user) {
			if (err) throw(err);
			if (!err && user != null) return done(null,user);

			var user = new db.User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName,
				username: profile.username,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err)throw err;
				done(null, user);
			});
		});
	}));	
	
	passport.use(new FacebookStrategy({
		clientID		: '363807767144732',
		clientSecret	: 'a5b2fae02c432d744e395c4df4e34a61',
		callbackURL		: '/facebook/callback',
		profileFields	: ['id', 'displayName', 'photos']	
	}, function  (accessToken, refreshToken, profile, done) {
		db.User.findOne({provider_id: profile.id}, function  (err, user) {
			
			if (err) throw(err);
			if (!err && user != null) return done(null,user);

			var user = new db.User({
				provider_id: profile.id,
				provider: profile.provider,
				name: profile.displayName,
				photo: profile.photos[0].value
			});
			user.save(function (err) {
				if (err)throw err;
				done(null, user);
			});
		});
	}));	

	
}