import * as Discord from 'discord.js';

export function dellMsg(messageDelete, logChannel) {
    const DeleteEmbed = new Discord.MessageEmbed()
    .setTitle("**Удалено сообщение!**")
    .setColor("#fc3c3c")
    .addField("Автор", `<@${messageDelete.author.id}>`, true)
    .addField("Канал", messageDelete.channel, true)
    .addField("Сообщение", messageDelete.content)
    .setFooter(`ID Сообщения: ${messageDelete.id} | ID Автора: ${messageDelete.author.id}`);
  
    logChannel.send(DeleteEmbed);
}