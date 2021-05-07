module.exports = {
    name: "messageUpdate",
    async execute(client, Discord, config, oldMessage, newMessage, prefix) {

        // Logs
        const server = config.guilds.harley.id;

        if (!oldMessage.author) return;

        if (oldMessage.author.bot || oldMessage.channel.type == 'dm') return;

        const channel = oldMessage.guild.id == config.guilds.harley.id ? client.guilds.resolve(server).channels.resolve(config.guilds.harley.channels.logs) : client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logs);

        if (oldMessage.attachments.first()) {
            if (!oldMessage.content) {
                if (newMessage.content.length > 1024) {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                        .addField('Mensagem original:', oldMessage.attachments.first().proxyURL, true)
                        .addField('Mensagem editada:', newMessage.content.slice(0, 1024), true)
                        .addField('Atenção:', `A mensagem editada é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${newMessage.content.length - 1024}) caracteres perdidos`)
                        .addField('Canal:', `<#${oldMessage.channel.id}>`)
                        .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());

                } else {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                        .addField('Mensagem original:', oldMessage.attachments.first().proxyURL, true)
                        .addField('Mensagem editada:', newMessage.content, true)
                        .addField('Canal:', `<#${oldMessage.channel.id}>`)
                        .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());
                }

            } else {
                if (oldMessage.content.length > 1024 && newMessage.content.length > 1024) {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                        .addField('Mensagem original:', oldMessage.content.slice(0, 1024), true)
                        .addField('Mensagem editada:', newMessage.content.slice(0, 1024), true)
                        .addField('Atenção:', `A mensagem  original é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${oldMessage.content.length - 1024}) caracteres perdidos`)
                        .addField('Atenção:', `A mensagem  editada é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${newMessage.content.length - 1024}) caracteres perdidos`)
                        .addField('Mídia: ', oldMessage.attachments.first().proxyURL)
                        .addField('Canal:', `<#${oldMessage.channel.id}>`)
                        .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());

                } else if (oldMessage.content.length > 1024 && newMessage.content.length <= 1024) {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                        .addField('Mensagem original:', oldMessage.content.slice(0, 1024), true)
                        .addField('Mensagem editada:', newMessage.content, true)
                        .addField('Atenção:', `A mensagem original é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${oldMessage.content.length - 1024}) caracteres perdidos`)
                        .addField('Mídia: ', oldMessage.attachments.first().proxyURL)
                        .addField('Canal:', `<#${oldMessage.channel.id}>`)
                        .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());

                } else if (oldMessage.content.length <= 1024 && newMessage.content.length > 1024) {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                        .addField('Mensagem original:', oldMessage.content, true)
                        .addField('Mensagem editada:', newMessage.content.slice(0, 1024), true)
                        .addField('Atenção:', `A mensagem editada é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${newMessage.content.length - 1024}) caracteres perdidos`)
                        .addField('Mídia: ', oldMessage.attachments.first().proxyURL)
                        .addField('Canal:', `<#${oldMessage.channel.id}>`)
                        .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());

                } else {
                    channel.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                        .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                        .addField('Mensagem original:', `${oldMessage.content}`, true)
                        .addField('Mensagem editada:', `${newMessage.content}`, true)
                        .addField('Mídia: ', oldMessage.attachments.first().proxyURL)
                        .addField('Canal:', `<#${oldMessage.channel.id}>`)
                        .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                        .setTimestamp());
                }
            }
        } else {
            if (oldMessage.content.length > 1024 && newMessage.content.length > 1024) {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                    .addField('Mensagem original:', oldMessage.content.slice(0, 1024), true)
                    .addField('Mensagem editada:', newMessage.content.slice(0, 1024), true)
                    .addField('Atenção:', `A mensagem  original é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${oldMessage.content.length - 1024}) caracteres perdidos`)
                    .addField('Atenção:', `A mensagem  editada é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${newMessage.content.length - 1024}) caracteres perdidos`)
                    .addField('Canal:', `<#${oldMessage.channel.id}>`)
                    .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            } else if (oldMessage.content.length > 1024 && newMessage.content.length <= 1024) {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                    .addField('Mensagem original:', oldMessage.content.slice(0, 1024), true)
                    .addField('Mensagem editada:', newMessage.content, true)
                    .addField('Atenção:', `A mensagem original é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${oldMessage.content.length - 1024}) caracteres perdidos`)
                    .addField('Canal:', `<#${oldMessage.channel.id}>`)
                    .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());

            } else if (oldMessage.content.length <= 1024 && newMessage.content.length > 1024) {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                    .addField('Mensagem original:', oldMessage.content, true)
                    .addField('Mensagem editada:', newMessage.content.slice(0, 1024), true)
                    .addField('Atenção:', `A mensagem editada é muito longa. Apenas os 1024 primeiros caracteres são mostrados aqui. (${newMessage.content.length - 1024}) caracteres perdidos`)
                    .addField('Canal:', `<#${oldMessage.channel.id}>`)
                    .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
            } else {
                channel.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(server).member(client.user).displayHexColor)
                    .setTitle('| Logs • Rede Harley ▸ Mensagem editada')
                    .addField('Mensagem original:', `${oldMessage.content}`, true)
                    .addField('Mensagem editada:', `${newMessage.content}`, true)
                    .addField('Canal:', `<#${oldMessage.channel.id}>`)
                    .setFooter(`Autor: ${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ format: "png" }))
                    .setTimestamp());
            }
        }
    }
}