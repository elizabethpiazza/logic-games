var express = require('express');
var router = express.Router();
var passport = require('passport')
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		console.log(req.user.local);
		return next();}
	res.redirect('/login');
};

// login
router.get('/', isLoggedIn, function(req, res) {
	res.render('index.ejs', {
		user : req.user
	});
});

router.get('/login', function(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/',
	failureRedirect : '/login',
	failureFlash : true
}));

// sign up
router.get('/signup', function(req, res) {
	res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/',
	failureRedirect : '/signup',
	failureFlash : true
}));

// paywall
router.get('/profile', isLoggedIn, function(req, res) {
	res.cookie('user', req.user, { expires: new Date(Date.now() + 9000000), httpOnly: true }).render('profile.ejs');
});

// logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;