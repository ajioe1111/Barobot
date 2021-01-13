
import * as fs from 'fs';

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
                botlog.send(`Информация о пользователе ${users.user}\r\n ID пользователя: ${users.id}\r\n Click ID: <@${users.id}>\r\n Зарегистрирован: ${users.created_at}\r\n Аватар пользователя: ${users.avatarURL}\r\n Тэг пользователя: ${users.user_tag}`);
                find = true;
            }
        }
    } if (find == false) { botlog.send(`Пользователь не найден! проверьте базу или правильность написания команды!`) }
}
