module.exports = {
    name: "ready-support",
    async execute(client, Discord, config) {

        client.channels.resolve(config.guilds.harley.channels.suporte).messages.fetch(config.guilds.harley.messages.suporte).then(supportMessage => {
            supportMessage.reactions.removeAll();
            supportMessage.react(config.guilds.harley.emojis.duvidas);
            supportMessage.react(config.guilds.harley.emojis.compras);
            supportMessage.react(config.guilds.harley.emojis.yt);
            supportMessage.react(config.guilds.harley.emojis.revisoes);
            supportMessage.react(config.guilds.harley.emojis.outros);

            const filterDuvidas = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.duvidas && !user.bot
            const filterCompras = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.compras && !user.bot
            const filterYT = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.yt && !user.bot
            const filterRevisoes = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.revisoes && !user.bot
            const filterOutros = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.outros && !user.bot
            const collectorDuvidas = supportMessage.createReactionCollector(filterDuvidas);
            const collectorCompras = supportMessage.createReactionCollector(filterCompras);
            const collectorYT = supportMessage.createReactionCollector(filterYT);
            const collectorRevisoes = supportMessage.createReactionCollector(filterRevisoes);
            const collectorOutros = supportMessage.createReactionCollector(filterOutros);

            collectorDuvidas.on('collect', (reaction, user) => {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.harley.id).channels.create(`dúvida-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.harley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.harley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: config.guilds.harley.roles.admin,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('│ Suporte • Rede Harley')
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
            
            Digite seu nick in-game e sua dúvida e aguarde até que seja respondido.
            
            Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.harley.emojis.fechar);

                                const filterFechar = (reaction, user) => { return reaction.emoji.id === config.guilds.harley.emojis.fechar && !user.bot }
                                const collectorFechar = ticket.createReactionCollector(filterFechar);

                                collectorFechar.on('collect', (reaction, user) => {
                                    ch.delete();
                                })
                            })
                    });
            });

            collectorCompras.on('collect', (reaction, user) => {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.harley.id).channels.create(`compra-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.harley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.harley.roles.everyone,
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
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('│ Suporte • Rede Harley')
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game e seu problema e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.harley.emojis.fechar);

                                const filterFechar = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.fechar && !user.bot
                                const collectorFechar = ticket.createReactionCollector(filterFechar);

                                collectorFechar.on('collect', (reaction, user) => {
                                    ch.delete();
                                })
                            })
                    })
            })

            collectorYT.on('collect', (reaction, user) => {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.harley.id).channels.create(`solicitação-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.harley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.harley.roles.everyone,
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
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('│ Suporte • Rede Harley')
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game e envie os vídeos/lives gravados no servidor e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.harley.emojis.fechar);

                                const filterFechar = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.fechar && !user.bot
                                const collectorFechar = ticket.createReactionCollector(filterFechar);

                                collectorFechar.on('collect', (reaction, user) => {
                                    ch.delete();
                                })
                            })
                    })
            })

            collectorRevisoes.on('collect', (reaction, user) => {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.harley.id).channels.create(`revisão-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.harley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.harley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: config.guilds.harley.roles.admin,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('│ Suporte • Rede Harley')
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game, a print, e o autor da sua punição e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.harley.emojis.fechar);

                                const filterFechar = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.fechar && !user.bot
                                const collectorFechar = ticket.createReactionCollector(filterFechar);

                                collectorFechar.on('collect', (reaction, user) => {
                                    ch.delete();
                                })
                            })
                    })
            })

            collectorOutros.on('collect', (reaction, user) => {
                reaction.users.remove(user.id)
                client.guilds.resolve(config.guilds.harley.id).channels.create(`outros-de-${user.username}`, {
                    type: 'text',
                    parent: config.guilds.harley.parents.suporte,
                    permissionOverwrites: [
                        {
                            id: config.guilds.harley.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL']
                        },
                        {
                            id: config.guilds.harley.roles.admin,
                            allow: ['VIEW_CHANNEL']
                        }
                    ]
                })
                    .then(ch => {
                        ch.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('│ Suporte • Rede Harley')
                            .setDescription(`Olá, <@${user.id}>. O seu ticket de contato direto  ao suporte foi criado.
                    
                    Digite seu nick in-game e o que precisa e aguarde até que seja respondido.
                    
                    Caso deseje fechar este ticket, clique na reação abaixo.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(ticket => {
                                ticket.react(config.guilds.harley.emojis.fechar);

                                const filterFechar = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.fechar && !user.bot
                                const collectorFechar = ticket.createReactionCollector(filterFechar);

                                collectorFechar.on('collect', (reaction, user) => {
                                    ch.delete();
                                })
                            })
                    })
            })
        })
    }
}