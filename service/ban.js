import { client } from '../bot.js';

/**
 * 
 * @param {Discord.User} id 
 */
export function userBan(id) {
    client.guilds.cache.forEach((guild) => {
        let member = guild.members.cache.find(member => member.id === id);
        if (member) {
            member.ban({ reason: `Лимит предупреждений.` })
        }
    });
}