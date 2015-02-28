var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: String,
	date: Date,
	attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }]
});

module.exports = mongoose.model('User', UserSchema);