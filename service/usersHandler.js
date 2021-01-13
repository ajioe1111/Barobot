import * as fs from 'fs';


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
        botlog.send(`Зашел ${member.displayName} и он(а) уже есть в базе, его ID ${member.id} (<@${member.id}>, на ${member.guild.name})`)
    }
    else {
        let username = member.displayName;
        let userID = member.id;
        let createdAt = member.user.createdAt; //
        let userTag = member.user.tag; //
        let userAvatar = member.user.displayAvatarURL(); //
        let newUser = { user: username, id: userID, created_at: createdAt, avatarURL: userAvatar, user_tag: userTag };
        fs.writeFileSync(`./database/users/${userID}.json`, JSON.stringify(newUser));
        botlog.send(`Зашел новый Юзер! <@${member.id}>, на ${member.guild.name}`)
    }
}

export function leaveUser(member, botlog) {
    console.log(`Member left ${member}`);
    botlog.send(`${member} покинул(а) сервер. Его ID: ${member.id}, из ${member.guild.name}`);
}
