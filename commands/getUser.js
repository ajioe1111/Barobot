
import * as fs from 'fs';
import * as Discord from 'discord.js';

export function getUser(msg, botlog) {
    let args = msg.content.split(' ');
    let findUser = (`./database/users/${args[1]}`);
    let listing = fs.readdirSync("./database/users", `utf-8`);
    let find = false;
    if (find == false) {
        for (let i = 0; i < listing.length; i++) {
            if (findUser == `./database/users/${listing[i]}`) {
                let cacheUser = fs.readFileSync(findUser).toString();
                let users = JSON.parse(cacheUser);
                const getUserEmbedded = new Discord.MessageEmbed()
                .setTitle(`Информация о юзере`)
                .setDescription(`Информация из базы данных.`)
                .setColor(0x0099ff)
                .setThumbnail(`${users.avatarURL}`)
                .addFields(
                    {
                        name: `Имя пользователя`,
                        value: `${users.user}`,
                    },
                    {
                        name: `ID пользователя`,
                        value: `${users.id}`,
                        inline: true,
                    },
                    {
                        name: `Click ID`,
                        value: `<@${users.id}>`,
                        inline: true,
                    },
                    {
                        name: `Зарегистрирован`,
                        value: `${users.created_at}`,
                    },
                    {
                        name: `Тэг пользователя`,
                        value: `${users.user_tag}`,
                    },
                    {
                        name: `Зашел на сервер`,
                        value: `${users.joinedAt}`
                    },
                    {
                        name: `Предупреждений на текущий момент`,
                        value: `${users.warnCount}`,
                    },
                    {
                        name: `Банов за лимит предупреждений`,
                        value: `${users.warn_end}`,
                    },
                )
                botlog.send(getUserEmbedded);
                find = true;
            }
        }
    } if (find == false) { botlog.send(`Пользователь не найден! проверьте базу или правильность написания команды!`) }
}
