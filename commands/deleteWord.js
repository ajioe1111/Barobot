import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
/**
 * 
 * @param {Discord.Message} msg 
 */

 export function deleteWord(msg) {
    let cacheList = fs.readFileSync('./database/banned_word/wordList.json').toString();
    let listArray = JSON.parse(cacheList);
    let args = msg.content.split(' ');
    if (!args[1]) {
        msg.reply(`Я не могу удалить пустоту...`);
        return;
    }
    let lowerArgs = args[1].toLowerCase()
    for (let i = 0; i <= listArray.length; i++) {
        if (lowerArgs == listArray[i]) {
            listArray.splice(i, 1);
            console.log(`delete "${lowerArgs}" banned word!`);
            fs.writeFileSync(`./database/banned_word/wordList.json`, JSON.stringify(listArray));
            msg.reply(`Я удалил слово "${lowerArgs}" из списка!`)
        }
    }
 }