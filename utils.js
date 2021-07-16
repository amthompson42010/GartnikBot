/**
 * Author: Alexander Mark Thompson
 * License: MIT
 * Description: Utility function sto handle operations that might be used in more than one place.
 */

const fs = require('fs');

let commandData = require('./commands.json');

let commands = commandData;
let helloCommands = commands.helloCommands;
let socialCommands = commands.socialCommands;
let adminCommands = commands.adminCommands;
let sendMessage = null;
let addCategory = null;

class Utils {

    handleCommands(tags, message) {
        let convertedMessage = message.toLowerCase();
        console.log(message.toLowerCase())

        if(convertedMessage) {

            // Need to change this so this does not run all the time if a message is not even entered under 'helloCommand'
            helloCommands.forEach( (hComm) => {
                if(hComm.commandName === convertedMessage)
                {
                    sendMessage = hComm.response + tags.username + '!';
                }
            })

            socialCommands.forEach( (sComm) => {
                if(sComm.commandName === convertedMessage)
                {
                    sendMessage = sComm.response;
                }
            })

            adminCommands.forEach( (aComm) => {
                let messageArr = convertedMessage.split(' ');
                console.log(messageArr);
                if(aComm.commandName === messageArr[0])
                {
                    if(messageArr[0] === "!addcommand")
                    {
                        console.log(messageArr[0], messageArr[1], messageArr[2], messageArr[3]);
                        this.addCommand(messageArr[1], messageArr[2], messageArr[3]);
                    }
                }

                sendMessage = "test";
            })
        }

        return sendMessage;
    }

    addCommand(commandName, commandResponse, commandCategory) {
        
        switch(commandCategory) {
            case 'h':
                addCategory = helloCommands;
                break;
            case 's':
                addCategory = socialCommands;
                break;
            case 'a':
                addCategory = adminCommands;
                break;
        }

        addCategory.push({
            "commandName": commandName,
            "response": commandResponse
        })

        this.writeToJSONFile('./commands.json', JSON.stringify(commands));
    }

    writeToJSONFile(file, content) {
        fs.writeFile(file, content, err => {
            if(err) {
                console.error(err);
                return;
            }
        });
    }

}

exports.Utils = Utils