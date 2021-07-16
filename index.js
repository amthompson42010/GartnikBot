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
let isMod = false;

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: jsonData.username,
        password: jsonData.password
    },
    channels: channel
});

client.connect();

client.on("chat", function (channel, user, message, self) {
    // Username is a mod or username is the broadcaster..
    if (user["user-type"] === "mod" || user.username === channel.replace("#", "")) {
        // User is a mod.
        isMod =  true;
    }

    return isMod;
});

client.on('message', (channel, tags, message, self) => {
    if(self) return;

    let convertedMessage = message.toLowerCase();
    // console.log(message.toLowerCase())

    let newMessage = serviceHandler.handleCommands(isMod, channel, tags, convertedMessage);
    if(newMessage !== null)
    {
        client.say(channel, newMessage);
    }

});