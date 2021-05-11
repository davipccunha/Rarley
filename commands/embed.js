module.exports = {
    name: "embed",
    description: "Transforma um texto em embed",
    execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            if (!args.join(' ')) {
                message.channel.send('Faltando argumentos: Digite o texto para o embed.')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            if (args.join(' ').length > 1024) {
                message.channel.send('O texto não pode exceder 1024 caracteres')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            const embed = new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setDescription(`${args.join(' ')}\nㅤ`)
                .setFooter(client.user.username)
                .setTimestamp();

            switch (message.channel.id) {
                case config.guilds.rarley.channels.suporte:
                    embed.setAuthor(`│ Suporte • Rarley`, message.guild.iconURL());
                    break;
                case config.guilds.rarley.channels.formulario:
                    embed.setAuthor(`│ Formulário • Rarley`, message.guild.iconURL());
                    break;
                case config.guilds.rarley.channels.spoilers:
                    embed.setAuthor(`│ Spoilers • Rarley`, message.guild.iconURL());
                    break;
            }

            message.channel.send(embed);
            message.delete({ timeout: 200 });

        } else {
            message.channel.send("Você precisa da permissão \`Gerenciar Mensagens\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}