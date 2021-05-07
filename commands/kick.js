module.exports = {
    name: "kick",
    description: "Expulsa um membro do servidor",
    async execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('KICK_MEMBERS')) {

            const target = message.mentions.members.first();

            if (!target) {
                message.channel.send('Faltando argumentos: Mencione o membro a ser expulso. (Certifique-se de que o membro está no servidor)')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }
            
            if (!target.kickable) {
                message.channel.send('O membro especificado não pode ser expulso.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            var reason = args[1] ? (args.slice(1)).join(' ') : 'Nenhum motivo especificado';

            target.kick(reason);
            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setTitle('│ Punição • Rede Harley')
                .setDescription(`O membro <@${target.id}> foi expulso do servidor.`)
                .addField('Motivo:', reason)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 });

        } else {
            message.channel.send('Você precisa da permissão \`Expulsar Membros\` para usar esse comando.')
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}