const tmi = require('tmi.js');
let jsonData = require('./config.json');

const channels = ['gartnikflames'];

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: jsonData.username,
        password: jsonData.password
    },
    channels: channels
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if(self) return;

    if(message.toLowerCase() === 'hello') {
        client.say(channel, `@${tags.username}, welcome to the stream!`);
    }
});