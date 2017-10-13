// commands.js

const request = require('request');

const cmdList = `
**# # ===== kenward-bot ===== # #**

**Commands**
	!help						- displays list of commands
	!roll [num]			- rolls a dice from 0-num (6 default)
	!chrissy				- posts a picture of Chrissy Teigen
	!reddit [sub]		- posts a picture from sub
	!cleanup				- delete posts by me in the last 10 posts
`;

const commands = {

	sendHelp : function(message){
		message.channel.send({embed:{
			color: 3447003,
			description: cmdList
		}});
	},

	diceRoll : function (message, num){
		let m = message.content.split(' ');
		console.log(message.author.tag, m);
		if(Number(num)){
			message.reply('Rolling... ' + (Math.floor(Math.random() * (Number(num) - 1)) + 1));
		} else{
			message.reply('Rolling... ' + (Math.floor(Math.random() * (6 - 1)) + 1));
		}
	},

	postChrissy : function (message){
		let m = message.content.split(' ');
		console.log(message.author.tag, m);
		let posts = []; 
		request('https://www.reddit.com/r/ChrissyTeigen/.json', function(err, resp, body){
			let post = JSON.parse(body);
			for(let i = 0; i<20; i++){
				posts.push(post.data.children[i].data.preview.images[0].source.url);
			}
			message.channel.send(posts[Math.floor(Math.random()*(20))]);
		});
	},

	postPic : function (message){
		let m = message.content.split(' ');
		let sub = m[1]; 
		let domains = ['i.redd.it', 'i.imgur.com', 'gfycat.com', 'v.redd.it'];
		let posts = []; 
		console.log(message.author.tag, m);
		request('https://www.reddit.com/r/'+sub+'/.json?limit=50', function(err, resp, body){
			if(err){
				console.log(err);
				message.channel.send("There was an error...");
			} else{
				let post = JSON.parse(body);
				let len = 0;
				if(post.data){
					len = post.data.children.length; 
				}
				if(len){
					for(let i = 0; i<len; i++){
						if(domains.indexOf(post.data.children[i].data.domain) > -1){
							posts.push(post.data.children[i]);
						}
					}
					let n = Math.floor(Math.random()*(posts.length)); 
					console.log('-- Found:', posts.length, ' index:', n);
					if(posts.length > 0){
					message.channel.send('`' + posts[n].data.title + '`' 
																+ '\n' + posts[n].data.url);
					} else{
						message.channel.send('No images in /r/'+sub+' :(');
					}
				} else{
					message.channel.send("Sorry, /r/" + sub + " doesn't exist or has been deleted..");
				}
			}	
		});
	},

	cleanup : function(message){
		let m = message.content.split(' ');
		console.log(message.author.tag, m);
		let count = 0; 
		let ms = message.channel.fetchMessages({limit:10}).then(messages => {return messages});
		ms
		.then(
			messages => {
				messages.forEach(message => {
					if(message.author.username === 'kenward-bot'){
						message.delete(100);
						count++;
					}
				});
				console.log('-- ' + count + ' messages deleted');
			}
		);
		// console.log(message.channel.messages.);
		// console.log('hi');
	}

}

module.exports = commands;