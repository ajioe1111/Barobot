import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';

/**
 * 
 * @param {Discord.Message} msg 
 */
export function blackWords (msg) {
    let cacheList = fs.readFileSync('./database/banned_word/wordList.json').toString();
    let listArray = JSON.parse(cacheList);
    let lowerMsg = msg.content.toLowerCase();
    for (let i = 0; i <= listArray.length; i++) {
        if (lowerMsg.includes(listArray[i])) {
            msg.reply('Запрещенное слово!');
            msg.delete( {timeout: 0});
        }
    }
}