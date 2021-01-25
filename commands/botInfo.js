import * as Discord from 'discord.js';


/**
 * 
 * @param {Discord.Message} message 
 */
export function botInfo(message, botAvatar) {
    let time = new Date().toLocaleString();
    let serverembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(botAvatar)
        .addField("Bot author", `<@333660691644809216>`, true)
        .addField("Bot Name", message.client.user.username, true)
        .addField("Bot time", time)
        .addField("Bot version", "2.1.0")
        .addField("Created On", message.client.user.createdAt)
        .addField("Инструкция", "https://app.gitbook.com/@ajioe1111/s/baro-bot-info/");
    message.reply(serverembed);
}