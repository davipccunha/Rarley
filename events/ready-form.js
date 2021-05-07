module.exports = {
    name: "ready-form",
    async execute(client, Discord, config, fs, db, pms) {

        const forms = client.guilds.resolve(config.guilds.equipe.id).channels.cache.find(ch => ch.name === 'log-formulários').parent.children;
        forms.forEach(form => {
            if (form.name === 'log-formulários') return;

            const authorM = client.guilds.resolve(config.guilds.harley.id).members.resolve(form.name);
            if (!authorM) return form.delete();

            const author = authorM.user;

            form.send(new Discord.MessageEmbed()
                .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                .setTitle('│ Formulário • Rede Harley')
                .setDescription(`Mensagem automática após reinício do bot.
            
            Clique na reação desta mensagem para responder ao formulário.
            As reações anteriores já não funcionam mais.`)
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp())
                .then(formulario => {
                    formulario.react('✅');
                    formulario.react('❌');
                    formulario.react('♻️');
                    const filterAprovar = (reaction, user) => reaction.emoji.name === '✅' && !user.bot && (client.guilds.resolve(config.guilds.harley.id).members.resolve(user.id)).hasPermission('ADMINISTRATOR');
                    const filterReprovar = (reaction, user) => reaction.emoji.name === '❌' && !user.bot && (client.guilds.resolve(config.guilds.harley.id).members.resolve(user.id)).hasPermission('ADMINISTRATOR');
                    const filterDeletar = (reaction, user) => reaction.emoji.name === '♻️' && !user.bot && (client.guilds.resolve(config.guilds.harley.id).members.resolve(user.id)).hasPermission('ADMINISTRATOR');
                    const collectorAprovar = formulario.createReactionCollector(filterAprovar);
                    const collectorReprovar = formulario.createReactionCollector(filterReprovar);
                    const collectorDeletar = formulario.createReactionCollector(filterDeletar);

                    collectorAprovar.on('collect', (reaction, user) => {
                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.introducao).createInvite({
                            maxAge: 0,
                            maxUses: 1
                        }).then(invite => {
                            author.send(new Discord.MessageEmbed()
                                .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                                .setTitle('Formulário • Rede Harley')
                                .setDescription(`Parabéns! Seu formulário foi analisado e você foi aprovado para a nossa equipe como Ajudante!

                            Para continuar, junte-se ao nosso Discord em **https://discord.gg/${invite.code}** para mais informações.
                            
                            Enviar esse link para outrém é contra as regras e você será banido de nossa equipe.
                            Caso tenha alguma dúvida, contate um de nossos superiores.

                            Bom jogo e obrigado por se juntar à equipe!`)
                                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                .setTimestamp())
                            form.delete();
                            db.delete(`form_${author.id}`);
                        });
                    })

                    collectorReprovar.on('collect', (reaction, user) => {
                        author.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('Formulário • Rede Harley')
                            .setDescription(`Olá! Seu formulário foi analisado e infelizmente você foi reprovado para a nossa equipe.

                            Não desista, pois você pode tentar novamente em **7 dias**.
                            Caso tenha alguma dúvida, contate um de nossos superiores.

                            Bom jogo e obrigado por se aplicar.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                        form.delete();
                        db.set(`form_${author.id}`, Date.now() + config.formCooldown);
                    })

                    collectorDeletar.on('collect', (reaction, user) => {
                        author.send(new Discord.MessageEmbed()
                            .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                            .setTitle('Formulário • Rede Harley')
                            .setDescription(`Olá! Seu formulário foi excluído por nossa equipe.

                            Você não foi aprovado nem negado e, portanto, pode reaplicar para nosssa equipe agora mesmo.
                            
                            Caso tenha alguma dúvida, contate um de nossos superiores.

                            Bom jogo e obrigado por se aplicar.`)
                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                        form.delete();
                        db.delete(`form_${author.id}`);
                    })
                })
        })
    }
}
