var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Type = require('./models/type');
var Game = require('./models/game');
var User = require('./models/user');
var Attempt = require('./models/attempt');

router.use(function(req, res, next) {
	// can authenticate, etc here
	console.log('this is the middleware');
	console.log(req.user);
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


// All types (on site)
router.route('/types')
	.post(function(req, res, next) {
		var type = new Type(req.body);
		type.save(function(err) {
			if (err) { return next(err); }
			res.json(type);
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
	// (next 2 admin only, PUT may be unecessary)
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

// for site
router.route('/types/:type/games')
	.get(function(req, res, next) {
		Game.find(function(err, games) {
			if (err) { return next(err); }
			res.json(games);
		});
	})
	//admin only
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
	
// admin
router.route('/games')
	.get(function(req, res, next) {
		Game.find(function(err, games) {
			if (err) { return next(err); }
			res.json(games);
		});
	});

// for site
router.route('/games/:game')
	.get(function(req, res, next) {
		res.json(req.game);
	})
	// admin only
	.delete(function(req, res, next) {
		var game = req.game;
		console.log(game._id);
		var gametype = req.game.gametype;
		console.log(gametype);

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

//admin only
router.route('/users')
	.post(function(req, res, next) {
		var user = new User(req.body);
		user.save(function(err) {
			if (err) { return next(err); }
			res.json(user);
		});
	})
	.get(function(req, res, next) {
		User.find(function(err, users) {
			if (err) { return next(err); }
			res.json(users);
		});
	});

// for site
router.route('/user')
	.get(function(req, res, next) {
		req.user.populate('attempts', function(err, user) {
			if (err) { return next(err); }
			res.json(user);
		});
	})
	.put(function(req, res, next) {
		//do stuff here
		var user = req.user;
		var realname = req.body;
		console.log('name = ' + realname.first + ' ' + realname.last);
		
		User.update({ _id: user._id }, { $set: { realname: realname } }, function(err) {
			if (err) { return next(new Error('Sorry')); }
		});
		res.json(user);
	})

// for site
router.route('/user/attempt')
	.post(function(req, res, next) {
		var attempt = new Attempt(req.body);
		attempt.user = req.user;
		attempt.save(function(err) {
			if (err) { return next(err); }
			req.user.attempts.push(attempt);
			console.log('right after push' + attempt);
			req.user.save(function(err, user) {
				if (err) { return next(err); }
				console.log('right after save' + attempt);
				res.json(attempt);
			});
		});
	});

// test if below works
router.route('/user/:attempt')
	.delete(function(req, res, next) {
		var attempt = req.attempt;
		var user = req.user;

		Attempt.findByIdAndRemove(attempt, function(err){
			if (err) { return next(err); }

			User.update( { _id: user._id }, { $pull: {attempts: attempt._id } }, function(err) {
				if (err) { return next(err); }
				res.json(user);
			});
		});
	});

// users for admin
router.route('/users/:user')
	.get(function(req, res, next) {
		req.user.populate('attempts', function(err, user) {
			if (err) { return next(err); }
			res.json(user);
		});
	});

router.route('/users/:user/attempts')
	.post(function(req, res, next) {
		var attempt = new Attempt(req.body);
		attempt.user = req.user;
		attempt.save(function(err) {
			if (err) { return next(err); }
			req.user.attempts.push(attempt);
			req.user.save(function(err, attempt) {
				if (err) { return next(err); }
				res.json(attempt);
			});
		});
	});

router.route('/users/:user/attempts/:attempt')
	.delete(function(req, res, next) {
		var attempt = req.attempt;
		var user = req.user;

		Attempt.findByIdAndRemove(attempt, function(err){
			if (err) { return next(err); }

			User.update( { _id: user._id }, { $pull: {attempts: attempt._id } }, function(err) {
				if (err) { return next(err); }
				res.json(user);
			});
		});
	});

module.exports = router;

//user test 54f21717837d8d84303a4394
//game test 54f21a3552bcb904356fae2c
