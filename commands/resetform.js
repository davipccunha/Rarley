module.exports = {
    name: "resetform",
    description: "Reseta o cooldown de formulário de um membro específico",

    async execute(client, Discord, message, args, config, fs, db, psm) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

            if (!args[0] || isNaN(args[0])) {
                message.channel.send('Faltando argumentos: Digite o ID do usuário para resetar o cooldown de formulário.')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                message.delete({ timeout: 3000 });
                return;
            }

            if (!db.fetch(`form_${args[0]}`)) {
                return message.channel.send('O membro especificado não possui um formulário aberto')
            }

            db.delete(`form_${args[0]}`);
            message.channel.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setAuthor('| Formulário • Rarley', message.guild.iconURL())
                .setDescription(`Cooldown de formulário de <@${args[0]}> resetado.`));
            message.delete({ timeout: 5000 })
        };
    }
}