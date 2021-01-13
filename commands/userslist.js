import * as fs from 'fs';

export function userslist(botlog) {
    let listing = fs.readdirSync("./database/users", `utf-8`);
    for (let i = 0; i < listing.length; i++) {
        let findUser = (`./database/users/${listing[i]}`);
        let cacheUser = fs.readFileSync(findUser).toString();
        let users = JSON.parse(cacheUser);
        botlog.send(`get` + ` ` + listing[i] + `\r\n Nickname: ${users.user}\r\n ID: ${users.id}\r\n ClickID: <@${users.id}>\r\n UserTag ${users.user_tag}\r\n .`);
    }
}