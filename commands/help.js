module.exports = {
    name: "help",
    description: "Envia todos os comandos disponíveis",
    async execute(client, Discord, message, args, commands, config) {

        const fs = require('fs');
        var helptxt = "";

        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            if (file == 'marcartodomundonobagulho.js') continue;

            helptxt += `\`${config.prefix}${commands.get(`${file.replace('.js', '')}`).name}\` - ${commands.get(`${file.replace('.js', '')}`).description}\n`;
        }

        message.channel.send(new Discord.MessageEmbed()
            .setColor(message.guild.member(client.user).displayHexColor)
            .setAuthor('| Comandos • Rede Harley', message.guild.iconURL())
            .setDescription(helptxt)
            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
            .setTimestamp());
        message.delete({ timeout: 50 });
    }
}