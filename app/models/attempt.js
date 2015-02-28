var mongoose = require('mongoose');

var AttemptSchema = new mongoose.Schema({
	attempt: { time: { type: Date, default: Date.now }, minutes: Number, seconds: Number},
	success: Boolean,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
});

module.exports = mongoose.model('Attempt', AttemptSchema);