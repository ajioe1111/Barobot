const Discord = require('discord.js');
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

//Когда зашел новый юзер
client.on('guildMemberAdd', member => {
    let botlog = client.channels.cache.find(channel => channel.name == "bot-log");
    console.log(`New member joined ${member}`)
    let cachePath = `./database/users/${member.id}.json`
    if (fs.existsSync(cachePath) == true) {
        botlog.send(`${member.displayName} уже был на сервере! его ID ${member.id} (<@${member.id}>)`)
    }
    else {
        userDataSave(member);
        botlog.send(`Зашел новый Юзер! <@${member.id}>`)
    }
})

//Когда пришло сообщение
client.on('message', msg => {
    let guild = msg.guild;
    let guildMember = guild.members.cache.find(member => member.user.id == msg.author.id);
    let userPermission = guildMember.hasPermission("ADMINISTRATOR");
    if (userPermission) {
        let botlog = client.channels.cache.find(channel => channel.name == "bot-log");
        //Удаляет N сообщения из чата где введена команда.
        if (msg.content.startsWith(prefix + 'clear')) {
            let args = msg.content.split(' ');
            hardDeleted(args[1], msg);
        };
        //Выводит информацию о боте.
        if (msg.content === prefix + 'bot') {
            about(msg);
        };
        if (msg.content.startsWith(prefix + 'test')) {
            let user = msg.mentions.users.first();
            console.log(user.createdAt)
        }
        //Выводит информацию о пользователе ВНЕ база дынных.
        if (msg.content.startsWith(prefix + 'info')) {
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
        //Выводит базу данных.
        if (msg.content.startsWith(prefix + `userslist`)) {
            let listing = fs.readdirSync("./database/users", `utf-8`);
            for (let i = 0; i < listing.length; i++) {
                let findUser = (`./database/users/${listing[i]}`);
                let cacheUser = fs.readFileSync(findUser).toString();
                let users = JSON.parse(cacheUser);
                botlog.send(listing[i] + `\r\n Nickname: ${users.user}\r\n ID: ${users.id}\r\n ClickID: <@${users.id}>\r\n UserTag ${users.user_tag}\r\n .`);

            }
        }
        //Выводит информацию по ID пользователя из базы.
        if (msg.content.startsWith(prefix + `get`)) {
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
            } if (find == false) { botlog.send(`Пользователь не найден! проверьте базу или правильность написания команды!`)}
        }
    } else { msg.reply(`Недостаточно прав`) }
});







//Зона функций

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
    msg.channel.bulkDelete(args1);
    msg.channel.send(`Удалено ${args1} сообщений!`)
        .then(message => setTimeout(() => message.delete(), 1000))
        .catch(console.error)

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
        .addField("Created On", message.client.user.createdAt);

    message.channel.send(serverembed);
}

client.login(token);