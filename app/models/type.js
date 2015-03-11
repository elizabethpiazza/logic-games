var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
	typename: String,
	level: Number,
	games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Type', TypeSchema);