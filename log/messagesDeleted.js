import * as Discord from 'discord.js';

export function dellMsg(messageDelete, logChannel) {
    if (messageDelete !== undefined) {
        console.log(`${messageDelete.author} delete msg!`)
        let consoleErr = {
            message: messageDelete,
            messageContent: messageDelete.content,
            messageAuthorId: messageDelete.author.id,
            messageChannel: messageDelete.channel,
            messageId: messageDelete.id,
        };

        console.log(consoleErr);
        
        const DeleteEmbed = new Discord.MessageEmbed()
            .setTitle("**Удалено сообщение!**")
            .setColor("#fc3c3c")
            .addField("Автор", `<@${messageDelete.author.id}>`, true)
            .addField("Канал", messageDelete.channel, true)
            .addField("Сообщение", messageDelete.content)
            .setFooter(`ID Сообщения: ${messageDelete.id} | ID Автора: ${messageDelete.author.id}`);

        logChannel.send(DeleteEmbed);
    } else { 
        console.log(`Error MessagesDeleted.js // ошибка, не найден один из параметров`);
        return;
    }
}