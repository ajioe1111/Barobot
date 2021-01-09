const Discord = require('discord.js');
const moment = require('moment');
const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { prefix, token } = require('./config.json');




//Когда бот запустился
client.on('ready', () => {
    client.on('error', console.error);
    client.on('debug', console.log);
    console.log(`Logged in as ${client.user.tag}!`);

});
//Когда юзер покинул сервер или его кикнули.
client.on('guildMemberRemove', member => {
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log");
    console.log(`Member left ${member}`);
    let cachePath = `./database/users/${member.id}.json`
    botlog.send(`${member} покинул сервер. Его ID: ${member.id}`);
})

//Когда зашел новый юзер
client.on('guildMemberAdd', member => {
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log");
    console.log(`New member joined ${member}`);
    let cachePath = `./database/users/${member.id}.json`
    if (fs.existsSync(cachePath) == true) {
        botlog.send(`Зашел ${member.displayName} и он уже есть в базе, его ID ${member.id} (<@${member.id}>)`)
    }
    else {
        member.send(``)
        userDataSave(member);
        botlog.send(`Зашел новый Юзер! <@${member.id}>`)
    }
})

//Когда пришло сообщение
client.on('message', msg => {
    let guild = msg.guild;
    let guildMember = guild.members.cache.find(member => member.user.id == msg.author.id);
    let userPermission = guildMember.hasPermission("VIEW_AUDIT_LOG");
    if (userPermission) {
        let botlog = client.channels.cache.find(channel => channel.name == "bot-log" && channel.guild.id == msg.guild.id);
        let channelev = client.channels.cache.find(channel => channel.name == "обьявления" && channel.guild.id == msg.guild.id);
        //Удаляет N сообщения из чата где введена команда.
        if (msg.content.startsWith(prefix + 'clear')) {
            let args = msg.content.split(' ');
            hardDeleted(args[1], msg);
        };
        //Выводит информацию о боте.
        if (msg.content === prefix + 'bot') {
            about(msg);
        };
        //Выводит информацию о пользователе ВНЕ база дынных.
        if (msg.content.startsWith(prefix + 'info')) {
            info(msg, botlog);
        }
        //Выводит базу данных.
        if (msg.content.startsWith(prefix + `userslist`)) {
            userslist(msg, botlog);
        }
        //Выводит информацию по ID пользователя из базы.
        if (msg.content.startsWith(prefix + `get`)) {
            getUser(msg, botlog);
        }

        if (msg.content.startsWith(prefix + 'mute')) {
            muted(msg, guild, botlog);
        }
        if (msg.content.startsWith(prefix + `unmute`)) {
            unmuted(msg, guild, botlog);
        }
        if (msg.content.startsWith(prefix + `event`)) {
            events(msg, channelev);
        }


    }
});







//Зона функций
/**
 * 
 * @param {Discord.Message} msg 
 */
function events(msg, channelev) {
    let args = getArguments(msg.content);
    let timeArgs = args[1];
    let time = timeArgs.slice(1, timeArgs.length - 1);
    let eventNameArgs = args[2];
    let eventName = eventNameArgs.slice(1, eventNameArgs.length - 1);

    setTimeout(() => channelev.send(`@everyone Напоминаю про игру! в ${time} по МСК!`), getNotificationTimeout(time, 30));
    setTimeout(() => channelev.send(`@everyone Напоминаю про игру! в ${time} по МСК!`), getNotificationTimeout(time, 10));
    setTimeout(() => channelev.send(`@everyone Напоминаю про игру! в ${time} по МСК!`), getNotificationTimeout(time, 5));

    channelev.send(`@everyone Обьявлена игра!\r\n${eventName}\r\nНа: ${time} по МСК!`);
}

function getNotificationTimeout(time, beforeMinutes) {
    let targetDate = new Date();
    let HMS = time.split(':');
    targetDate.setHours(HMS[0]);
    targetDate.setMinutes(HMS[1] - beforeMinutes);
    targetDate.setSeconds(HMS[2]);

    if (targetDate < new Date())
        targetDate = new Date(targetDate.getDate() + 1);

    let dateDiff = targetDate - new Date();
    return dateDiff;
}



function unmuted(msg, guild, botlog) {
    let user = msg.mentions.users.first();
    let args = getArguments(msg.content);
    if (user) {
        let findUser = guild.members.cache.find(member => member.id == user.id);
        if (findUser) {
            let mutedRole = guild.roles.cache.find(role => role.name == `mute`);
            if (mutedRole) {
                findUser.roles.remove(mutedRole);
                findUser.voice.setMute(false);
                if (args[2] != undefined) {
                    botlog.send(`Мьют снят с пользователя: ${user}\r\nСнял: ${msg.author}\r\nПричина: ${args[2]}`);
                } else { botlog.send(`Мьют снят с пользователя: ${user}\r\nСнял: ${msg.author}`) };
            } else { msg.reply(`Отсутствует роль 'mute'`) };
        } else { msg.reply(`Данный юзер отсутствует на сервере!`) };
    } else { msg.reply(`Не указан юзер`) }
}

