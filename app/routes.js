var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Type = require('./models/type');
var Game = require('./models/game');

router.use(function(req, res, next) {
	// can authenticate, etc here
	console.log('this is the middleware');
	console.log(req.body);
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
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

// All types
router.route('/types')
	.post(function(req, res, next) {
		var type = new Type(req.body);
		type.save(function(err) {
			if (err) { return next(err); }
			res.json([{ message: 'Saved' }]);
		});
	})
	.get(function(req, res, next) {
		Type.find(function(err, types) {
			if (err) { return next(err); }
			res.json(types);
		});
	});

router.route('/types/:type')
	.get(function(req, res, next) {
		req.type.populate('games', function(err, type) {
			if (err) { return next(err); }
			res.json(type);
		});
	})
	.put(function(req, res, next) {
		var type = req.type;
		var newType = req.body;

		Type.update({ _id: type._id }, { $set: { level: newType.level } }, function(err) {
			if (err) { return next(new Error('Sorry')); }
		});
		res.json(type);
	})
	.delete(function(req, res, next) {
		var type = req.type;
		Type.findByIdAndRemove(type, function(err)
			{ if (err) { return next(err); }
		});
		res.json({ message: 'Type removed' });
	});

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
	})
	.get(function(req, res, next) {
		Game.find(function(err, games) {
			if (err) { return next(err); }
			res.json(games);
		});
	});

router.route('/types/:type/games/:game')
	.get(function(req, res, next) {
		res.json(req.game);
	})
	.delete(function(req, res, next) {
		var game = req.game;
		var type = req.type;

		Game.findByIdAndRemove(game, function(err) {
			if (err) { return next(err); }

			Type.update( { _id: type._id }, { $pull: { games: game._id} }, function(err) {
				if (err) { return next(err); }
				res.json(type);
			});
		});
	});

module.exports = router;



