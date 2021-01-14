// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js';

/**
 * 
 * @param {Discord.} msg 
 */

export function urlChecker (msg, isAdmin) {
    if (isAdmin) {
        return;
    }
    let lowerContent = msg.content.toLowerCase();
    let url = ['http', 'https', '.www', '://', '.ru', '.com', '.net'];
    for (let i = 0; i <= url.length; i++) {
        if (lowerContent.includes(url[i])) {
            msg.delete( {timeout: 0});
            msg.reply(`Ссылки запрещены!`);
            return;
        }
    }
}