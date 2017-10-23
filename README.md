<<<<<<< HEAD
# KENWARD-BOT
## Author(s): K.Huynh, J.Wang, D.Miranda

## INTRO: 
Kenward bot is written in Node.js using the Discord API wrapper discord.js and the data is persisted through a MongoDB database. 

## Setting up the Environment
To get your environment setup, you will need a few things: 
..* [Node.js (6.11.4) & npm (3.10.10)](https://nodejs.org/en/download/ "Node.js Download")
..* [MongoDB (Community Edition)](https://www.mongodb.com/download-center?jmp=nav#atlas) (Optional, but recommended to test DB)
..* A text editor of your choice! (I use [Sublime Text](https://www.sublimetext.com/3))
..* Familiarity with cmd prompt (windows) or Terminal (OSX & linux)
..* Familiarity with Git

### Installing Git
_to be updated_

### Installing Node.js
You can start by downloading and installing node.js and npm from [here](https://nodejs.org/en/download/) for your operating system. Node.js is an extermely powerful javascript runtime that allows you to run serverside code! Npm stands for 'Node Package Manager' and makes it extremely easy to manage dependencies in our project. If you're not familiar with command prompt on windows / terminal on osx & linux, don't worry, you will pick it up extremely fast. 

**Windows**: Open a command prompt by pressing the Windows key and typing in 'cmd' and hitting enter. This will open up a command prompt. You can verify that you successfully installed Node.js and check the version by entering the following into the cmd prompt:
```node -v``` 
Similarly, you can verify that npm was successfully installed by entering the following cmd into the terminal:
```npm -v```
It is _okay_ if the versions are slightly different. 

**Mac OS**: Open a terminal by pressing cmd + space and typing in 'terminal' and hitting enter. This opens a terminal window. You can verify that you've successfully installed Node.js by etnering the following command into the terminal:
```node -v```
Similarly, you can verify that npm was successfully installed by entering:
```npm -v```  It is _okay_ if the versions are slightly different. 

Congratulations, you've installed node.js and npm!

### Installing MongoDB
Now this part is _optional__. If you choose to not install the mongoDB, there will be lines that you must comment out in the code if you wish to run it and test. If you wish to install MongoDB and host a database off of your machine, please continue reading.

Download and install MongoDB from [here](https://www.mongodb.com/download-center?jmp=nav#community). Once finished installing, you will need to open up a cmd prompt (Windows) or Terminal(Mac/Linux). 

To use MongoDB, you will need to create a 'data directory'. The easiest way to do so will be to run the following commands in your cmd prompt/terminal (don't be overwhelmed if you do not know what these commands do, they just create folders):
**MAC OS**
```cd ~
mkdir data
mkdir data/db
```
**Windows**
```cd ~
md data
md data\db
```

Once the data directories have been created, you can start your database by typing the mongod command into your cmd prompt/terminal:
```mongod```

Congratulations, you are successfully hosting a database on your machine!