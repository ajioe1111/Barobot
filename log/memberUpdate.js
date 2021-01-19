

import * as Discord from 'discord.js';



export function memberUpdate(oldMember, newMember, logChannel) {
    if (oldMember.displayName != newMember.displayName) {
        const userUpdateEmbed = new Discord.MessageEmbed()
            .setTitle("**Изменения никнейма!**")
            .setColor("#50E3C2")
            .addField("Автор", `<@${oldMember.id}>`)
            .addField(`Изменил имя`, oldMember.displayName, true)
            .addField(`На`, newMember.displayName, true)

        logChannel.send(userUpdateEmbed);
        return;
    }
    return;
}