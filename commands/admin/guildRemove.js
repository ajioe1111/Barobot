import * as fs from 'fs';
import { client } from '../../bot.js';
import config from '../../config.js'
let prefix = config.prefix;


export function guildRemove(msg) {
    let guildId = client.guilds.cache.find(guildId => guildId.id == msg.guild.id)
    if (msg.content.startsWith(prefix + `guildremove`)) {
        fs.unlinkSync(`./database/guild/${guildId.id}.json`);
        msg.reply(`Сервер удален из базы`);
        return;
    }
}