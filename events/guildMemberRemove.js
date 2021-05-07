module.exports = {
    name: "guildMemberRemove",
    async execute(client, Discord, config, member) {

        //Auto message
        if (member.guild.id === config.guilds.equipe.id) {
            client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.changelog).send(new Discord.MessageEmbed()
                .setColor(client.guilds.resolve(config.guilds.equipe.id).member(client.user).displayHexColor)
                .setTitle('│ Changelog • Equipe')
                .setDescription(`<@${member.id}> se retirou ou foi removido da equipe.`)
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp());
        }
    }
}