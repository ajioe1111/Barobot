
import { getNotificationTimeout } from './../service/getNotificationTimeout.js';
import { getArguments } from './../service/getArguments.js';
import * as Discord from 'discord.js';
/**
 * 
 * @param {Discord.Message} msg 
 */
 export function events(msg, channelInfo) {
    let args = getArguments(msg.content);
    let timeArgs = args[1];
    let time = timeArgs.slice(1, timeArgs.length - 1);
    let eventNameArgs = args[2];
    let eventName = eventNameArgs.slice(1, eventNameArgs.length - 1);

    setTimeout(() => channelInfo.send(`@everyone Сбор начинается через пол часа! в ${time} по МСК!`), getNotificationTimeout(time, 30));
    setTimeout(() => channelInfo.send(`@everyone Сбор через пять минут! в ${time} по МСК!`), getNotificationTimeout(time, 5));


    const embed = new Discord.MessageEmbed()
    .setTitle(`Обьявлена игра!`)
    .setDescription(`Не опаздывайте!`)
    .addField(`Описание`, `${eventName}`)
    .addField(`Время`, `${time} по МСК!`)
    .setColor(0x377755)
    .setThumbnail(`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/33962671/dbb42b610a560b5c52a03e48a124ee4421ec0bc1.jpg`);
    channelInfo.send(`@everyone`);
    channelInfo.send(embed);
    
    //channelInfo.send(`@everyone Обьявлена игра!\r\n${eventName}\r\nНа: ${time} по МСК!`);
}