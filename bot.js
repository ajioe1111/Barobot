
import * as cmd from './service/commandHandler.js';
import * as Discord from 'discord.js';
import config from './config.js'
import { leaveUser, userDataSave } from './service/usersHandler.js';
import { msgLog } from './log/messagesUpdate.js';
import { dellMsg } from './log/messagesDeleted.js';
import { memberUpdate } from './log/memberUpdate.js';
import { greetingNewMemberHub } from './personal_options/hub.js';
import { omcMSGChecker, roleCheck } from './personal_options/omc.js';
import { hubChecker } from './service/hubCheckerJoin.js';
const client = new Discord.Client();
export { client };
let botAvatar;

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
    if (joinMember == `789579914869080074`) {
        greetingNewMemberHub(member);
        console.log(`Member join to hub. ${member.user.id}`);
        return;
    }
    hubChecker(member);
});

client.on('message', msg => {
    if (msg.channel.type == "dm") {
        omcMSGChecker(msg, client);
        return;
    }
    if (!msg.author.bot) {
        let channelInfo = client.channels.cache.find(channel => channel.name == "обьявления" && channel.guild.id == msg.guild.id);
        let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == msg.guild.id);
        let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == msg.guild.id);
        cmd.commandHandler(msg, botlog, botAvatar, channelInfo, client, logChannel);
    }
});

client.on("messageDelete", (messageDelete) => {
    if (messageDelete.channel.type == "dm") {
        return;
    }
    else {
        let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == messageDelete.guild.id);
        dellMsg(messageDelete, logChannel);
    }
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    if (oldMsg.channel.type == "dm") {
        return;
    }
    if (oldMsg.content == newMsg.content) {
        return;
    }
    if (oldMsg && newMsg && newMsg.author.id !== client.user.id) {
        let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == oldMsg.guild.id);
        msgLog(oldMsg, newMsg, logChannel);
        return;
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    let logChannel = client.channels.cache.find(channel => channel.name == "log" && channel.guild.id == oldMember.guild.id);
    memberUpdate(oldMember, newMember, logChannel);
    if (newMember.guild.id == `799302316984762438`) {
        roleCheck(newMember);
        return;
    }
});





client.login(config.token);