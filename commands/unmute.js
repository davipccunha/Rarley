module.exports = {
    name: "unmute",
    description: "Desmuta um membro que estava mutado",
    execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('MANAGE_ROLES')) {

            if (!args[0] || isNaN(args[0])) {
                message.channel.send('Faltando argumentos: Digite o ID do membro a ser mutado.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            const target = message.guild.members.resolve(args[0])
            const muteRole = config.guilds.harley.roles.mute;

            if (!target) {
                message.channel.send('O membro especificado não está no servidor')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            if (!target.roles.cache.has(muteRole)) {
                message.channel.send('O membro especificado não está mutado.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            target.roles.remove(muteRole);
            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setTitle('│ Punição • Rede Harley')
                .setDescription(`O membro <@${target.id}> foi desmutado.`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 });

        } else {
            message.channel.send("Você precisa da permissão \`Gerenciar Cargos\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}