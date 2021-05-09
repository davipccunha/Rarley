module.exports = {
    name: "status",
    description: "Mostra informações sobre o servidor do Minecraft do Rarley",
    async execute(client, Discord, message, args, config) {

        const request = require('request')

        const mcIP = config.minecraftIP;
        const url = "https://api.mcsrvstat.us/2/" + mcIP;

        message.delete({ timeout: 50 });

        request(url, function (err, reponse, body) {

            if (err) {
                console.error(err);
            }

            const json = JSON.parse(body);
            const mine = "" + json;

            if (!mine.startsWith('Failed') && json.online) {

                var playersOn = json.players.online;
                var playersMax = json.players.max;

                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setAuthor(`| IP: ${mcIP}`, message.guild.iconURL())
                    .setDescription(`Status: \`Online\`\n${playersOn}/${playersMax} jogadores`)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            } else {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setAuthor(`| IP: ${mcIP}`, message.guild.iconURL())
                    .setDescription(`Status: \`Offline\``)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
            }

        })
    }
}