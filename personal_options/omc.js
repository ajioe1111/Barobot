
// eslint-disable-next-line no-unused-vars
import * as Discord from 'discord.js'
import * as fs from 'fs';


/**
 * 
 * @param {Discord.GuildMember} member 
 */

export function roleCheck(member) {
    if (member.roles.cache.find(role => role.id == `800354072040308747`)) 
    {
        let userFindId = member.id;
        if (fs.existsSync(`./database/users/${userFindId}.json`)) {
            let path = `./database/users/${userFindId}.json`;
            let cacheUser = fs.readFileSync(path).toString();
            let users = JSON.parse(cacheUser);
            if (users.omcCorpus == false) {
                console.log(`${member} update corpus role!`)
                member.send(`Поздравляю с повышением на ${member.guild.name}! Получив звание "Старший матрос" вы должны выбрать один из корпусов ОМФ.`)
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Выбор корпуса!`)
                    .setDescription(`Флот ОМФ делится на 5 корпусов.`)
                    .addFields(
                        { name: '1 корпус ОМФ.', value: 'Занимается поддержкой и обеспечением плацдарма на границе ВЭК и перебросом судов через границу. Специализируются на быстрых диверсионных операциях и заметании следов присутствия ОМС.' },
                        { name: '2 корпус ОМФ.', value: 'Занимается обороной и обеспечением безопасности на территории вод ОМС. Специализируются на уничтожении фауны Европы и противодействии наиболее опасным тварям.' },
                        { name: '3 корпус ОМФ.', value: 'Занимается захватом и приобретением судов, технологий и вооружения ВЭК. Командование 3 корпуса имеет в своём распоряжении огромную агентурную сеть и активно взаимодействует с 5 корпусом. Специализируются на проведении глубоких тыловых операций и проведении абордажных атак.' },
                        { name: '4 корпус ОМФ.', value: 'Занимается прямым противодействием ВЭК, в их задачи входит нанесение как можно более серьёзного ущерба ключевым объектам ВЭК. Боевые столкновения между силами ВЭК и ОМС чаще всего происходят при непосредственном участии 4 корпуса, так же многие мятежники называют 4 корпус - корпусом смертников, туда попадают самые отчаянные. Специализируются на активных боевых действиях и суицидальных атаках с нанесением максимального ущерба.' },
                        { name: '5 корпус ОМФ.', value: 'Занимается вербовкой новых членов в ряды ОМС, поиском дезертиров, а так же сбором информации, по сути 5 корпус является обширной агентурной сетью и именно их стараниями, мятежные и дезертировавшие капитаны находят дорогу к ОМС. Специализируется на сборе информации, вербовке, проведении тайных операций и активном шпионаже.' },
                    )
                    .addField(`Выбор важен.`, `Напишите в чате цифру которая равняется номеру корпуса в который вы хотите вступить!`)
                    .setColor(0xE02AC4)
                member.send(embed);
                users.omcCorpusGranted = true;
                fs.writeFileSync(path, JSON.stringify(users));

            }
        }
        else { return; }
    }
}
/**
 * 
 * @param {Discord.Message} msg 
 */
export function omcMSGChecker(msg, client) {
    let userId = msg.author.id;
    if (fs.existsSync(`./database/users/${userId}.json`)) {
        let path = `./database/users/${userId}.json`;
        let cacheUser = fs.readFileSync(path).toString();
        let users = JSON.parse(cacheUser);
        if (users.omcCorpusGranted == true) {
            let num = msg.content;
            let repMsg = `Отличный выбор! так держать!`;
            switch (num) {
                case `1`:
                    addRoleOmc(userId, `800352957714661386`, client)
                    msg.reply(repMsg)
                    break;
                case `2`:
                    addRoleOmc(userId, `800353145640189962`, client)
                    msg.reply(repMsg)
                    break;
                case `3`:
                    addRoleOmc(userId, `800353365460647956`, client)
                    msg.reply(repMsg)
                    break;
                case `4`:
                    addRoleOmc(userId, `800353440655081473`, client)
                    msg.reply(repMsg)
                    break;
                case `5`:
                    addRoleOmc(userId, `800353512239398952`, client)
                    msg.reply(repMsg)
                    break;
                default:
                    msg.reply(`Вам нужно указать число от 1 до 5!`)
                    return;
                    
            }
            users.omcCorpus = true;
            users.omcCorpusGranted = false;
            fs.writeFileSync(path, JSON.stringify(users));
            console.log(`${msg.author} updating corpus role!`);

        }
    }
}

/**
 * 
 * @param {Discord.User} user 
 */
function addRoleOmc(user, roleId, client) {
    let guild = `799302316984762438`;
    let fGuild = client.guilds.cache.find(guildFind => guildFind.id == guild);
    let fMember = fGuild.member(user)
    fMember.roles.add(roleId);
}