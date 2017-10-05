const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const client = new Discord.Client();


const token = 'MzY1MjE4Mzg5MTcxMzcyMDQ1.DLbHsA.7aTq6ntvepp4r1LQlEsrZXUQIrY';

// regex
const cmdRegex = /(!hello|!ask|!play|!speak) (.*)$/;

var servers = {};
const people = ['elias', 'neil', 'chad', 'daniel', 'kenward'];
var counter = 0; 

// emit 'ready' 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// create event listener for each person
people.forEach(function(person){
  client.on('message', message =>{
  	if(message.content === person){
  		console.log(person + ' spoke!');
  		message.channel.send(person + ' is a faggot'); 
  	}
  });
})

client.on('message', m =>{
	console.log(counter);
  if(m.content === 'hello'){
  	counter++;
  	console.log('hello was said ' +counter+ ' times.');
  }
  if(counter===10){
  	m.channel.send('you said hello ' +counter+ ' times.');
  	counter = 0; 
  }
});

client.on('message', message => {
	if(message.author.username === 'kenward' && message.content === 'hello kenward bot'){
		message.channel.send('hello master kenward', {tts:true});
	}
});

// cmd listener
client.on('message', message =>{
	const input = message.content.split(' '); 
	console.log(input);
  if(input){	
  	switch(input[0]){

  		case '!hello': 
  			if(input[1]) message.channel.send('Hey there, ' + input[1]);
  			else message.reply(' how\'re ya doing?');
  			break;

			case '!ask':
				message.channel.send('What?');
				break;

			case '!play':
				message.channel.send('woof woof!');
				if(!input[1]){
					message.channel.send('Please send a link');
					return;
				}
				if(!message.member.voiceChannel){
					message.channel.send('Please join a voice channel');
				}
				if(!servers[message.guild.id]) servers[message.guild.id] = {
					queue : []
				};
				var server = servers[message.guild.id];
				server.queue.push(input[1]);
				console.log('queue: ' + server.queue);
				if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
					play(connection, message);
				});
				break;

			case '!skip':
				var server = servers[message.guild.id];
				if(server.dispatcher) server.dispatcher.end();
				break;

			case 'stop': 
				var server = servers[message.guild.id];
				if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
				break; 

			default:
				break;
  	}
  }
});


function play(connection, message){
	var server = servers[message.guild.id];
	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter:'audioonly'}));
	server.dispatcher.setVolume(0.5);
	server.queue.shift();
	server.dispatcher.on('end', function(){
		if(server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}



// log bot in
client.login(token);

