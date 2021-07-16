/**
 * Author: Alexander Mark Thompson
 * License: MIT
 * Description: Index application page
 */

const tmi = require('tmi.js');
let jsonData = require('./config.json');
const { Utils } = require('./utils');

const channel = jsonData.channels;
console.log(channel);

let serviceHandler = new Utils();

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

    let newMessage = serviceHandler.handleCommands(tags, convertedMessage);
    client.say(channel, newMessage);

});