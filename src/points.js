const Item = require('./models/items.js');
const User = require('./models/users.js');

function gamble(m, u){
	let args = m.content.split(' ');
	let num = parseInt(args[1], 10); 
	let newpts = 0; 
	let resp = ''; 

	if(!num | num < 0){
		m.reply(' please try again and enter a point value to gamble.');
		return;
	} 
	if(u.points < num){
		m.reply(' you do not have that many points. Please enter a smaller amount.');
		return;
	}
	let rand = (Math.floor(Math.random() * (101 - 1)) + 1);	// random number 1-100 inclusive
	if(rand > 60){
		resp += ' you rolled: ' + rand + '\nYou win!';
		newpts = u.points + num; 
	} else if(rand === 100){
		resp += ' WOW you rolled: ' + rand + '\nYou win 5x your bet';
		newpts = u.points + 5*num; 
	} else{
		resp += ' you rolled: ' + rand + '\nToo low!';
		newpts = u.points - num; 
	}

	u.set({points:newpts});
	u.save((err, updatedUser) => {
		if(err){
			console.log(err);
		} else{
			m.reply(resp + ' You now have **' + updatedUser.points + '** points!');
		}
	});
}

function buyMenu(m){
	let itemList = '===============\n'; 
	Item.find({}, function(err, items){
		if(err){
			console.log(err);
		} else{	
			items.forEach(function(item){
				itemList += '**' + item.name + '** - (' + item.value + 'pts)\n\t' + item.description + '\n';
			});
			m.channel.send({embed:{
				color: 3447003,
				description: itemList
			}});
		}
	}); 

	// items.forEach(function(itemId){

	// });
}

module.exports.gamble = gamble; 
module.exports.buyMenu = buyMenu;