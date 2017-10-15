const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	points: Number,
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item'
		}
	]
});

const User = mongoose.model('User', userSchema);
module.exports = User;