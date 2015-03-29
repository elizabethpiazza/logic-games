function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();}
	res.redirect('/home');
};

module.exports = function(app, passport) {
	// HOME PAGE (must be logged in)
	app.get('/', isLoggedIn, function(req, res) {
		res.render('index.ejs');
	});

	// HOME PAGE (not logged in)
	app.get('/home', function(req, res) {
		res.render('open/home.ejs', {
			user : req.user, message: req.flash('registerMessage')
		});
	});

	// LOGIN
	app.get('/login', function(req, res) {
		res.render('open/login.ejs', { message: req.flash('loginMessage') }); 
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));

    // REGISTER
	app.get('/register', function(req, res) {
		res.render('open/register.ejs', { message: req.flash('registerMessage') });
	});
	app.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/register',
		failureFlash : true
	}));

	// LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/home');
    });
};
