// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';


let admin = `Admin`;
let gm = `Game Master`;
let moderator = `Moderator`;


/**
 * 
 * @param {Discord.User} user 
 * @param {Discord.Client} client
 */
export function groupChecker(user, guild) {
    let guildMember = guild.members.cache.find(member => member.user.id == user.id);
    if (guildMember.roles.cache.find(role => role.name == admin)) {
        return `isAdmin`;
    }
    else if (guildMember.roles.cache.find(role => role.name == gm)) {
        return `isGm`;
    }
    else if (guildMember.roles.cache.find(role => role.name == moderator)) {
        return `isModerator`;
    }
    else { return `isUser` }
}