const ms = require('ms');
module.exports = {
    name: "mute",
    description: "Proibe que um membro fale ou envie mensagens",
    execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('MANAGE_ROLES')) {

            if (!args[0] || isNaN(args[0])) {
                message.channel.send('Faltando argumentos: Digite o ID do membro a ser mutado.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            const target = message.guild.members.resolve(args[0])
            const muteRole = config.guilds.rarley.roles.mute;

            if (!target) {
                message.channel.send('O membro especificado não está no servidor')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            if (target.roles.cache.has(muteRole)) {
                message.channel.send('O membro especificado já está mutado.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            if (!args[1]) {
                target.roles.add(muteRole);
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setTitle('│ Punição • Rarley', message.guild.iconURL())
                    .setDescription(`O membro <@${target.id}> foi mutado por tempo indeterminado.`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
                message.delete({ timeout: 50 });

            } else {
                if (isNaN(args[1].slice(0, -1))) {
                    message.channel.send('Erro: O tempo deve ser um número.')
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    message.delete({ timeout: 3000 });
                    return;
                }

                target.roles.add(muteRole);
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setAuthor('│ Punição • Rarley', message.guild.iconURL())
                    .setDescription(`O membro <@${target.id}> foi mutado por ${ms(ms(args[1]))}.`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
                message.delete({ timeout: 50 });
                setTimeout(function () {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor(message.guild.member(client.user).displayHexColor)
                        .setAuthor('│ Punição • Rarley')
                        .setDescription(`O membro <@${target.id}> foi desmutado.`, message.guild.iconURL())
                        .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                        .setTimestamp());
                    target.roles.remove(muteRole);
                }, ms(args[1]));
            }

        } else {
            message.channel.send("Você precisa da permissão \`Gerenciar Cargos\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}