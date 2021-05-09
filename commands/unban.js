module.exports = {
    name: "unban",
    description: "Desbane um membro do servidor",
    async execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('BAN_MEMBERS')) {

            if (!args[0] || isNaN(args[0])) {
                message.channel.send('Faltando argumentos: Digite o ID do usuário a ser desbanido.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            const targetID = args[0];

            const banList = await message.guild.fetchBans();
            const bannedUser = await banList.get(targetID);

            if (!bannedUser) {
                message.channel.send('O membro especificado não está banido.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            message.guild.members.unban(targetID);

            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setAuthor('│ Punição • Rarley', message.guild.iconURL())
                .setDescription(`O membro <@${targetID}> foi desbanido do servidor.`)
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