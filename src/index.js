const Discord = require('discord.js');
const client = new Discord.Client();

const request = require('request');
const YTDL = require('ytdl-core');
const personality = require('./personality.js');
const commands = require('./commands.js');


const token = 'MzY1MjE4Mzg5MTcxMzcyMDQ1.DLbHsA.7aTq6ntvepp4r1LQlEsrZXUQIrY';

var servers = {};
const people = ['elias', 'neil', 'chad', 'daniel', 'kenward'];
var counter = 0; 

// emit 'ready' 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', m => {
	if(personality.responses[m.content]){
		m.channel.send(personality.responses[m.content.toLowerCase()]);
	}
});

client.on('guildMemberAdd', member => {
  console.log(member);
  console.log(member.guild);
  let channel = member.guild.channels.find('name', 'member-log');
  if(!channel) return;
  channel.send('Welcome to the server, ${member}');
});

client.on('message', message => {
   if (message.content == ("!clean")) {
   		console.log('delete');
      message.delete(1000); //Supposed to delete message
      message.channel.send(message.content.slice(5, message.content.length));
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
				commands.diceRoll(m, input[1]);
				break;

			case '!chrissy':
				commands.postChrissy(m);
				break;

			case '!reddit':
				commands.postPic(m);
				break;

			case '!cleanup':
			  commands.cleanup(m);
			  break;

			case '!help':
				commands.sendHelp(m);
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

// log bot in
client.login(token);

