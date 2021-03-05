import { getArguments } from "../../service/getArguments.js";
import * as fs from 'fs';
import * as Discord from 'discord.js';
import { client } from '../../bot.js'

function getEventPath(id) {
    const eventFolder = './events';
    return `${eventFolder}/${id}.json`;
}

export function newEvents(msg) {
    let findGuild = client.guilds.cache.find(guild => guild.id === `787699629944864839`);  //789579914869080074
    let eventChannel = findGuild.channels.cache.find(channel => channel.id === `796835450211532800`);  //796803203835887657
    let errorMsg = `Ошибка: Отсутствует один из аргументов либо написано неверно.`;
    let args = getArguments(msg.content);
    if (args[1] === `add`) {
        //блок создания ивента
        if (args[2] !== undefined && args[3] !== undefined && args[4] !== undefined) {
            let serverName = args[2];
            let date = args[3];
            let targetDate = date.slice(1, date.length - 1);
            let desc = args[4];
            let description = desc.slice(1, desc.length - 1);
            let imageUrl;
            if (args[5] == undefined) {
                imageUrl = `https://media.discordapp.net/attachments/573490270025416714/817374035171344436/maxresdefault.jpg?width=897&height=504`;
            } else {
                let image = args[5];
                imageUrl = image.slice(1, image.length - 1);
            }
            let eventId = 1;
            let path = getEventPath(eventId);
            while (fs.existsSync(path))
                path = getEventPath(++eventId);
            let event = {
                eventServer: serverName,
                eventDate: targetDate,
                eventDescription: description,
                eventId: eventId,
                eventImage: imageUrl,
                eventAuthor: msg.author.id
            }
            fs.writeFileSync(path, JSON.stringify(event));
            const addEventEmbed = new Discord.MessageEmbed()
                .setTitle(`Назначена игра!`)
                .setDescription(`постарайтесь не опаздывать`)
                .setImage(imageUrl)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setColor(0x3CFF00)
                .addFields(
                    { name: `Сервер`, value: serverName },
                    { name: `Дата и время проведения игры`, value: `**${targetDate}**` },
                    { name: `Описание`, value: description },
                )
            eventChannel.send(`@everyone`, addEventEmbed);
            msg.author.send(`Ивент создан. Его ID ${eventId}. Используйте его для редактирования или удаления ивента.`);

        } else { msg.reply(errorMsg); console.log(args) }
    }
    else if (args[1] === `delete`) {
        //блок удаления ивента
    }
    else if (args[1] === `update`) {
        //блок редактирования ивента
    }
    else { msg.reply(`Я не понимаю что вы хотите. Я знаю лишь команды (add) (delete) (update).`) }
}