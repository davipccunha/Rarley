module.exports = {
    name: "info",
    description: "Mostra informações sobre o bot",
    async execute(client, Discord, message, args, config, package) {

        message.channel.send(new Discord.MessageEmbed()
            .setColor(message.guild.member(client.user).displayHexColor)
            .setAuthor(`│ Info • Bot • Rarley`, message.guild.iconURL())
            .setDescription(`**Versão:** ${package.version}
            **Feito por** <@${config.devID}>.
            
            O bot está em uma versão inicial de desenvolvimento e, portanto, pode conter bugs.
            
            Caso encontre algum bug ou tenha alguma dúvida, contate <@${config.devID}>.`)
            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
            .setTimestamp());
    }
}