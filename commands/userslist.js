import * as fs from 'fs';
import * as Discord from 'discord.js';

export function userslist(botlog) {
    let listing = fs.readdirSync("./database/users", `utf-8`);
    for (let i = 0; i < listing.length; i++) {
        let findUser = (`./database/users/${listing[i]}`);
        let cacheUser = fs.readFileSync(findUser).toString();
        let users = JSON.parse(cacheUser);
        const userListEmbed = new Discord.MessageEmbed()
        .setDescription(`!get ${listing[i]}`)
        .setColor(0x8FD52C)
        .setThumbnail(users.avatarURL)
        .addFields(
            {name: `Nickname`, value: `${users.user}`},
            {name: `ID`, value: `${users.id}`, inline: true},
            {name: `Click ID`, value: `<@${users.id}>`, inline: true},
            {name: `User Tag`, value: `${users.user_tag}`},
            {name: `Join At`, value: `${users.joinedAt} Дата может быть не точной (По умолчанию стоит 01.02.2021, 13:44:22)`},
        );
        botlog.send(userListEmbed);


    }
}