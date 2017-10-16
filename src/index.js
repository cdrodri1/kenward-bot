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
				User.findOne({discordId: m.author.id}, 'discordId', function(err,user){
					if(err){
						console.log(err);
					} else{
						if(user){		// if user already exists, don't add to db 
							m.reply(' you are already in the database!');
						} else{			// add to DB 
							addUser(m);
						}
					}
				});
				break;

			case '!me':
				updateUser(m, printUser);
				break;

			case '!gift':
				// giftPoints(m);
				updateUser(m, updatePoints);
				break;

			case '!addItem': 
				addItem(m);
				break;

			case '!giftItem':
				updateUser(m, giftItem);
				break;

			default:
				break;
  	}
  }
});

// MONGODB FUNCTIONS
function addUser(m){
	let user = {name: m.author.username, discordId: m.author.id, points: 0, items: []};
	User.create(user, function(err, newUser){
		if(err){
			console.log(err);
		} else{
			console.log('Added new user:');
			console.log(newUser);	
			m.reply("You've been added to the db!");
		}
	});
}

function printUser(m, u){
	printItems(m, u, u.items);
}

function printUserFinal(m, u, s){
	m.reply('\n---------------' + '\npoints: ' + u.points + '\nitems: ' + s);
}

function updatePoints(m, u){
	let pts = u.points + 100;
	u.set({points:pts});
	u.save((err,updatedUser) => {
		if(err){
			console.log(err);
		} else{
			m.reply(' you now have ' + updatedUser.points + ' points!');
		}
	});
}

function updateUser(m, action){
	User.findOne({discordId:m.author.id}, function(err, user){
		if(err){
			console.log(err);
		} else{
			if(user){			// user exists
				action(m, user);
			}else{				// user doesn't exist
				m.reply(" you don't exist in the database yet!");
			} 						
		}
	});
}

function addItem(m){
	let args = m.content.split('|');
	console.log(args); 
	let name = args[1]; 
	let description = args[2]; 
	let value = args[3]; 
	Item.create({name: name, description: description, value: value}, function(err,newItem){
		if(err){
			console.log(err);
		} else{
			console.log('New item added!');
			console.log(newItem);
		}
	});
}

function giftItem(m, user){
	// get item
	Item.findOne({name:"chad's hammer"}, function(err, item){
		if(err){
			console.log(err);
		} else{		// push item into user
			console.log('added item');
			console.log(item);

			user.items.push(item);
			user.save(function(err, updatedUser){
				if(err){
					console.log(err);
				} else{
					console.log(updatedUser);
				}
			})

		}
	});
}

function printItems(m, u, items){
	let s = '';
	var counter = 0;
	items.forEach(function(itemId){
		Item.findOne({_id:itemId}, function(err, item){
			if(err){
				console.log(err);
			} else{
				s += item.name + ' ';
				console.log(s);
				console.log(item.name);
				counter++;
				if(counter == items.length){
					printUserFinal(m, u, s); 
				}
			}
		});
	});
}

// log bot in
client.login(token);

