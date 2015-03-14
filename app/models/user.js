var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	realname : {
		first: String,
		last: String
	},
	local : {
		email: String,
		password: String
	},
	attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }]
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);