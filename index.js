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

    console.log(message.toLowerCase())
    switch(message.toLowerCase()) {
        case 'hello':
            client.say(channel, `Welcome to the stream @${tags.username}!`);
            break;
        case '!twitter':
            client.say(channel, `https://twitter.com/GartnikF`);
            break;
        case '!youtube':
            client.say(channel, `https://www.youtube.com/channel/UCCAkMS2U32q9DrYthAR5rjw`);
            break;
        case '!discord':
            client.say(channel, `https://discord.com/invite/mjdBMN`);
            break;
        case '!insta':
            client.say(channel, `https://www.instagram.com/gartnikflamestwitch/?hl=en`);
            break;
        case '!github':
            client.say(channel, `https://github.com/amthompson42010`);
            break;
        default:      
    }

});