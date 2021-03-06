const Discord = require('discord.js');
const client = new Discord.Client();

const request = require('request');
const YTDL = require('ytdl-core');
const mongoose = require('mongoose');
require('dotenv').config();

const personality = require('./personality.js');
const commands = require('./commands.js');
const points = require('./points.js');
const extras = require('./extras.js');

// MONGODB models
const User = require('./models/users.js');
const Item = require('./models/items.js');

mongoose.connect('mongodb://localhost/kenward-bot');

const token = process.env.TOKEN;

// Globals
let serverList = []; 
let lottoNumber = 0; 

// emit 'ready' 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// new member listener
client.on('guildMemberAdd', member => {
  console.log(member);
  console.log(member.guild);
  let channel = member.guild.channels.find('name', 'general');
  if(!channel) return;
  channel.send(`Welcome to the server, ${member}`);
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

			case '!ask':  																							// !ask
				m.channel.send('What?');
				break;

			case '!roll': 																							// !roll
				commands.diceRoll(m, input[1]);
				break;

			case '!reddit': 																						// !reddit
				commands.postPic(m);
				break;

			case '!cleanup': 																						// !cleanup
			  commands.cleanup(m);
			  break;

			case '!help': 																							// !help
				commands.sendHelp(m);
				break;

			case '!add': 																								// !add
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

			case '!me': 																								// !me
				passUser(m, printUser);
				break;

			case '!gift': 																							// !gift
				// giftPoints(m);
				passUser(m, updatePoints);
				break;

			case '!addItem':  																					// !addItem
				addItem(m);
				break;

			case '!giftItem': 																					// !giftItem
				passUser(m, giftItem);
				break;

			case '!gamble': 																						// !gamble
				passUser(m, points.gamble); 
				break;

			case '!buy': 																								// !buy
				points.buyMenu(m);
				break;

			case '!find':
				m.channel.send('Found you! <@' + m.author.id + '>');
				break;

			case '!start':
				serverList.push(m.channel);
				console.log(serverList);
				dailyReset(m.channel);
				break;

			case '!guess': 
				if(parseInt(input[1],10) == lottoNumber){
					m.reply(' congratulations! You won the lottery. The winning number was: ' + lottoNumber);
					lottoNumber = (Math.floor(Math.random() * (101-1)) +1);
					console.log(lottoNumber);
					m.channel.send('Generating new lottery number...');
				}else{
					m.channel.send('Sorry, try again!');
				}
				
			default:
				break;
  	}
  }
});

// Daily Reset
function dailyReset(ch){
	ch.send('Daily reset! Try to guess the lottery number.');
	lottoNumber = (Math.floor(Math.random() * (101 - 1)) + 1);
	console.log(extras.getTime(), lottoNumber);
	// console.log('10s has passed!');
	setTimeout(dailyReset, 10800000, ch);		
}

// MONGODB FUNCTIONS

function passUser(m, action){
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

function addUser(m){
	let user = {name: m.author.username, discordId: m.author.id, points: 5000, items: []};
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

function addItem(m){
	let args = m.content.split(' | ');
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

function passItems(m, u, action){
	items.forEach(function(itemId){
		Item.findOne({_id:itemId}, function(err, item){
			if(err){
				console.log(err);
			} else{
				action(m, u, item);
			}
		});
	})
}

function printUser(m, u){
	userToString(m, u, u.items);
}

function userToString(m, u, items){
	let resp = '\n---------' + '\npoints: ' + u.points + '\nitems: '; 
	let counter = 0; 
	if(items.length === 0){
		m.reply(resp);
	}
	items.forEach(function(itemId){
		Item.findOne({_id:itemId}, function(err, item){
			if(err){
				console.log(err);
			} else{
				resp += item.name + ', ';
				counter++;
				if(counter === items.length){
					m.reply(resp);
				}
			}
		});
	});
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

// log bot in
client.login(token);

