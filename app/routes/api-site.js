var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Type = require('../models/type');
var Game = require('../models/game');
var User = require('../models/user');
var Attempt = require('../models/attempt');

router.get('/', function(req, res) {
	res.json({ message: 'site api' });
});

// All param resolutions
router.param('type', function (req, res, next, id) {
	var query = Type.findById(id);
	query.exec(function (err, type) {
		if (err) { return next(err); }
		if (!type) { return next(new Error('Sorry, that type doesn\'t exist')); }
		req.type = type;
		return next();
	});
});
router.param('game', function (req, res, next, id) {
	var query = Game.findById(id);
	query.exec(function (err, game) {
		if (err) { return next(err); }
		if (!game) { return next(new Error('Sorry, that game doesn\'t exist')); }
		req.game = game;
		return next();
	});
});
router.param('attempt', function (req, res, next, id) {
	var query = Attempt.findById(id);
	query.exec(function (err, attempt) {
		if (err) { return next(err); }
		if (!attempt) { return next(new Error('Sorry, that attempt doesn\'t exist')); }
		req.attempt = attempt;
		return next();
	});
});
router.param('user', function (req, res, next, id) {
	var query = User.findById(id);
	query.exec(function (err, user) {
		if (err) { return next(err); }
		if (!user) { return next(new Error('Sorry, that user doesn\'t exist')); }
		req.user = user;
		return next();
	});
});


// TYPES
router.route('/types')
	.get(function(req, res, next) {
		Type.find(function(err, types) {
			if (err) { return next(new Error('Sorry, there was an error retrieving types')); }
			res.json(types);
		});
	});
router.route('/types/:type')
	.get(function(req, res, next) {
		req.type.populate('games', function(err, type) {
			if (err) { return next(new Error('Sorry, that type doesn\'t exist')); }
			res.json(type);
		});
	});

// GAMES
router.route('/games')
	.get(function(req, res, next) {
		Game.find(function(err, games) {
			if (err) { return next(new Error('Sorry, there was an error retrieving games')); }
			res.json(games);
		});
	});
router.route('/games/:game')
	.get(function(req, res, next) {
		res.json(req.game);
	});

// USER (these will require logged in user)
router.route('/user')
	.get(function(req, res, next) {
		if (req.user != undefined) {
			req.user.populate('attempts', function(err, user) {
				if (err) { return new Error('Are you logged in?'); }
				res.json(user);
			});
		} else {
			res.json({'message':'Are you logged in?'});;
		}
	})
	.put(function(req, res, next) {
		if (req.user != undefined) {
			var user = req.user;
			var realname = req.body;
			User.update({ _id: user._id }, { $set: { realname: realname } }, function(err) {
				if (err) { return next(new Error('Sorry')); }
			});
			res.json(user);
		} else {
			res.json({'message':'Are you logged in?'});;
		}
	});

// ATTEMPT
router.route('/user/attempt')
	.post(function(req, res, next) {
		if (req.user != undefined) {
			var attempt = new Attempt(req.body);
			attempt.user = req.user;
			attempt.save(function(err) {
				if (err) { return next(err); }
				req.user.attempts.push(attempt);
				req.user.save(function(err, user) {
					if (err) { return next(err); }
					res.json(attempt);
				});
			});
		} else {
			res.json({'message':'Are you logged in?'});;
		}
	});
router.route('/user/:attempt')
	.delete(function(req, res, next) {
		if (req.user != undefined) {
			var attempt = req.attempt;
			var user = req.user;
			Attempt.findByIdAndRemove(attempt, function(err){
				if (err) { return next(err); }
				User.update( { _id: user._id }, { $pull: {attempts: attempt._id } }, function(err) {
					if (err) { return next(err); }
					res.json(user);
				});
			});
		} else {
			res.json({'message':'Are you logged in?'});;
		}
	});

/*


attempt:all
-post
-get

attempt:single
-delete*/



module.exports = router;