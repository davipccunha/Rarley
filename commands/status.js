module.exports = {
    name: "status",
    description: "Mostra informações sobre o servidor do Minecraft da Rede Harley",
    async execute(client, Discord, message, args, config) {

        const request = require('request')

        const mcIP = config.minecraftIP;
        const url = "https://api.mcsrvstat.us/ping/" + mcIP;

        request(url, function (err, reponse, body) {

            if (err) {
                console.error(err);
            }

            const json = JSON.parse(body);
            const mine = "" + json;

            if (!mine.startsWith('Failed')) {

                var playersOn = json.players.online;
                var playersMax = json.players.max;

                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setTitle(`| IP: ${mcIP}`)
                    .setDescription(`Status: \`Online\`\n${playersOn}/${playersMax} jogadores`)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            } else {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setTitle(`| IP: ${mcIP}`)
                    .setDescription(`Status: \`Offline\``)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            }

        })

        message.delete({ timeout: 50 });
    }
}