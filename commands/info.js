import * as Discord from 'discord.js';

export function info(msg, botlog) {
    let user = msg.mentions.users.first();
    if (user) {
        let userID = user.id;
        const embed = new Discord.MessageEmbed()
            .setImage(user.displayAvatarURL())
            .setAuthor(`Вызвал команду ${msg.author.username}`)
            .setTitle(`Информация о ${user.username}`)
            .addField(`ID:`, `<@${userID}> ${userID}`)
            .addField(`Регистрация:`, `${user.createdAt}`)
            .addField(`ТЭГ:`, `${user.tag}`)
            .setColor(0xff0000);
        botlog.send(embed);
    } else { botlog.send(`Текущего юзера нету на сервере, воспользуйтесь командой !infoID или запросите базу данных`) }
    msg.delete( {timeout: 0});
}