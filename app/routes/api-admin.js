var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Type = require('../models/type');
var Game = require('../models/game');
var User = require('../models/user');
var Attempt = require('../models/attempt');

router.use(function(req, res, next) {
	user = req.user;
	console.log(user.admin + user.local);
	if (user.admin == true){
		console.log('being called?');
		return next();
	} else {
	res.json('sorry you dont have access');
	}
});

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

router.get('/', function(req, res) {
	res.json({ message: 'admin api' });
});

// TYPES
router.route('/types')
	.post(function(req, res, next) {
		var type = new Type(req.body);
		type.save(function(err) {
			if (err) { return next(err); }
			res.json(type);
		});
	});

router.route('/types/:type')
	.delete(function(req, res, next) {
		var type = req.type;
		Type.findByIdAndRemove(type, function(err)
			{ if (err) { return next(err); }
		});
		res.json({ message: 'Type removed' });
	});

// GAMES
router.route('/types/:type/games')
	.post(function(req, res, next) {
		var game = new Game(req.body);
		game.gametype = req.type;
		game.save(function(err) {
			if (err) { return next(err); }
			req.type.games.push(game);
			req.type.save(function (err, game) {
				if (err) { return next(err); }
				res.json(game);
			});
		});
	});

router.route('/games')
	.get(function(req, res, next) {
		Game.find(function(err, games) {
			if (err) { return next(err); }
			res.json(games);
		});
	});
router.route('/games/:game')
	.delete(function(req, res, next) {
		var game = req.game;
		var gametype = req.game.gametype;

		Game.findByIdAndRemove(game, function(err) {
			if (err) { return next(err); }
			console.log(game._id)

			Type.findOneAndUpdate( { _id: gametype }, { $pull: { games: game._id} }, function(err) {
				if (err) { res.json({message: 'this fails'}); }
				console.log('works');
				res.json(gametype);
			});
		});
	});

module.exports = router;