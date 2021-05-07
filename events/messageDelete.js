module.exports = {
    name: "messageDelete",
    async execute(client, Discord, config, message, prefix) {

        // Logs
        const server = config.guilds.harley.id;

        if (!message.author) return
        if (message.author.bot || message.channel.type == 'dm') return;

        const channel = message.guild.id == config.guilds.harley.id ? client.guilds.resolve(server).channels.resolve(config.guilds.harley.channels.logs) : client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logs);

        if (message.attachments.first()) {
            if (!message.content) {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem deletada')
                    .addField('Mensagem original:', message.attachments.first().proxyURL)
                    .addField('Canal:', `<#${message.channel.id}>`)
                    .setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            } else {
                if (message.content.length > 1024) {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem deletada')
                        .addField('Mensagem original:', `${message.content.slice(0, 1024)}`)
                        .addField('Atenção:', 'A mensagem  original é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui.')
                        .addField('Mídia: ', message.attachments.first().proxyURL)
                        .addField('Canal:', `<#${message.channel.id}>`)
                        .setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());

                } else {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem deletada')
                        .addField('Mensagem original:', `${message.content}`)
                        .addField('Mídia: ', message.attachments.first().proxyURL)
                        .addField('Canal:', `<#${message.channel.id}>`)
                        .setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());
                }
            }

        } else {
            if (message.content.length > 1024) {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem deletada')
                    .addField('Mensagem original:', `${message.content.slice(0, 1024)}`)
                    .addField('Atenção:', 'A mensagem  original é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui.')
                    .addField('Canal:', `<#${message.channel.id}>`)
                    .setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            } else {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem deletada')
                    .addField('Mensagem original:', message.content)
                    .addField('Canal:', `<#${message.channel.id}>`)
                    .setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
            }
        }
    }
}