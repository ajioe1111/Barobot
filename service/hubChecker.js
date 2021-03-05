// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';
import { client } from '../bot.js';



/**
 * 
 * @param {Discord.Message} msg 
 */
export function hubChecker(msg) {
    let userId = msg.author.id;
    let findHub = client.guilds.cache.find(hub => hub.id === `789579914869080074`);
    let logHubChannel = findHub.channels.cache.find(channel => channel.id === `799306126159773726`)
    let userInHub = findHub.members.cache.find(user => user.id === userId);
    if (userInHub) {
        return;
    }
    else {
        let inviteChannel = findHub.channels.cache.find(channel => channel.id === `789580064895401994`)
        inviteChannel.createInvite({ unique: true })
            .then(invite => {
                console.log("Bot created invite code " + invite)
                msg.author.send(`Ваше личное приглашение https://discord.gg/` + invite + ` действительно 24 часа.`)
            });
        const invateEmbed = new Discord.MessageEmbed()
            .setTitle(`Ошибка авторизации!`)
            .setTimestamp()
            .addField(`Вас нету в нашем хабе.`, `Для продолжения общения на этом сервере вам необходимо зайти и оставаться в нашем хабе.`)
            .setColor(0xE02AC2);
        msg.author.send(invateEmbed);
        setTimeout(() => client.guilds.cache.forEach((guild) => {
            let member = guild.members.cache.find(member => member.id === userId);
            if (member) {
                member.kick();
            }
        }), 2000);
        logHubChannel.send(`@Game Admin || ${msg.author.username} был кикнут с серверов за отсутствие в хабе ||`);
    }
}