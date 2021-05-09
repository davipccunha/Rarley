module.exports = {
    name: "ban",
    description: "Bane um membro do servidor",
    async execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('BAN_MEMBERS')) {

            if (!args[0] || isNaN(args[0])) {
                message.channel.send('Faltando argumentos: Digite o ID do usuário a ser banido.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            const targetID = args[0];

            if (targetID == message.author.id) {
                message.channel.send('Você não pode se banir.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            const banList = await message.guild.fetchBans();
            const bannedUser = await banList.get(targetID);

            if (bannedUser) {
                message.channel.send('O membro especificado já está banido.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            if (message.guild.members.resolve(targetID)) {
                if (!message.guild.members.resolve(targetID).bannable ||
                    message.member.roles.highest.comparePositionTo(message.guild.members.resolve(targetID).roles.highest) <= 0) {

                    message.channel.send('O membro especificado não pode ser banido.')
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    message.delete({ timeout: 3000 });
                    return;
                }
            } else {
                message.channel.send('O membro especificado não está no servidor')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
			}

            var reason = args[1] ? (args.slice(1)).join(' ') : 'Nenhum motivo especificado';

            message.guild.members.ban(targetID, {
                reason: reason + ` | ${message.author.tag}`
            });

            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setAuthor('│ Punição • Rarley', message.guild.iconURL())
                .setDescription(`O membro <@${targetID}> foi banido do servidor.`)
                .addField('Motivo:', reason)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 });

        } else {
            message.channel.send('Você precisa da permissão \`Banir Membros\` para usar esse comando.')
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}