
import { getNotificationTimeout } from './../service/getNotificationTimeout.js';
import { getArguments } from './../service/getArguments.js';

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

    setTimeout(() => channelInfo.send(`@everyone Напоминаю про игру! в ${time} по МСК!`), getNotificationTimeout(time, 30));
    setTimeout(() => channelInfo.send(`@everyone Напоминаю про игру! в ${time} по МСК!`), getNotificationTimeout(time, 5));

    channelInfo.send(`@everyone Обьявлена игра!\r\n${eventName}\r\nНа: ${time} по МСК!`);
}