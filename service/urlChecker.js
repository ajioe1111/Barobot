// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import * as fs from 'fs';
/**
 * 
 * @param {Discord.} msg 
 */

export function urlChecker(msg, isAdmin, isModer, isOwner, logChannel) {
    //Блок получения информации о вкл/выкл данной опции.
    let guildID = msg.guild.id;
    if (fs.existsSync(`./database/guild/${guildID}.json`)) {
        let cacheOption = fs.readFileSync(`./database/guild/${guildID}.json`).toString();
        let options = JSON.parse(cacheOption);
        //Конец блока

        if (msg.content === `$$checkurl true` && isAdmin || msg.content === `$$checkurl true` && isOwner) {
            options.urlCheck = true;
            msg.reply(`Запрет ссылок включен.`);
            fs.writeFileSync(`./configs/options.json`, JSON.stringify(options));
            return;
        } else if (msg.content === `$$checkurl false` && isAdmin || msg.content === `$$checkurl false` && isOwner) {
            options.urlCheck = false;
            msg.reply(`Запрет ссылок выключен.`);
            fs.writeFileSync(`./configs/options.json`, JSON.stringify(options));
            return;
        }

        if (isAdmin || isModer || msg.author.bot || isOwner) {
            return;
        }
        if (msg.content.startsWith(`https://discord.com/channels/@me`)) {
            return;
        }

        let lowerContent = msg.content.toLowerCase();
        let url = ['http', 'https', '.www', '://', '.ru', '.com', '.net', '.info'];
        for (let i = 0; i <= url.length; i++) {
            if (lowerContent.includes(url[i])) {
                msg.delete({ timeout: 0 });
                logChannel.send(`${msg.author} кинул(а) ссылку!`);
                msg.reply(`Ссылки запрещены!`); 
                return;
            }
        }
    }
}