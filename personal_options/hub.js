// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
// eslint-disable-next-line no-unused-vars
import * as fs from 'fs';



/**
 * 
 * @param {Discord.GuildMember} member 
 */
export function greetingNewMemberHub(member) {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Добро пожаловать на ${member.guild.name}!`)
        .setDescription(`Ознакомтесь со списком важных каналов.`)
        .addFields(
            { name: 'Основной чат проекта.', value: '<#789579914869080077>' },
            { name: 'Обьявления об играх.', value: '<#796803203835887657>' },
            { name: 'Вся информация по миру проекта.', value: '<#801881757266870303>' },
            { name: 'Важные правила проекта.', value: '<#789580064895401994>' },
            { name: 'Новости игры.', value: '<#796817516722520114>' },
        )
        .setThumbnail(member.guild.iconURL())
        .setColor(0xE02AC4)
    member.send(embed);
    member.send(`Приятной игры <@${member.user.id}>!`);
}   