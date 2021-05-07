module.exports = {
    name: "unmutech",
    description: "Desmuta um canal",
    async execute(client, Discord, message, args, config) {

        if (message.member.hasPermission('MANAGE_CHANNELS')) {

            // var isMuted = message.channel.permissionOverwrites.get(everyoneRole.id).allow.bitfield;
            var everyoneRole = message.guild.roles.cache.find(r => r.name === "@everyone");
            var channel = message.mentions.channels.first();

            if (!channel) {
                channel = message.channel;
            }

            channel.overwritePermissions(
                [
                    {
                        id: everyoneRole.id,
                        allow: ['SEND_MESSAGES'],
                    }
                ]);

            channel.send(new Discord.MessageEmbed()
                .setColor('#66FF33')
                .setTitle('| Canal liberado')
                .setDescription(`Este canal foi liberado para que todos enviem mensagens.`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                .setTimestamp());
            message.delete({ timeout: 50 });

        } else {
            message.channel.send('Você precisa da permissão \`Gerenciar Canais\` para usar esse comando.')
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}