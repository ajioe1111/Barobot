
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import config from '../config.js'
import { getUser } from '../commands/admin/getUser.js';
import { userslist } from '../commands/admin/userslist.js';
import { clear } from '../commands/moder/clear.js';
import { botInfo } from '../commands/user/botInfo.js';
import { events } from '../commands/gm/events.js';
import { info } from '../commands/moder/info.js';
import { muted } from '../commands/moder/mute.js';
import { unmuted } from '../commands/moder/unmuted.js';
import { blackWords } from './blackWords.js';
import { addWord } from '../commands/admin/addWord.js';
import { deleteWord } from '../commands/admin/deleteWord.js';
import { guildInit } from '../commands/admin/guildInit.js';
import { setDefaultRole } from '../commands/admin/setDefaultRole.js';
import { urlChecker } from './urlChecker.js';
import { say } from '../commands/admin/say.js';
import { addNewP } from '../commands/admin/addNewP.js';
import { dice } from '../commands/user/dice.js';
import { warn } from '../commands/gm/warn.js';
import { test } from '../commands/test.js';
import { groupChecker } from './groupHendler.js';
import { guildRemove } from '../commands/admin/guildRemove.js';
import { hubChecker } from './hubChecker.js';
//import { newEvents } from '../commands/gm/newEvents.js';



let prefix = config.prefix

/**
 * 
 * @param {Discord.Message} msg 
 * @param {Discord.Channel} botlog 
 */
export function commandHandler(msg, botlog, botAvatar, channelInfo, client, logChannel) {
    if (msg.author.bot) {
        return;
    }
    hubChecker(msg);  //Раскоментить перед заливкой
    let user = msg.author;
    let guild = msg.guild;
    let userRole = groupChecker(user, guild);
    blackWords(msg, userRole,logChannel);
    urlChecker(msg, userRole, logChannel);


    if (userRole == `isAdmin`) {
        if (msg.content.startsWith(prefix + `userslist`)) {
            userslist(botlog);
            console.log(`${msg.author} used command "userslist"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `get`)) {
            getUser(msg, botlog);
            console.log(`${msg.author} used command "get"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `addword`)) {
            addWord(msg);
            console.log(`${msg.author} used command "addword"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `deleteword`)) {
            deleteWord(msg);
            console.log(`${msg.author} used command "deleteword"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `init`)) {
            guildInit(msg, client);
            console.log(`${msg.author} used command "init"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `guildremove`)) {
            guildRemove(msg);
            return;
        }
        else if (msg.content.startsWith(prefix + `setdefaultrole`)) {
            setDefaultRole(msg, client);
            console.log(`${msg.author} used command "setdefaultrole"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `say`)) {
            say(msg, client);
            console.log(`${msg.author} used command "say"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `test`)) {
            test(msg);
        }
        else if (msg.content.startsWith(prefix + `addnewP`)) {
            addNewP(msg);
            return;
        }
    }
    if (userRole == `isGm` || userRole == `isAdmin`) {
        if (msg.content.startsWith(prefix + `event`)) {
            events(msg, channelInfo);
            console.log(`${msg.author} used command "event"`);
            return;
        }
        if (msg.content.startsWith(prefix + `newEvent`)) {
           // newEvents(msg);
            console.log(`${msg.author} used command "newEvent"`);
            return;
        }
    }

    if (userRole == `isModerator` || userRole == `isGm` || userRole == `isAdmin`) {
        if (msg.content.startsWith(prefix + `warn`)) {
            warn(msg);
        }
        if (msg.content.startsWith(prefix + `clear`)) {
            clear(msg);
            console.log(`${msg.author} used command "clear"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `info`)) {
            info(msg, botlog);
            console.log(`${msg.author} used command "info"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `mute`)) {
            muted(msg, guild, botlog);
            console.log(`${msg.author} used command "mute"`);
            return;
        }
        else if (msg.content.startsWith(prefix + `unmute`)) {
            unmuted(msg, guild, botlog);
            console.log(`${msg.author} used command "unmute"`);
            return;
        }
    }
    if (userRole == `isUser` || userRole == `isModerator` || userRole == `isGm` || userRole == `isAdmin`)
        if (msg.content.startsWith(prefix + `bot`)) {
            botInfo(msg, botAvatar);
            console.log(`${msg.author} used command "bot"`);
            return;
        }
    if (msg.content.startsWith(prefix + `dice`)) {
        console.log(`${msg.author} used command "dice"`);
        dice(msg);
    }

}