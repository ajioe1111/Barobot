

export function dice (msg) {
    let randomNumber = Math.floor(Math.random() * 100 );
    msg.reply(`Вам выпало число **${randomNumber}**`);
}