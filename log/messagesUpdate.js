// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
/**
 * 
 * @param {Discord.Message} oldMsg 
 * @param {Discord.Message} newMsg 
 */
export function msgLog(oldMsg, newMsg, logChannel) {
    console.log(`${newMsg.author} edit msg!`)
    const updateMessage = new Discord.MessageEmbed()
        .setTitle("**Изменено сообщение!**")
        .setColor("#F8E71C")
        .addField("Автор", `<@${newMsg.author.id}>`, true)
        .addField("Канал", newMsg.channel, true)
        .addField("Изменение с", oldMsg.content)
        .addField("Изменение на", newMsg.content)
        .setFooter(`ID Сообщения: ${newMsg.id} | ID Автора: ${newMsg.author.id}`);


    logChannel.send(updateMessage);
}