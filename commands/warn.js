import * as fs from 'fs';
import * as Discord from 'discord.js';
import { getArguments } from '../service/getArguments.js';
import { client } from '../bot.js';
import { userBan } from '../service/ban.js';

/**
 * 
 * @param {Discord.Message} msg 
 */
export function warn(msg) {

    let args = getArguments(msg.content);
    let UserId = args[1];
    let mentionUserId = UserId.slice(1, UserId.length - 1);
    let textArgs = args[2];
    let text = textArgs.slice(1, textArgs.length - 1);
    let findGuild = client.guilds.cache.find(guild => guild.id === `789579914869080074`);
    let logChannel = findGuild.channels.cache.find(channel => channel.id === `799306126159773726`);
    let warnChannel = findGuild.channels.cache.find(channel => channel.id === `800767106748121118`);
    let userFs = `./database/users/${mentionUserId}.json`;
    if (fs.existsSync(userFs)) {
        let cachePayload = fs.readFileSync(userFs).toString();
        let userProperties = JSON.parse(cachePayload);
        if (userProperties.warnCount == 2) {
            userProperties.warnCount = 0;
            userProperties.warn_end = userProperties.warn_end + 1;
            userBan(mentionUserId);
            const banEmbed = new Discord.MessageEmbed()
                .setTitle(`Пользователь забанен!`)
                .setDescription(`За лимит предупреждений`)
                .setColor(0xE02AC4)
                .setTimestamp()
                .addField(`Юзер`, `<@${mentionUserId}>`);
            logChannel.send(banEmbed);
            let jsonFileContent = JSON.stringify(userProperties);
            fs.writeFileSync(userFs, jsonFileContent);
            return;
        }
        else {
            userProperties.warnCount = userProperties.warnCount + 1;
            const warnEmbed = new Discord.MessageEmbed()
                .setTitle(`Выдано предупреждение`)
                .setDescription(`По достижению трех предупреждений будет выдан Бан`)
                .setTimestamp()
                .setColor(0xFFD800)
                .addFields(
                    {
                        name: `Выдано пользователю`,
                        value: `<@${mentionUserId}>`,
                    },
                    {
                        name: `Причина выдачи`,
                        value: `${text}`,
                    },
                    { name: `Кол-во предупреждений`, value: `${userProperties.warnCount} из 2` },
                )
            let jsonFileContent = JSON.stringify(userProperties);
            fs.writeFileSync(userFs, jsonFileContent);
            warnChannel.send(warnEmbed);
            return;
        }
    }
}