/* eslint-disable no-unused-vars */
import * as cmd from './service/commandHandler.js';
import * as Discord from 'discord.js';
//import * as fs from 'fs';
import config from './config.js'
import { leaveUser, userDataSave } from './service/usersHandler.js';
import { msgLog } from './log/messagesUpdate.js';
import { dellMsg } from './log/messagesDeleted.js';
import { memberUpdate } from './log/memberUpdate.js';
const client = new Discord.Client();
let botAvatar;
let botOwner = `333660691644809216`; // Owner ID. 333660691644809216

client.on('ready', () => {
    client.on('error', console.error);
    console.log(`Logged in as ${client.user.tag}!`);
    botAvatar = client.user.displayAvatarURL();
});

client.on('guildMemberRemove', member => {
    let leftMember = member.guild.id;
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == leftMember);
    leaveUser(member, botlog, client);
    console.log(`${member} left from ${member.guild.name}`);
});

client.on('guildMemberAdd', member => {
    let joinMember = member.guild.id;
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == joinMember);
    userDataSave(member, botlog, client);
    console.log(`${member} join to ${member.guild.name}`);
});

client.on('message', msg => {
    let channelInfo = client.channels.cache.find(channel => channel.name == "обьявления" && channel.guild.id == msg.guild.id);
    let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == msg.guild.id);
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == msg.guild.id);
    let isOwner = client.users.cache.find(owner => owner.id == botOwner);
    cmd.commandHandler(msg, botlog, botAvatar, channelInfo, client, isOwner, logChannel);

});

client.on('messageUpdate', (oldMsg, newMsg) => {
    if (oldMsg && newMsg && newMsg.author.id !== client.user.id) {
        let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == oldMsg.guild.id);
        msgLog(oldMsg, newMsg, logChannel);
        return;
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == oldMember.guild.id);
    memberUpdate(oldMember, newMember, logChannel);
    
});

client.on("messageDelete", (messageDelete) => {
    if (messageDelete && messageDelete.author.id !== client.user.id) {
        let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == messageDelete.guild.id);
        dellMsg(messageDelete, logChannel);
    }
});


client.login(config.token);