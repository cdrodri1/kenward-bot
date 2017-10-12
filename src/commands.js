// commands.js

const request = require('request');

const commands = {

	diceRoll : function (message, num){
		if(Number(num)){
			message.reply('Rolling... ' + (Math.floor(Math.random() * (Number(num) - 1)) + 1));
		} else{
			message.reply('Rolling... ' + (Math.floor(Math.random() * (6 - 1)) + 1));
		}
	},

	postChrissy : function (message){
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
		console.log(m);
		request('https://www.reddit.com/r/'+sub+'/.json?limit=50', function(err, resp, body){
			if(err){
				console.log(err);
				message.channel.send("There was an error...");
			} else{
				let post = JSON.parse(body);
				if(post.data.children.length != 0){
					for(let i = 0; i<50; i++){
						console.log(i);
						if(domains.indexOf(post.data.children[i].data.domain) > -1){
							posts.push(post.data.children[i]);
						}
					}
					let n = Math.floor(Math.random()*(posts.length)); 
					console.log(posts.length, n);
					if(posts.length > 0){
					message.channel.send('`' + posts[n].data.title + '`' 
																+ '\n' + posts[n].data.url);
					} else{
						message.channel.send('No images in /r/'+sub+' :(');
					}
				} else{
					message.channel.send("I don't think that /r/" +sub+ " is a subreddit...");
				}
			}	
		});
	}

}

module.exports = commands;