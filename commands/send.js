module.exports = {
    name: "send",
    description: "Envia uma mensagem pelo bot",
    execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

            const channel = message.mentions.channels.first();

            if (!channel) {
                message.channel.send(`Marque o canal para enviar a mensagem. \`${config.prefix}send #<canal> <mensagem>\``)
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            if (!args[1]) {
                message.channel.send('Faltando argumentos: Digite a mensagem para ser enviada.')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            args.splice(0, 1);

            const msg = args.join(' ');

            if (msg.length > 2000) {
                message.channel.send('O texto não pode exceder 2000 caracteres')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            channel.send(msg);
            message.delete({ timeout: 200 });

        } else {
            message.channel.send("Você precisa da permissão \`Administrador\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}