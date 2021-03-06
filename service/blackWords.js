import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';

/**
 * 
 * @param {Discord.Message} msg 
 */
export function blackWords(msg, userRole, logChannel) {
    if (msg.channel.id == `809054903389519913`) {
        return;
    }
    //Блок получения информации о вкл/выкл данной опции.
    let guildID = msg.guild.id;
    if (fs.existsSync(`./database/guild/${guildID}.json`)) {
        let path = `./database/guild/${guildID}.json`
        let cacheOption = fs.readFileSync(path).toString();
        let options = JSON.parse(cacheOption);

        if (msg.content == `!checkwords true` && userRole == `isAdmin`) {
            options.wordCheck = true;
            msg.reply(`Черный список слов включен.`);
            fs.writeFileSync(path, JSON.stringify(options));
            return;
        }
        else if (msg.content == `!checkwords false` && userRole == `isAdmin`) {
            options.wordCheck = false;
            msg.reply(`Черный список слов выключен.`);
            fs.writeFileSync(path, JSON.stringify(options));
            return;
        }
        if (options.wordCheck == false) {
            return;
        }
        if (msg.author.bot || userRole == `isAdmin`) {
            return;
        }
        if (options.wordCheck) {
            let cacheList = fs.readFileSync('./database/banned_word/wordList.json').toString();
            let listArray = JSON.parse(cacheList);
            let lowerMsg = msg.content.toLowerCase();
            for (let i = 0; i <= listArray.length; i++) {
                if (lowerMsg.includes(listArray[i])) {
                    logChannel.send(`${msg.author} написал запрещенное слово!`)
                    msg.reply('Запрещенное слово!');
                    msg.delete({ timeout: 0 });
                }
            }
        } else { return; }
    }

}
