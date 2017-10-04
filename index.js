const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'MzY1MjE4Mzg5MTcxMzcyMDQ1.DLbHsA.7aTq6ntvepp4r1LQlEsrZXUQIrY';

// emit 'ready' 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// create event listener for messages 
client.on('message', message => {
	if(message.content === 'elias'){
		message.channel.send('elias is a faggot');
	}
});

client.on('message', message => {
	if(message.content === 'daniel'){
		message.channel.send('daniel is a faggot');
	}
});

client.on('message', message => {
	if(message.content === 'neil'){
		message.channel.send('neil is amazing');
	}
});

client.on('message', message => {
	if(message.content === 'neil'){
		message.channel.send('neil is beautiful');
	}
});

client.on('message', message => {
	if(message.content === 'chad'){
		message.channel.send('chad is a weeb faggot');
	}
});





// log bot in
client.login(token);

