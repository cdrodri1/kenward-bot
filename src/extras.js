const request = require('request');
const commands = require('./commands.js');

const extras = {
	getTime : function(){
		return '[' + new Date().toLocaleString() + ']'; 
	}
}

module.exports = extras; 
