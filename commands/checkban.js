module.exports = {
    name: "checkban",
    description: "Checa se um usuário está banido ou não do servidor",
    async execute(client, Discord, message, args, config) {

        if (!args[0] || (!message.mentions.members.first() && isNaN(args[0]))) {
            message.channel.send('Faltando argumentos: Digite o ID ou mencione o usuário para checar se está banido.')
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
            return;
        }

        const targetID = message.mentions.members.first() ? message.mentions.users.first().id : args[0];

        const banList = await message.guild.fetchBans();
        const bannedUser = await banList.get(targetID);

        if (bannedUser) {
            var reason = bannedUser.reason;

            reason = reason ? reason : "Nenhum motivo informado"
            reason = reason.replace(' | ', '♪');
            reason = reason.split('♪');

            reason[1] = reason[1] ? reason[1] : "Sem autor especificado";

            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setAuthor('│ Ban info • Rarley', message.guild.iconURL())
                .setDescription(`O usuário <@${targetID}> está banido.`)
                .addField('Motivo:', reason[0])
                .addField('Autor:', reason[1])
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 })

        } else {
            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setAuthor('| Ban info • Rarley', message.guild.iconURL())
                .setDescription(`O usuário <@${targetID}> não está banido do servidor.`)
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 });
        }
    }
}