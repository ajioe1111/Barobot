
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
// eslint-disable-next-line no-unused-vars
import * as fs from 'fs';
/**
 * 
 * @param {Discord.Message} msg 
 * @param {Discord.Client} client 
 */

export function setDefaultRole(msg, client) {
    let args = msg.content.split(' ');
    if (!args[1]) {
        msg.reply(`Необходимо указать ID роли.`);
    }
    let targedRole = args[1];
    let checkGuild = client.guilds.cache.find(guildId => guildId.id == msg.guild.id)
    let listing = fs.readdirSync("./database/guild");

    for (let i = 0; i <= listing.length; i++) {
        let fileRead = checkGuild + '.json'
        if (fileRead == listing[i]) {
            let cacheGuildFile = fs.readFileSync(`./database/guild/${fileRead}`).toString();
            let parseFile = JSON.parse(cacheGuildFile);
            parseFile.guildDefaultRole = targedRole;
            let saveFile = JSON.stringify(parseFile);
            fs.writeFileSync(`./database/guild/${fileRead}`, saveFile);
            return;
        }
    }
    msg.reply(`Сначала инициализируйте сервер.`)
}