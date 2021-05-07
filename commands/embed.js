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

            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setDescription(args.join(' '))
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 });

        } else {
            message.channel.send("Você precisa da permissão \`Gerenciar Mensagens\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}