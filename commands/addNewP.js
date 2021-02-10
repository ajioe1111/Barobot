import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
/**
 * 
 * @param {Discord.Message} msg 
 */
export function addNewP(msg) {
    if (msg.author.id == `333660691644809216`) {
        let listing = fs.readdirSync("./database/users");
        for (let i = 0; i < listing.length; i++) {
            let file = listing[i]
            let path = `./database/users/${file}`;
            let cacheUser = fs.readFileSync(path).toString();
            let users = JSON.parse(cacheUser);
            users.level = 0;
            users.xp = 0;
            fs.writeFileSync(path, JSON.stringify(users));
        }
        msg.reply(`Done!`);
    }
    else {
        msg.reply(`Недостаточно прав!`)
        return;
    }
}