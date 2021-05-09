module.exports = {
    name: "clear",
    description: "Limpa uma quantidade específica de mensagens",

    async execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            const n = args.join(' ');

            if (!n) {
                message.channel.send("Faltando argumentos: Insira a quantidade de mensagens a serem deletadas (1 a 100)")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            if ((n < 1 || n > 100) || (n % 1 != 0) || isNaN(n)) {
                message.channel.send("A quantidade deve ser um número inteiro de 1 a 100")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            await message.channel.messages.fetch({ limit: n })
                .then(msgs => { message.channel.bulkDelete(msgs); });

            message.channel.send(new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setAuthor('| Canal limpado', message.guild.iconURL())
                .setDescription(`Foram deletadas as **${n}** últimas mensagens`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                .setTimestamp())

        } else {
            message.channel.send("Você precisa da permissão \`Gerenciar mensagens\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}