module.exports = {
    name: "messageReactionAdd",
    async execute(client, Discord, config, db, reaction, user) {

        // Main support
        if (reaction.message.id == config.guilds.rarley.messages.suporte && !user.bot) {
            if (reaction.emoji.id === config.guilds.rarley.emojis.duvidas) {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.rarley.id).channels.create(`dúvida-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.rarley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.rarley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: config.guilds.rarley.roles.admin,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                            .setAuthor('│ Suporte • Rarley', reaction.message.guild.iconURL())
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
            
            Digite seu nick in-game e sua dúvida e aguarde até que seja respondido.
            
            Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.rarley.emojis.fechar);
                                ticket.pin()
                                db.set(`support_msg_${ticket.id}_${ticket.channel.id}`, true);
                            })
                    });
            } else if (reaction.emoji.id === config.guilds.rarley.emojis.compras && !user.bot) {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.rarley.id).channels.create(`compra-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.rarley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.rarley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                            .setAuthor('│ Suporte • Rarley', reaction.message.guild.iconURL())
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game e seu problema e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.rarley.emojis.fechar);
                                db.set(`support_msg_${ticket.id}_${ticket.channel.id}`, true);
                            })
                    })
            } else if (reaction.emoji.id === config.guilds.rarley.emojis.yt && !user.bot) {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.rarley.id).channels.create(`solicitação-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.rarley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.rarley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                            .setAuthor('│ Suporte • Rarley', reaction.message.guild.iconURL())
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game e envie os vídeos/lives gravados no servidor e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.rarley.emojis.fechar);
                                db.set(`support_msg_${ticket.id}_${ticket.channel.id}`, true);
                            })
                    })
            } else if (reaction.emoji.id === config.guilds.rarley.emojis.revisoes && !user.bot) {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.rarley.id).channels.create(`revisão-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.rarley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.rarley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: config.guilds.rarley.roles.admin,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                            .setAuthor('│ Suporte • Rarley', reaction.message.guild.iconURL())
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game, a print, e o autor da sua punição e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.rarley.emojis.fechar);
                                db.set(`support_msg_${ticket.id}_${ticket.channel.id}`, true);
                            })
                    })
            } else if (reaction.emoji.id === config.guilds.rarley.emojis.outros && !user.bot) {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.rarley.id).channels.create(`outros-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.rarley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.rarley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: config.guilds.rarley.roles.admin,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                            .setAuthor('│ Suporte • Rarley', reaction.message.guild.iconURL())
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game e o que precisa e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.rarley.emojis.fechar);
                                db.set(`support_msg_${ticket.id}_${ticket.channel.id}`, true);
                            })
                    })
            }

            // Deleting support channel
        } else if (db.get(`support_msg_${reaction.message.id}_${reaction.message.channel.id}`) && reaction.emoji.id === config.guilds.rarley.emojis.fechar && !user.bot) {
            reaction.message.channel.delete();
            db.delete(`support_msg_${reaction.message.id}_${reaction.message.channel.id}`);

            // Form reactions
        } else if (db.get(`form_msg_${reaction.message.id}`) && !user.bot) {
            const author = client.guilds.resolve(config.guilds.rarley.id).members.resolve(reaction.message.channel.name);
            if (!author) return reaction.message.channel.delete() && db.delete(`form_${reaction.message.channel.name}`);

            if (reaction.emoji.name === '✅') {
                client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.introducao).createInvite({
                    maxAge: 0,
                    maxUses: 1
                }).then(invite => {
                    author.send(new Discord.MessageEmbed()
                        .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                        .setTitle('Formulário • Rarley')
                        .setDescription(`Parabéns! Seu formulário foi analisado e você foi aprovado para a nossa equipe como Ajudante!

                    Para continuar, junte-se ao nosso Discord em **https://discord.gg/${invite.code}** para mais informações.
                    
                    Enviar esse link para outrém é contra as regras e você será banido de nossa equipe.
                    Caso tenha alguma dúvida, contate um de nossos superiores.

                    Bom jogo e obrigado por se juntar à equipe!`)
                        .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                        .setTimestamp())
                    reaction.message.channel.delete();
                    db.delete(`form_${author.id}`);
                });
            } else if (reaction.emoji.name === '❌') {
                author.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                    .setTitle('Formulário • Rarley')
                    .setDescription(`Olá! Seu formulário foi analisado e infelizmente você foi reprovado para a nossa equipe.

                Não desista, pois você pode tentar novamente em **${config.formCooldown} dias**.
                Caso tenha alguma dúvida, contate um de nossos superiores.

                Bom jogo e obrigado por se aplicar.`)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp())
                reaction.message.channel.delete();
                db.set(`form_${author.id}`, Date.now() + (config.formCooldown * 24 * 60 * 60 * 1000));
            } else if (reaction.emoji.name === '♻️') {
                author.send(new Discord.MessageEmbed()
                    .setColor(client.guilds.resolve(config.guilds.rarley.id).member(client.user).displayHexColor)
                    .setTitle('Formulário • Rarley')
                    .setDescription(`Olá! Seu formulário foi excluído por nossa equipe.

                            Você não foi aprovado nem negado e, portanto, pode reaplicar para nosssa equipe agora mesmo.
                            
                            Caso tenha alguma dúvida, contate um de nossos superiores.

                            Bom jogo e obrigado por se aplicar.`)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp())
                reaction.message.channel.delete();
                db.delete(`form_${author.id}`);
            }

            db.delete(`form_msg_${reaction.message.id}_${reaction.message.channel.id}`);

            // Spoilers
        } else if (reaction.message.id === config.guilds.rarley.messages.spoilers && !user.bot && reaction.emoji.name === '🧐') {
            reaction.message.guild.members.resolve(user.id).roles.add(config.guilds.rarley.roles.spoiler);
        }
    }
}