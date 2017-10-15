const Discord = require('discord.js');
const client = new Discord.Client();

const request = require('request');
const YTDL = require('ytdl-core');
const mongoose = require('mongoose');

const personality = require('./personality.js');
const commands = require('./commands.js');

// MONGODB models
const User = require('./models/users.js');
const Item = require('./models/items.js');

mongoose.connect('mongodb://localhost/kenward-bot');


const token = 'MzY1MjE4Mzg5MTcxMzcyMDQ1.DLbHsA.7aTq6ntvepp4r1LQlEsrZXUQIrY';

// emit 'ready' 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// new member listener
client.on('guildMemberAdd', member => {
  console.log(member);
  console.log(member.guild);
  let channel = member.guild.channels.find('name', 'member-log');
  if(!channel) return;
  channel.send('Welcome to the server, ${member}');
});

// cmd listener
client.on('message', m =>{
	// personality responses
	if(personality.responses[m.content]){
		m.channel.send(personality.responses[m.content.toLowerCase()]);
	}

	// cmd responses
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

			case '!add':
				let userKenny = {name: 'Kenward', points: 9000, items: []};
				User.create(userKenny, function(err, newUser){
					if(err){
						console.log(err);
					} else{
						console.log('Added new user:');
						console.log(newUser);
					}
				});
				break;

			default:
				break;
  	}
  }
});

// log bot in
client.login(token);

