module.exports = {
    name: "guildMemberRemove",
    async execute(client, Discord, config, member) {

        //Auto message

        if (member.guild.id === config.guilds.equipe.id) {

            client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.changelog).send(new Discord.MessageEmbed()
                .setColor(client.guilds.resolve(config.guilds.equipe.id).member(client.user).displayHexColor)
                .setAuthor('│ Changelog • Equipe', member.guild.iconURL())
                .setDescription(`<@${member.id}> se retirou ou foi removido da equipe.`)
                /*.setFooter(client.user.username, client.guilds.resolve(config.guilds.equipe.id).iconURL())
                .setTimestamp()*/);
        }
        if (!client.guilds.resolve(config.guilds.rarley.id).members.resolve(member.id)) return;

        client.guilds.resolve(config.guilds.rarley.id).members.resolve(member.id).roles.set([config.guilds.rarley.roles.membro]);
    }
}