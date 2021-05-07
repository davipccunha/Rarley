module.exports = {
    name: "sugerir",
    description: "Envia uma sugestão para a votação",

    execute(client, Discord, message, args, config) {

        const concordo = config.guilds.harley.emojis.concordo;
        const discordo = config.guilds.harley.emojis.discordo;

        if (!args.join(' ')) {
            message.channel.send('Faltando argumentos: Você precisa digitar uma sugestão.')
                .then(msg => msg.delete({ timeout: 3000 }));;
            message.delete({ timeout: 3000 });
            return;
        }

        if (args.join(' ').length < 10) {
            message.channel.send('Sugestão curta demais.')
                .then(msg => msg.delete({ timeout: 3000 }));
            message.delete({ timeout: 3000 });
            return;
        }

        message.guild.channels.resolve(config.guilds.harley.channels.sugestao).send(new Discord.MessageEmbed()
            .setColor(message.guild.member(client.user).displayHexColor)
            .setAuthor(`│ Sugestão de ${message.author.username}`, message.guild.iconURL())
            .setDescription(args.join(" "))
            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
            .setTimestamp())
            .then(msg => { msg.react(concordo); msg.react(discordo); })
        message.delete({ timeout: 50 })
        message.channel.send("Sugestão enviada com sucesso")
            .then(msg => { msg.delete({ timeout: 3000 }); });
    }
}