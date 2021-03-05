import * as fs from 'fs';
import { client } from '../../bot.js';




export function guildInit(msg) {
    let guildId = client.guilds.cache.find(guildId => guildId.id == msg.guild.id)
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
