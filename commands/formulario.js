module.exports = {
    name: "formulario",
    description: "Inicia o processo do formulário para a equipe",
    async execute(client, Discord, message, args, config, fs, db, pms) {

        async function askQuestion(text) {
            return message.author.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setTitle('| Formulário • Rede Harley')
                .setDescription(text)
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp());
        }

        const formulario = await db.fetch(`form_${message.author.id}`);

        if (formulario == true) {
            message.author.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setTitle('| Formulário • Rede Harley')
                .setDescription(`<@${message.author.id}>, você já tem um formulário pendente aguardando resposta.`));
            message.delete({ timeout: 5000 })
            return;
        }
        if (formulario > Date.now()) {
            const cooldown = pms(formulario - Date.now());
            message.author.send(new Discord.MessageEmbed()
                .setColor(message.guild.member(client.user).displayHexColor)
                .setTitle('| Formulário • Rede Harley')
                .setDescription(`<@${message.author.id}>, você foi reprovado recentemente e está em cooldown. Aguarde para tentar novamente.`)
                .addField('Cooldown', `**${cooldown.days} dias, ${cooldown.hours} horas, ${cooldown.minutes} minutos, ${cooldown.seconds} segundos**`));
            message.delete({ timeout: 5000 })
            return;
        }

        db.set(`form_${message.author.id}`, true);

        message.author.createDM();
        askQuestion('Responda às perguntas que serão enviadas em seu privado e aguarde uma resposta de nossa equipe.')
            .catch(e => {
                if (e.message === "Cannot send messages to this user") {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('| Formulário • Rede Harley')
                        .setDescription('Erro: libere o seu privado para que possa iniciar o formulário e digite o comando novamente.')
                        .addField('Instruções:', `Configurações de usuário -> Privacidade e segurança ->
                            Permitir mensagens diretas de membros do servidor`))
                        .then(msg => { msg.delete({ timeout: 10000 }); });
                    message.delete({ timeout: 3000 });
                    return;
                }
            });
        const formCancelTxt = new Discord.MessageEmbed()
            .setColor(message.guild.member(client.user).displayHexColor)
            .setTitle('| Formulário • Rede Harley')
            .setDescription(`<@${message.author.id}>, você cancelou o formulário. Você pode iniciá-lo novamente se desejar.`);

        message.delete({ timeout: 50 });
        await askQuestion('• Qual o seu nome completo?');
        var a = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
        a.on('collect', async reply1 => {
            if (reply1.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
            await askQuestion('• Qual a sua idade?')
            var b = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
            b.on('collect', async reply2 => {
                if (reply2.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                await askQuestion('• Qual o seu nick in-game?')
                var c = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                c.on('collect', async reply3 => {
                    if (reply3.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                    await askQuestion('• Qual período do dia em que você mais poderá se dedicar ao servidor? (Manhã, tarde, noite, madrugada)')
                    var d = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                    d.on('collect', async reply4 => {
                        if (reply4.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                        await askQuestion('• Quantas horas por dia você poderá se dedicar ao servidor?')
                        var e = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                        e.on('collect', async reply5 => {
                            if (reply5.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                            await askQuestion('• Você possui microfone?')
                            var f = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                            f.on('collect', async reply6 => {
                                if (reply6.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                await askQuestion('• Você consegue gravar a tela do seu jogo?')
                                var g = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                g.on('collect', async reply7 => {
                                    if (reply7.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                    await askQuestion('• Você já participou da equipe de algum servidor? Se sim, qual/quais?')
                                    var h = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                    h.on('collect', async reply8 => {
                                        if (reply8.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                        await askQuestion('• Cite 3 qualidades e 3 defeitos seus.')
                                        var i = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                        i.on('collect', async reply9 => {
                                            if (reply9.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                            await askQuestion('• Você se considera uma pessoa responsável? Por quê?')
                                            var j = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                            j.on('collect', async reply10 => {
                                                if (reply10.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                                await askQuestion('• Explique com suas palavras o que é hierarquia.')
                                                var k = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                                k.on('collect', async reply11 => {
                                                    if (reply11.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                                    await askQuestion('• Em um texto de no mínimo 3 linhas, diga-nos mais sobre você e porquê devemos te selecionar, e não os outros.')
                                                    var l = message.author.dmChannel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
                                                    l.on('collect', async reply12 => {
                                                        if (reply12.content.toLowerCase() == 'cancelar') return message.author.send(formCancelTxt) && db.delete(`form_${message.author.id}`);
                                                        await askQuestion(`Formulário enviado com sucesso!

                                                        Você receberá uma mensagem em seu privado assim que nossa equipe o ler.
                                                        Seja paciente e não nos apresse, isso só diminui suas chances.
                                                        
                                                        Obrigado por se aplicar!`)
                                                        client.guilds.resolve(config.guilds.equipe.id).channels.create(`${message.author.id}`, {
                                                            type: 'text',
                                                            parent: config.guilds.equipe.parents.formulario,
                                                            permissionOverwrites: [
                                                                {
                                                                    id: config.guilds.equipe.roles.everyone,
                                                                    deny: ['VIEW_CHANNEL'],
                                                                },
                                                                {
                                                                    id: config.guilds.equipe.roles.admin,
                                                                    allow: ['VIEW_CHANNEL']
                                                                }
                                                            ]
                                                        }

                                                        ).then(ch => {
                                                            const form = new Discord.MessageEmbed()
                                                                .setColor(message.guild.member(client.user).displayHexColor)
                                                                .setDescription(`**| Formulário de <@${message.author.id}>**`)
                                                                .addField('• Qual o seu nome completo?', reply1)
                                                                .addField('• Qual a sua idade?', reply2)
                                                                .addField('• Qual o seu nick in-game?', reply3)
                                                                .addField('• Qual período do dia em que você mais poderá se dedicar ao servidor? (Manhã, tarde, noite, madrugada)', reply4)
                                                                .addField('• Quantas horas por dia você poderá se dedicar ao servidor?', reply5)
                                                                .addField('• Você possui microfone?', reply6)
                                                                .addField('• Você consegue gravar a tela do seu jogo?', reply7)
                                                                .addField('• Você já participou da equipe de algum servidor? Se sim, qual/quais?', reply8)
                                                                .addField('• Cite 3 qualidades e 3 defeitos seus.', reply9)
                                                                .addField('• Você se considera uma pessoa responsável? Por quê?', reply10)
                                                                .addField('• Explique com suas palavras o que é hierarquia.', reply11)
                                                                .addField('• Em um texto de no mínimo 3 linhas, diga-nos mais sobre você e porquê devemos te selecionar, e não os outros.', reply12)
                                                                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                .setTimestamp()
                                                            ch.send(form)
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
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logFormularios).send(form);
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logFormularios).send(new Discord.MessageEmbed()
                                                                            .setColor(message.guild.member(client.user).displayHexColor)
                                                                            .setTitle(`| Formulário • Rede Harley • ${message.author.id}`)
                                                                            .setDescription(`Formulário ${message.author.id} aprovado por <@${user.id}>.`)
                                                                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                            .setTimestamp());
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.introducao).createInvite({
                                                                            maxAge: 0,
                                                                            maxUses: 1
                                                                        }).then(invite => {
                                                                            message.author.send(new Discord.MessageEmbed()
                                                                                .setColor(message.guild.member(client.user).displayHexColor)
                                                                                .setTitle('Formulário • Rede Harley')
                                                                                .setDescription(`Parabéns! Seu formulário foi analisado e você foi aprovado para a nossa equipe como Ajudante!

                                                                            Para continuar, junte-se ao nosso Discord em **https://discord.gg/${invite.code}** para mais informações.
                                                                            
                                                                            Enviar esse link para outrém é contra as regras e você será banido de nossa equipe.
                                                                            Caso tenha alguma dúvida, contate um de nossos superiores.
                                                                            
                                                                            Bom jogo e obrigado por se juntar à equipe!`)
                                                                                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                                .setTimestamp())
                                                                            ch.delete();
                                                                            db.delete(`form_${message.author.id}`);
                                                                        });
                                                                    })

                                                                    collectorReprovar.on('collect', (reaction, user) => {
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logFormularios).send(form);
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logFormularios).send(new Discord.MessageEmbed()
                                                                            .setColor(message.guild.member(client.user).displayHexColor)
                                                                            .setTitle(`| Formulário • Rede Harley • ${message.author.id}`)
                                                                            .setDescription(`Formulário ${message.author.id} negado por <@${user.id}>.`)
                                                                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                            .setTimestamp());
                                                                        message.author.send(new Discord.MessageEmbed()
                                                                            .setColor(message.guild.member(client.user).displayHexColor)
                                                                            .setTitle('Formulário • Rede Harley')
                                                                            .setDescription(`Olá, <@${message.author.id}>! Seu formulário foi analisado e infelizmente você foi reprovado para a nossa equipe.

                                                                            Não desista, pois você pode tentar novamente em **7 dias**.
                                                                            Caso tenha alguma dúvida, contate um de nossos superiores.

                                                                            Bom jogo e obrigado por se aplicar.`)
                                                                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                            .setTimestamp())
                                                                        ch.delete();
                                                                        db.set(`form_${message.author.id}`, Date.now() + config.formCooldown);
                                                                    })

                                                                    collectorDeletar.on('collect', (reaction, user) => {
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logFormularios).send(form);
                                                                        client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.logFormularios).send(new Discord.MessageEmbed()
                                                                            .setColor(message.guild.member(client.user).displayHexColor)
                                                                            .setTitle(`Formulário • Rede Harley • ${message.author.id}`)
                                                                            .setDescription(`Formulário ${message.author.id} excluído por <@${user.id}>.`)
                                                                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                            .setTimestamp());
                                                                        message.author.send(new Discord.MessageEmbed()
                                                                            .setColor(message.guild.member(client.user).displayHexColor)
                                                                            .setTitle('| Formulário • Rede Harley')
                                                                            .setDescription(`Olá, <@${message.author.id}>! Seu formulário foi excluído por nossa equipe.

                                                                            Você não foi aprovado nem negado e, portanto, pode reaplicar para nosssa equipe agora mesmo.
                                                                            
                                                                            Caso tenha alguma dúvida, contate um de nossos superiores.

                                                                            Bom jogo e obrigado por se aplicar.`)
                                                                            .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                                                                            .setTimestamp())
                                                                        ch.delete();
                                                                        db.delete(`form_${message.author.id}`);
                                                                    })
                                                                })
                                                        }
                                                        )
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}