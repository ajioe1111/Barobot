import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';

/**
 * 
 * @param {Discord.Message} msg 
 */
export function guildInit(msg, client, isAdmin, isOwner) {
    let guildId = client.guilds.cache.find(guildId => guildId.id == msg.guild.id)
    if ((msg.content == `$$guildremove` && isAdmin) || (msg.content == `$$guildremove` && isOwner)) {
        fs.unlinkSync(`./database/guild/${guildId.id}.json`);
        msg.reply(`Сервер удален из базы`);
        return;
    }

    let listing = fs.readdirSync("./database/guild");
    for (let i = 0; i < listing.length; i++) {
        let guildJSON = guildId + '.json'
        if (guildJSON == listing[i]) {
            msg.reply(`Такой сервер уже прошел инациализаци. Если это ошибка обратитесь к owner.`);
            return;
        }
        let path = `./database/guild/${guildId.id}.json`
        let guild = { guildName: guildId.name, guildID: guildId.id, guildDefaultRole: "nope", "urlCheck": true, "wordCheck": true }
        let jsonString = JSON.stringify(guild)
        fs.writeFileSync(path, jsonString);
        msg.reply(`Сервер успешно прошел инациализацию!`);
    }
}