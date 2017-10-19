function gamble(m, u){
	let args = m.content.split(' ');
	let num = parseInt(args[1], 10); 
	let newpts = 0; 
	let resp = ''; 

	if(!num){
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
		resp += ' WOW you rolled: ' + rand + '\nYou win 3x your bet';
		newpts = u.points + 2*num; 
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

module.exports.gamble = gamble; 