function getUser(msg, botlog) {
    let args = msg.content.split(' ');
    let findUser = (`./database/users/${args[1]}`);
    let listing = fs.readdirSync("./database/users", `utf-8`);
    let find = false;
    if (find == false) {
        for (let i = 0; i < listing.length; i++) {
            if (findUser == `./database/users/${listing[i]}`) {
                let cacheUser = fs.readFileSync(findUser).toString();
                let users = JSON.parse(cacheUser);
                botlog.send(`Информация о пользователе ${users.user}\r\n ID пользователя: ${users.id}\r\n Click ID: <@${users.id}>\r\n Зарегистрирован: ${users.created_at}\r\n Аватар пользователя: ${users.avatarURL}\r\n Тэг пользователя: ${users.user_tag}`);
                find = true;
            }
        }
    } if (find == false) { botlog.send(`Пользователь не найден! проверьте базу или правильность написания команды!`) }
}

function userslist(msg, botlog) {
    let listing = fs.readdirSync("./database/users", `utf-8`);
    for (let i = 0; i < listing.length; i++) {
        let findUser = (`./database/users/${listing[i]}`);
        let cacheUser = fs.readFileSync(findUser).toString();
        let users = JSON.parse(cacheUser);
        botlog.send(`get` + ` ` + listing[i] + `\r\n Nickname: ${users.user}\r\n ID: ${users.id}\r\n ClickID: <@${users.id}>\r\n UserTag ${users.user_tag}\r\n .`);
    }
};

function info(msg, botlog) {
    let user = msg.mentions.users.first();
    if (user) {
        let userID = user.id;
        const embed = new MessageEmbed()
            .setImage(user.displayAvatarURL())
            .setAuthor(`Вызвал команду ${msg.author.username}`)
            .setTitle(`Информация о ${user.username}`)
            .addField(`ID:`, `<@${userID}> ${userID}`)
            .addField(`Регистрация:`, `${user.createdAt}`)
            .addField(`ТЭГ:`, `${user.tag}`)
            .setColor(0xff0000);
        botlog.send(embed);
    } else { botlog.send(`Текущего юзера нету на сервере, воспользуйтесь командой !infoID или запросите базу данных`) }
}

function muted(msg, guild, botlog) {
    let user = msg.mentions.users.first();
    let args = getArguments(msg.content);
    if (user) {
        let findUser = guild.members.cache.find(member => member.id == user.id);
        if (findUser) {
            let mutedRole = guild.roles.cache.find(role => role.name == `mute`);
            if (mutedRole) {
                findUser.roles.add(mutedRole);
                findUser.voice.setMute(true);
                if (args[2] != undefined) {
                    botlog.send(`Выдан мьют пользователю: ${user}\r\nМьют выдан пользователем: ${msg.author}\r\nПричина: ${args[2]}`);
                } else { botlog.send(`Выдан мьют пользователю: ${user}\r\nМьют выдан пользователем: ${msg.author}`) };
            } else { msg.reply(`Отсутствует роль 'mute'`) };
        } else { msg.reply(`Данный юзер отсутствует на сервере!`) };
    } else { msg.reply(`Не указан юзер`) }
}

/**
 * Splits the complex input command to the logical words and phrases
 * @param {string} command Clear command without prefixes
 */
function getArguments(command) {
    // Splits the complex input command to the logical words and phrases
    // 'clear "typical complex" sooqa' => ["clear", "typical complex", "sooqa"]
    const pattern = /("{1}[^"]*"{1}|-{1,2}\w+|\w+)/ig;

    let arguements = command.match(pattern);
    return arguements;
}


function userDataSave(member) {
    let username = member.displayName;
    let userID = member.id;
    let createdAt = member.user.createdAt; //
    let userTag = member.user.tag; //
    let userAvatar = member.user.displayAvatarURL(); //
    let newUser = { user: username, id: userID, created_at: createdAt, avatarURL: userAvatar, user_tag: userTag };
    fs.writeFileSync(`./database/users/${userID}.json`, JSON.stringify(newUser));

}

function hardDeleted(args1, msg) {
    if (args1 > 100) {
        msg.reply("Слишком большое значение! можно удалять не больше 100 сообщений за раз!")
            .then(message => setTimeout(() => message.delete(), 3000))
            .catch(console.error)
    } else {
        msg.channel.bulkDelete(args1);
        msg.channel.send(`Удалено ${args1} сообщений!`)
            .then(message => setTimeout(() => message.delete(), 1000))
            .catch(console.error)
    }

}
/**
 * 
 * @param {Discord.Message} message 
 */
function about(message) {
    let serverembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(message.author.defaultAvatarURL)
        .addField("Server Name", message.guild.name)
        .addField("Bot Name", message.client.user.username)
        .addField("Bot version", "1.0.0")
        .addField("Created On", message.client.user.createdAt);

    message.channel.send(serverembed);
}

client.login(token);