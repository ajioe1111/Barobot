
import { getArguments } from './../service/getArguments.js';

export function unmuted(msg, guild, botlog) {
    let user = msg.mentions.users.first();
    let args = getArguments(msg.content);
    if (user) {
        let findUser = guild.members.cache.find(member => member.id == user.id);
        if (findUser) {
            let mutedRole = guild.roles.cache.find(role => role.name == `mute`);
            if (mutedRole) {
                findUser.roles.remove(mutedRole);
                findUser.voice.setMute(false);
                if (args[2] != undefined) {
                    botlog.send(`Мьют снят с пользователя: ${user}\r\nСнял: ${msg.author}\r\nПричина: ${args[2]}`);
                } else { botlog.send(`Мьют снят с пользователя: ${user}\r\nСнял: ${msg.author}`) }
            } else { msg.reply(`Отсутствует роль 'mute'`) }
        } else { msg.reply(`Данный юзер отсутствует на сервере!`) }
    } else { msg.reply(`Не указан юзер`) }
    msg.delete( {timeout: 0});
}