
import { getArguments } from '../../service/getArguments.js';

export function muted(msg, guild, botlog) {
    let user = msg.mentions.users.first();
    let args = getArguments(msg.content);
    if (user) {
        let findUser = guild.members.cache.find(member => member.id == user.id);
        if (findUser) {
            let mutedRole = guild.roles.cache.find(role => role.name == `mute`);
            if (mutedRole) {
                findUser.roles.add(mutedRole);
                findUser.voice.setMute(true);
                if (args[2] != undefined) {
                    botlog.send(`Выдан мьют пользователю: ${user}\r\nМьют выдан пользователем: ${msg.author}\r\nПричина: ${args[2]}`);
                } else { botlog.send(`Выдан мьют пользователю: ${user}\r\nМьют выдан пользователем: ${msg.author}`) }
            } else { msg.reply(`Отсутствует роль 'mute'`) }
        } else { msg.reply(`Данный юзер отсутствует на сервере!`) }
    } else { msg.reply(`Не указан юзер`) }
    msg.delete( {timeout: 0});
}