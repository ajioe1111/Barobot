/* eslint-disable no-unused-vars */
import * as cmd from './service/commandHandler.js';
import * as Discord from 'discord.js';
//import * as fs from 'fs';
import config from './config.js'
import { leaveUser, userDataSave } from './service/usersHandler.js';
const client = new Discord.Client();
let botlog;
let botAvatar;

client.on('ready', () => {
    client.on('error', console.error);
    client.on('debug', console.log);
    console.log(`Logged in as ${client.user.tag}!`);
    botAvatar = client.user.displayAvatarURL();
});

client.on('guildMemberRemove', member => {
    let leftMember = member.guild.id;
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == leftMember);
    leaveUser(member, botlog, client);


});

client.on('guildMemberAdd', member => {
    let joinMember = member.guild.id;
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == joinMember);
    userDataSave(member, botlog, client);
});

client.on('message', msg => {
    let channelInfo = client.channels.cache.find(channel => channel.name == "обьявления" && channel.guild.id == msg.guild.id);
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == msg.guild.id);
    cmd.commandHandler(msg, botlog, botAvatar, channelInfo, client);
});

client.login(config.token);