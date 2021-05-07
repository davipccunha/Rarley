module.exports = {
    name: "mutech",
    description: "Muta um canal",
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
                        deny: ['SEND_MESSAGES'],
                    },
                    {
                        id: config.guilds.harley.roles.admin,
                        allow: ['SEND_MESSAGES']
                    }
                ]);

            channel.send(new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('| Canal silenciado')
                .setDescription(`Este canal foi silenciado. Somente a equipe superior pode digitar no mesmo.`)
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