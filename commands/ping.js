module.exports = {
    name: "ping",
    description: "Mostra o ping do bot e da API discord.js",
    async execute(client, Discord, message, args, config) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const ping = Date.now() - message.createdTimestamp;
            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setAuthor(`| Latência do bot`, message.guild.iconURL())
                    .setDescription(`Ping do Bot: ${ping}ms\nPing da API: ${Math.round(client.ws.ping)}ms`)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
            message.delete({ timeout: 50 });
        } else {
            message.channel.send("Você precisa da permissão \`Administrador\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}