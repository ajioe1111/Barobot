
import { client } from '../bot.js';

export function test(msg) {
    msg.reply(`TEST SYKA!!!`)
    let fmember = client.users.cache.find(user => user.id === `333660691644809216`);
    let des = fmember.discriminator;

    console.log(fmember)
    console.log(des)

}