// eslint-disable-next-line no-unused-vars
import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import config from '../config.js'
import { getUser } from '../commands/getUser.js';
import { userslist } from '../commands/userslist.js';
import { clear } from '../commands/clear.js';
import { botInfo } from '../commands/botInfo.js';
import { events } from '../commands/events.js';
import { info } from '../commands/info.js';
import { muted } from '../commands/mute.js';
import { unmuted } from '../commands/unmuted.js';
import { blackWords } from './blackWords.js';
import { addWord } from '../commands/addWord.js';
import { deleteWord } from '../commands/deleteWord.js';
import { guildInit } from '../commands/guildInit.js';
import { setDefaultRole } from '../commands/setDefaultRole.js';
import { urlChecker } from './urlChecker.js';
import { say } from '../commands/say.js';



let prefix = config.prefix

/**
 * 
 * @param {Discord.Message} msg 
 * @param {Discord.Channel} botlog 
 */
export function commandHandler(msg, botlog, botAvatar, channelInfo, client) {
    let guild = msg.guild;
    let guildMember = guild.members.cache.find(member => member.user.id == msg.author.id);

    if (guildMember == undefined) {
        console.log(`Хуйня какая та произошла.`);
        return;
    }

    let level1 = 'bot-level1';
    let level2 = 'bot-level2';
    let isAdmin;
    let isModer;

    if (guildMember.roles.cache.find(role => role.name == level2)) {
        isAdmin = true;
    }

    if (guildMember.roles.cache.find(role => role.name == level1) || isAdmin) {
        isModer = true;
    }

    if (isAdmin) {
        //Технический уровень.
        if (msg.content.startsWith(prefix + `userslist`)) {
            userslist(botlog);
            return;
        }
        else if (msg.content.startsWith(prefix + `get`)) {
            getUser(msg, botlog);
            return;
        }
        else if (msg.content.startsWith(prefix + `addword`)) {
            addWord(msg);
            return;
        }
        else if (msg.content.startsWith(prefix + `deleteword`)) {
            deleteWord(msg);
            return;
        }
        else if (msg.content.startsWith(prefix + `init`)) {
            guildInit(msg, client);
            return;
        }
        else if (msg.content.startsWith(prefix + `setdefaultrole`)) {
            setDefaultRole(msg, client);
            return;
        }
        else if (msg.content.startsWith(prefix + `say`)) {
            say(msg, client);
            return;
        }

    }
    //Уровень Администратора.
    if (isModer) {
        if (msg.content.startsWith(prefix + `clear`)) {
            clear(msg);
            return;
        }
        else if (msg.content.startsWith(prefix + `event`)) {
            events(msg, channelInfo);
            return;
        }
        else if (msg.content.startsWith(prefix + `info`)) {
            info(msg, botlog);
            return;
        }
        else if (msg.content.startsWith(prefix + `mute`)) {
            muted(msg, guild, botlog);
            return;
        }
        else if (msg.content.startsWith(prefix + `unmute`)) {
            unmuted(msg, guild, botlog);
            return;
        }
    }
    if (msg.content.startsWith(prefix + `bot`)) {
        botInfo(msg, botAvatar);
        return;
    }
    blackWords(msg, isAdmin);
    urlChecker(msg, isAdmin);
}