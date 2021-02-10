// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import * as fs from 'fs';
/**
 * 
 * @param {Discord.Message} msg 
 */

export function urlChecker(msg, isAdmin, isModer, isOwner, logChannel) {
    //Блок получения информации о вкл/выкл данной опции.
    if (msg.channel.id == `809054903389519913`) {
        return;
    }
    let guildID = msg.guild.id;
    if (fs.existsSync(`./database/guild/${guildID}.json`)) {
        let cacheOption = fs.readFileSync(`./database/guild/${guildID}.json`).toString();
        let options = JSON.parse(cacheOption);
        //Конец блока

        if (msg.content === `$$checkurl true` && isAdmin || msg.content === `$$checkurl true` && isOwner) {
            options.urlCheck = true;
            msg.reply(`Запрет ссылок включен.`);
            fs.writeFileSync(`./database/guild/${guildID}.json`, JSON.stringify(options));
            return;
        } else if (msg.content === `$$checkurl false` && isAdmin || msg.content === `$$checkurl false` && isOwner) {
            options.urlCheck = false;
            msg.reply(`Запрет ссылок выключен.`);
            fs.writeFileSync(`./database/guild/${guildID}.json`, JSON.stringify(options));
            return;
        }
        if (options.urlCheck == false) {
            return;
        }
        if (isAdmin == true || isModer == true|| msg.author.bot || isOwner == true) {
            return;
        }
        if (msg.content.startsWith(`https://discord.com/channels/@me`)) {
            return;
        }

        let lowerContent = msg.content.toLowerCase();
        let url = ['http', 'https', '.www', '://', '.ru', '.com', '.net', '.info', 'ht_ps:', '//www.'];
        for (let i = 0; i <= url.length; i++) {
            if (lowerContent.includes(url[i])) {
                msg.delete({ timeout: 0 });
                logChannel.send(`${msg.author} кинул(а) ссылку! "${msg.content}"`);
                msg.reply(`Ссылки запрещены!`);
                return;
            }
        }
    }
}