
import * as fs from 'fs';
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
/**
 * 
 * @param {Discord.Message} msg 
 */
export function addWord (msg) {
    let cacheList = fs.readFileSync('./database/banned_word/wordList.json').toString();
    let listArray = JSON.parse(cacheList);
    let args = msg.content.split(' ');
    if (!args[1]) {
        msg.reply(`Я не могу добавить пустое слово =/`);
        return;
    }
    let lowerArgs = args[1].toLowerCase()
    for (let i = 0; i < listArray.length; i++) {
        if (lowerArgs == listArray[i]) {
            msg.reply(`Такое слово уже есть в списке!`);
            return;
        }
    }
    listArray.push(lowerArgs);
    msg.reply(`Я добавил слово в список!`);
    console.log(`Add new word "${lowerArgs}" to black list!`);
    fs.writeFileSync(`./database/banned_word/wordList.json`, JSON.stringify(listArray));
}
