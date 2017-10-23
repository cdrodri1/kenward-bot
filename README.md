# KENWARD-BOT
## Author(s): K.Huynh, J.Wang, D.Miranda

## Introduction 
Kenward bot is written in Node.js using the Discord API wrapper discord.js and the data is persisted through a MongoDB database. 

## Setting up the Environment
To get your environment setup, you will need a few things: 
* [Node.js (6.11.4) & npm (3.10.10)](https://nodejs.org/en/download/ "Node.js Download")
* [MongoDB (Community Edition)](https://www.mongodb.com/download-center?jmp=nav#atlas) (Optional, but recommended to test DB)
* A text editor of your choice! (I use [Sublime Text](https://www.sublimetext.com/3))
* Familiarity with cmd prompt (windows) or Terminal (OSX & linux)
* Familiarity with Git

### Installing Git and Cloning the Repository
Git is our version control software. It makes it easy for us to collaborate together on code and gives us the option to rollback in case we make a mistake. 

You can download git from [here](https://git-scm.com/downloads). I primarily use and recommend the Git Bash application on Windows that should come included in that download, but there are other git tools out there as well. 

**Windows**

Once installed, go ahead and hit the windows key and type in 'git bash' to open a terminal-like interface. We are going to clone this repository, in other words, copy this repository to our local computer. To do so, type the following command into the git bash prompt: 

```git clone https://github.com/hkennyv/kenward-bot.git```

Once it is done, there should be a local copy on your computer! You can verify this by navigating to your C:\Users\YourUser\ and finding a folder called 'kenward-bot'.

**Mac OS**

Once installed, go ahead open up a terminal. In Mac OS, you can run git right from the terminal and do not need to use the git bash shell. To clone the repo, simply enter the following command into your terminal: 

```git clone https://github.com/hkennyv/kenward-bot.git```

Once it's done, there should be a local copy that you can navigate to in Finder at /Users/YourUser/

_to be updated more_

### Installing Node.js
You can start by downloading and installing node.js and npm from [here](https://nodejs.org/en/download/) for your operating system. Node.js is an extermely powerful javascript runtime that allows you to run serverside code! This means you will be able to run javascript right from the node shell as well without even having to open a browser. Npm stands for 'Node Package Manager' and makes it extremely easy to manage dependencies in our project. If you're not familiar with command prompt on windows / terminal on osx & linux, don't worry, you will pick it up extremely fast. 

**Windows**: Open a command prompt by pressing the Windows key and typing in 'cmd' and hitting enter. This will open up a command prompt. You can verify that you successfully installed Node.js and check the version by entering the following into the cmd prompt:

```node -v``` 

Similarly, you can verify that npm was successfully installed by entering the following cmd into the terminal:

```npm -v```

It is _okay_ if the versions are slightly different. 

**Mac OS**: Open a terminal by pressing cmd + space and typing in 'terminal' and hitting enter. This opens a terminal window. You can verify that you've successfully installed Node.js by etnering the following command into the terminal:

```node -v```

Similarly, you can verify that npm was successfully installed by entering:

```npm -v```  

It is _okay_ if the versions are slightly different. 

Congratulations, you've installed node.js and npm!

### Installing MongoDB
Now this part is _optional_. If you choose to not install the mongoDB, there will be lines that you must comment out in the code if you wish to run it and test. If you wish to install MongoDB and host a database off of your machine, please continue reading.

Download and install MongoDB from [here](https://www.mongodb.com/download-center?jmp=nav#community). Once finished installing, you will need to open up a cmd prompt (Windows) or Terminal(Mac/Linux). 

To use MongoDB, you will need to create a 'data directory'. The easiest way to do so will be to run the following commands in your cmd prompt/terminal (don't be overwhelmed if you do not know what these commands do, they just create folders):

**MAC OS**
```cd ~
mkdir data
mkdir data/db
```
**Windows**
```cd ~
mkdir data
mkdir data\db
```

Once the data directories have been created, you can start your database by typing the mongod command into your cmd prompt/terminal:

```mongod```

Congratulations, you are successfully hosting a database on your machine!

### Getting Started with Node
If you're new to javascript, you can try playing around in the node shell for a bit. To open up the node shell, simply type this into your cmd prompt/terminal:

```node```

Once done, you should see a little ```>``` to the left of your cursor. This indicates you are now running node. Try typing in this small snippet of code line by line and try to understand what it is doing. You will see the console output things back to you as you type in these commands. Keep those in mind and try to figure out what they mean. 

```console.log('hello world!');
var helloString = 'hello world'; 
console.log(helloString);

var myName = 'Kenward';
console.log(helloString + ' ' + myName);
console.log(myName + helloString + myName + helloString);

console.log('I can do math as well!');
console.log(5*20);
console.log(5+20/30*500);

console.log('I can do comparing math operations as well!');
console.log(5 === 4);
console.log(5 > 4);

var num1 = 100; 
var num2 = 200; 


console.log(num1 > num2);
console.log(num1 * num2);
.exit
```

Now that that's done, you may have a little bit more understanding how variables work in Node. Let's take a look at the code for Kenward bot. 

You will need to navigate to the folder where you cloned the repository. You will need to navigate to the directory where you cloned the repository using either Windows Explorer or Mac OS's Finder. This is no different than navigating to your My Documents folder. Once you are in the kenward-bot folder, you can open the 'src' folder and you will see a few files in there and a couple folders. Go ahead and open up the index.js file in the text editor of your choice. 

index.js is the main file that controls the entire bot. It is the file that you will be running through your cmd prompt/termimal using the ```node``` command. The other files contain features that the bot performs, but index.js is the file that handles them all. Take a look through this file. Don't worry about the syntax too much, but focus more on the logic. Try to pick out what certain parts of the code does and what variables are assigned and what they are for. Now might be a good time to open up the [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) documentation as well. You can see on the discord.js welcome page they have a snippet of code as well, a lot of what we will be doing will be referring to the discord.js docs and using their library to accomplish our goals. 

Feel free to take a look for as long as you like, once you are ready to move forward, we will continue below. 

### Using npm to Install dependencies
The next step now that you are a little familiar with node.js, would be to install all the dependencies you need for the bot to run. If you noticed at the top of the index.js file, there were several lines of code that looked something like: 

```const Discord = require('discord.js');
const request = require('request');
const YTDL = require('ytdl-core');
const mongoose = require('mongoose');```

These lines are importing features and code that other people wrote that are designed to make your life easier. Npm makes this very easy to do. You will have to navigate to the same directory where you cloned the repository, except now instead of using the Windows explorer, Mac Finder, you must do so using the cmd prompt / terminal. 

Once you are in the /kenward-bot folder, you can type the following command into the cmd prompt/terminal:

```npm install```

It's that easy! Let npm do it's thing and you will see the dependency tree and what it is installing. Congratulations, you're ready to run the bot!

### Running kenward-bot 
Now you are semi-familiar with the tools to develop the bot, you are ready to run the bot. To run the bot, you will need to type the following cmd into the cmd prompt/terminal: 

**Windows**

```node src\index.js```

**MAC OS**

```node src/index.js```

Congratulations! You now have a running kenward-bot on your computer. 


