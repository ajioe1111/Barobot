

export function clear(msg) {
    let args = msg.content.split(' ')
    let args1 = args[1];
    if (args1 > 100) {
        msg.reply("Слишком большое значение! можно удалять не больше 100 сообщений за раз!")
            .then(message => setTimeout(() => message.delete(), 3000))
            .catch(console.error)
    }
    if (args1 <= 0) {
        msg.reply("Слишком маленькое значение!")
            .then(message => setTimeout(() => message.delete(), 3000))
            .catch(console.error)
    } else {
        msg.channel.bulkDelete(args1);
        msg.channel.send(`Удалено ${args1} сообщений!`)
            .then(message => setTimeout(() => message.delete(), 1000))
            .catch(console.error)
    }

}