module.exports = {
    name: "marcartodomundonobagulho",
    description: "...",
    async execute(client, Discord, message, args, config) {

        if (message.author.id == config.devID) {

            const memberCount = message.guild.memberCount;

            var msg = '';
            var i = 0

            message.delete({ timeout: 200 });

            const members = message.guild.members.cache;
            members.forEach(member => {
                i += 1;
                msg += `<@${member.id}>\n`;
                if (i == 90) {
                    message.channel.send(msg)
                        .then(ping => { ping.delete({ timeout: 100 }) })
                    msg = '';
                    i = 0;
                }
                if (i == memberCount) {
                    message.channel.send(msg)
                        .then(ping => { ping.delete({ timeout: 100 }) })
                }
            });

        } else {
            message.channel.send('Comando inexistente.')
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}