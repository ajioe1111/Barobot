// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import { getArguments } from '../../service/getArguments.js';
/**
 * 
 * @param {Discord.Message} msg 
 * @param {Discord.Client} client 
 */
export function say(msg, client) {

    let args = getArguments(msg.content);
    let channel = args[1];
    let castomMsg = args[2];
    let sliceCastomMsg = args[2].slice(1, castomMsg.length - 1);
    if (!args[1]) {
        msg.reply(`Нужно указать канал!`);
        console.log(`${msg.author} использовал команду say не указав канал.`)
        return;
    }
    if (!args[2]) {
        msg.reply(`Нужно указать сообщение!`);
        console.log(`${msg.author} использовал команду say не указав сообщение`);
        return;
    }
    let findChannel = (client.channels.cache.find(channelId => channelId == channel));
    findChannel.send(sliceCastomMsg);
    return;
}