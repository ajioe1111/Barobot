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
export function commandHandler(msg, botlog, botAvatar, channelInfo, client, isOwner, logChannel) {
    if (msg.author.bot) {
        return;
    }
    let guild = msg.guild;
    let guildMember = guild.members.cache.find(member => member.user.id == msg.author.id);

    if (guildMember == undefined) {
        console.log(`*ERROR* Пользователь не найден.`);
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

    if (isAdmin || isOwner) {
        //Технический уровень.
        if (msg.content.startsWith(prefix + `userslist`)) {
            userslist(botlog);
            console.log(`${msg.author} user command "userslist"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `get`)) {
            getUser(msg, botlog);
            console.log(`${msg.author} user command "get"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `addword`)) {
            addWord(msg);
            console.log(`${msg.author} user command "addword"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `deleteword`)) {
            deleteWord(msg);
            console.log(`${msg.author} user command "deleteword"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `init`) || msg.content == `$$guildremove`) {
            console.log(`point`)
            guildInit(msg, client, isAdmin, isOwner);
            console.log(`${msg.author} user command "init"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `setdefaultrole`)) {
            setDefaultRole(msg, client);
            console.log(`${msg.author} user command "setdefaultrole"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `say`)) {
            say(msg, client);
            console.log(`${msg.author} user command "say"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `test`)) {
            let msgArr = [`1`, `2`, `3`, `4`, `5`];
            msg.reply(msgArr);
            return;
        }

    }
    //Уровень Администратора.
    if (isModer || isOwner) {
        if (msg.content.startsWith(prefix + `clear`)) {
            clear(msg);
            console.log(`${msg.author} user command "clear"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `event`)) {
            events(msg, channelInfo);
            console.log(`${msg.author} user command "event"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `info`)) {
            info(msg, botlog);
            console.log(`${msg.author} user command "info"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `mute`)) {
            muted(msg, guild, botlog);
            console.log(`${msg.author} user command "mute"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `unmute`)) {
            unmuted(msg, guild, botlog);
            console.log(`${msg.author} user command "unmute"`);
            return;
        }
    }
    if (msg.content.startsWith(prefix + `bot`)) {
        botInfo(msg, botAvatar);
        console.log(`${msg.author} user command "bot"`);
        return;
    }
    blackWords(msg, isAdmin, isOwner, logChannel);
    urlChecker(msg, isAdmin, isModer, isOwner, logChannel);
}