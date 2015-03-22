var jwt = require("jsonwebtoken");

module.exports = function (server, formidable) {
	findUser = function (req, res, next) {
		var form = new formidable.IncomingForm();
		 
	    form.parse(req, function(err, fields, files){
	    	if (fields.email && fields.password)
	    	{
	    		db.User.findOne({email: fields.email, password: fields.password}, function  (err, user)
	    		{
	    			if (err) return next(err);	
					user.token = jwt.sign({ foo: 'bar' }, 'shhhhh');
					user.save(function (err, user) {
						if (err)throw(err);
						return res.send(user);
					});	    				
    			
	    		});		
	    	}
	    	else
	    	{
	    		return next(err);
	    	}
	    
	    });
		
	}
	server.post('/api/auth', findUser);
}

