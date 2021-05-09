module.exports = {
    name: "spoiler",
    description: "Envia um spoiler",
    execute(client, Discord, message, args, config, db, schedule) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

            if (!message.attachments.first()) {
                message.channel.send(`Faltando argumentos: Use o comando na legenda de uma imagem.`)
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            const ch = message.guild.channels.resolve(config.guilds.rarley.channels.spoilers);
            const info = args.join(' ') ? args.join(' ') : ' ';
            const spoiler = message.attachments.first().proxyURL;

            ch.send(new Discord.MessageEmbed()
                .setAuthor(`│ Spoiler • Rarley`, message.guild.iconURL())
                .setColor(message.guild.member(client.user).displayHexColor)
                .setDescription(info)
                .setImage(spoiler)
                .setFooter(client.user.username)
                .setTimestamp())
            message.delete({ timeout: 200 })
            ch.send(`<@&${config.guilds.rarley.roles.spoiler}>`).then(msg => { msg.delete({ timeout: 200 }) });

        } else {
            message.channel.send("Você precisa da permissão \`Administrador\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}