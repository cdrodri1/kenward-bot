const Discord = require('discord.js');
const client = new Discord.Client();

const request = require('request');
const YTDL = require('ytdl-core');
const personality = require('./personality.js');



const token = 'MzY1MjE4Mzg5MTcxMzcyMDQ1.DLbHsA.7aTq6ntvepp4r1LQlEsrZXUQIrY';

var servers = {};
const people = ['elias', 'neil', 'chad', 'daniel', 'kenward'];
var counter = 0; 

// emit 'ready' 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', m => {
	if(m.author.username === 'kenward'){
		// m.channel.send('hello master kenward', {tts:true});
		if(personality.responses[m.content]){
			m.channel.send(personality.responses[m.content.toLowerCase()]);
		}
	}
});

// cmd listener
client.on('message', m =>{
	const input = m.content.split(' '); 
  if(input){	
  	switch(input[0]){

  		case '!hello': 
  			if(input[1]) m.channel.send('Hey there, ' + input[1]);
  			else m.reply(' how\'re ya doing?');
  			break;

			case '!ask':
				m.channel.send('What?');
				break;

			case '!roll':
				diceRoll(m, input[1]);
				break;

			case '!chrissy':
				postChrissy(m);
				break;

			case '!reddit':
				postPic(m);
				break;

			case '!play':
				m.channel.send('woof woof!');
				if(!input[1]){
					m.channel.send('Please send a link');
					return;
				}
				if(!m.member.voiceChannel){
					m.channel.send('Please join a voice channel');
				}
				if(!servers[m.guild.id]) servers[m.guild.id] = {
					queue : []
				};
				var server = servers[m.guild.id];
				server.queue.push(input[1]);
				console.log('queue: ' + server.queue);
				if(!m.guild.voiceConnection) m.member.voiceChannel.join().then(function(connection){
					play(connection, m);
				});
				break;

			case '!skip':
				var server = servers[m.guild.id];
				if(server.dispatcher) server.dispatcher.end();
				break;

			case 'stop': 
				var server = servers[m.guild.id];
				if(m.guild.voiceConnection) m.guild.voiceConnection.disconnect();
				break; 

			default:
				break;
  	}
  }
});


function play(connection, m){
	var server = servers[m.guild.id];
	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter:'audioonly'}));
	server.dispatcher.setVolume(0.5);
	server.queue.shift();
	server.dispatcher.on('end', function(){
		if(server.queue[0]) play(connection, m);
		else connection.disconnect();
	});
}

function diceRoll(message, num){
	if(Number(num)){
		message.reply('Rolling... ' + (Math.floor(Math.random() * (Number(num) - 1)) + 1));
	} else{
		message.reply('Rolling... ' + (Math.floor(Math.random() * (6 - 1)) + 1));
	}
}

function postChrissy(message){
	let posts = []; 
	request('https://www.reddit.com/r/ChrissyTeigen/.json', function(err, resp, body){
		let post = JSON.parse(body);
		for(let i = 0; i<20; i++){
			posts.push(post.data.children[i].data.preview.images[0].source.url);
		}
		message.channel.send(posts[Math.floor(Math.random()*(20))]);
	});
}

function postPic(message){
	let m = message.content.split(' ');
	let sub = m[1]; 
	let domains = ['i.redd.it', 'i.imgur.com', 'gfycat.com', 'v.redd.it'];
	let posts = []; 
	console.log(m);
	request('https://www.reddit.com/r/'+sub+'/.json?limit=50', function(err, resp, body){
		if(err){
			console.log(err);
			message.channel.send("That's not a subreddit!");
		} else{
			let post = JSON.parse(body);
			for(let i = 0; i<50; i++){
				console.log(i);
				if(domains.indexOf(post.data.children[i].data.domain) > -1){
					posts.push(post.data.children[i]);
				}
			}
			let n = Math.floor(Math.random()*(posts.length)); 
			console.log(posts.length, n);
			if(posts.length > 0){
			message.channel.send('`' + posts[n].data.title + '`');
			message.channel.send(posts[n].data.url);
			} else{
				message.channel.send('No images in /r/'+m[1]+' :(');
			}
		}	
	});
}


// log bot in
client.login(token);
