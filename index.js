const tmi = require('tmi.js');
let jsonData = require('./config.json');
let commandData = require('./commands.json');

const channel = jsonData.channels;
console.log(channel);

let commands = commandData;
let helloCommands = commands.helloCommands;
let socialCommands = commands.socialCommands;
let sendMessage = null;

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: jsonData.username,
        password: jsonData.password
    },
    channels: channel
});

client.connect();


client.on('message', (channel, tags, message, self) => {
    if(self) return;

    let convertedMessage = message.toLowerCase();
    console.log(message.toLowerCase())

    if(convertedMessage) {

        // Need to change this so this does not run all the time if a message is not even entered under 'helloCommand'
        helloCommands.forEach( (hComm) => {
            if(hComm.commandName === convertedMessage)
            {
                sendMessage = hComm.response + tags.username + '!';
                client.say(channel, sendMessage);
            }
        })

        socialCommands.forEach( (sComm) => {
            if(sComm.commandName === convertedMessage)
            {
                sendMessage = sComm.response;
                client.say(channel, sendMessage);
            }
        })
    }

});