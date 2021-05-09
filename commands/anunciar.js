module.exports = {
    name: "anunciar",
    description: "Envia um anúncio",
    execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('ADMINISTRATOR')) {
            const ch = message.guild.channels.resolve(config.guilds.rarley.channels.anuncios);

            if (!args.join(' ')) {
                message.channel.send('Faltando argumentos: Digite o texto para anunciar.')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            ch.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setAuthor(`│ Anúncio • Rarley`, message.guild.iconURL())
                .setDescription(args.join(' '))
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                .setTimestamp())
                .then(msg => { msg.react(config.guilds.rarley.emojis.rarley); });
            message.delete();
            ch.send(`<@&${config.guilds.rarley.roles.membro}> @everyone`)
                .then(msg => { msg.delete({ timeout: 50 }); });

        } else {
            message.channel.send("Você precisa da permissão \`Administrador\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}