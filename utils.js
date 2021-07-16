/**
 * Author: Alexander Mark Thompson
 * License: MIT
 * Description: Utility function sto handle operations that might be used in more than one place.
 */

const fs = require('fs');
const { client } = require('tmi.js');

let commandData = require('./commands.json');

let commands = commandData;
let helloCommands = commands.helloCommands;
let socialCommands = commands.socialCommands;
let adminCommands = commands.adminCommands;
let sendMessage = null;
let addCategory = null;

class Utils {

    handleCommands(isMod, channel, tags, message) {
        sendMessage = null;
        let convertedMessage = message.toLowerCase();
        // console.log(message.toLowerCase())
        let messageArr = convertedMessage.split(' ');

        let treat = this.commandExists(isMod);

        if(convertedMessage && treat) {

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
                
                console.log(messageArr);
                console.log(isMod);
                if(messageArr[0] === "!addcommand" && isMod)
                {

                    const commandExists = this.commandExists(messageArr[1]);
                    // console.log(messageArr[0], messageArr[1], messageArr[2], messageArr[3]);
                    if(commandExists)
                    {
                        sendMessage = "Command already exists. Please enter a command that does not."
                    }
                    else {
                        this.addTextCommand(messageArr[1], messageArr[2], messageArr[3]);
                        sendMessage = "test";
                    }
                } else if(messageArr[0] === "!commands")
                {
                    let data = this.getAllCommands(isMod);
                    console.log("data: ", data);
                    sendMessage = data.join(' ');
                }
            })
        }

        return sendMessage;
    }

    commandExists(command_name) {
        console.log("command_name: ", command_name);
        let isH = command_name => command_name === helloCommands.commandName;
        let isS = command_name => command_name === socialCommands.commandName;
        let isA = command_name => command_name === adminCommands.commandName;
        return isH || isS || isA
    }

    addTextCommand(commandName, commandResponse, commandCategory) {
        console.log(commandName, commandResponse, commandCategory);
        
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

    addOtherCommand() {

    }

    getAllCommands(isMod) {
        let listOfCommands = [];
        if(isMod) {
            //whisper all commands
            helloCommands.forEach((hComm) => {
                listOfCommands.push(hComm.commandName);
            });
            socialCommands.forEach((sComm) => {
                listOfCommands.push(sComm.commandName);
            })
        } else {
            helloCommands.forEach((hComm) => {
                listOfCommands.push(hComm.commandName);
            });
            socialCommands.forEach((sComm) => {
                listOfCommands.push(sComm.commandName);
            })
        }

        return listOfCommands;
    }

    writeToJSONFile(file, content) {
        console.log("hit")
        fs.writeFile(file, content, err => {
            if(err) {
                console.error(err);
                return;
            }
        });
    }

}

exports.Utils = Utils