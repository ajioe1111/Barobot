import * as fs from 'fs';
import * as Discord from 'discord.js';


export function userDataSave(member, botlog) {
    console.log(`New member joined ${member}`);
    let checkGuildFile = fs.existsSync(`./database/guild/${member.guild.id}.json`);
    if (checkGuildFile) {
        let cacheGuildFile = fs.readFileSync(`./database/guild/${member.guild.id}.json`).toString();
        let parseFile = JSON.parse(cacheGuildFile);
        if (parseFile.guildDefaultRole != 'nope') {
            member.roles.add(parseFile.guildDefaultRole);
        }
    }
    let cachePath = `./database/users/${member.id}.json`
    if (fs.existsSync(cachePath) == true) {
        console.log(`${member} old member join!`)
        const oldMember = new Discord.MessageEmbed()
        .setTitle(`Зашел старый пользователь`)
        .addFields(
            {name: `Пользователь`, value: `${member.displayName}`},
            {name: `ID`, value: `${member.id}`, inline: true},
            {name: `Click ID`, value: `<@${member.id}>`, inline: true},
            {name: `Зашел(шла) на`, value: `${member.guild.name}`},
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        botlog.send(oldMember)
    }
    else {
        let username = member.displayName;
        let userID = member.id;
        let createdAt = member.user.createdAt; //
        let userTag = member.user.tag; //
        let userAvatar = member.user.displayAvatarURL(); //
        let newUser = { user: username, id: userID, created_at: createdAt, avatarURL: userAvatar, user_tag: userTag, omcCorpus: false, omcCorpusGranted: false, joinedAt: member.joinedAt, warnCount: 0, warn_end: 0, level: 0, xp: 0 };
        fs.writeFileSync(`./database/users/${userID}.json`, JSON.stringify(newUser));
        console.log(`${member} new member join!`)
        const newMember = new Discord.MessageEmbed()
        .setTitle(`Зашел новый пользователь`)
        .addFields(
            {name: `Пользователь`, value: `${member.displayName}`},
            {name: `ID`, value: `${member.id}`, inline: true},
            {name: `Click ID`, value: `<@${member.id}>`, inline: true},
            {name: `Зашел(шла) на`, value: `${member.guild.name}`},
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        botlog.send(newMember)
    }
}

export function leaveUser(member, botlog) {
    console.log(`Member left ${member}`);
    const memberLeft = new Discord.MessageEmbed()
    .setTitle(`Пользователь покинул сервер`)
    .addField(`Пользватель`, `${member.displayName}`)
    .addField(`ID`, `${member.id}`, true)
    .addField(`Click ID`, `<@${member.id}>`, true)
    .addField(`Вышел из`, `${member.guild.name}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    botlog.send(memberLeft);
}
