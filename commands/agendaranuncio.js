const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "agendaranuncio",
    description: "Agenda um anúncio",
    execute(client, Discord, message, args, config, db, schedule) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

            const ch = message.guild.channels.resolve(config.guilds.rarley.channels.secreto);

            if (!args.join(' ')) {
                message.channel.send('Faltando argumentos: Digite o texto para anunciar.')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            if (db.get(`anuncio`)) {
                message.channel.send('Já existe um anúncio agendado pendente.')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            message.channel.send('Digite a data e hora do anúncio programado no formato [MM/dd/yyyy hh:mm]');
            var a = message.channel.createMessageCollector(x => x.author.id == message.author.id, { max: 1 })
            a.on('collect', async fullTime => {
                const time = new Date(fullTime.content).getTime();
                if (time <= Date.now()) {
                    message.channel.send('Você não pode agendar um anúncio no passado')
                        .then(msg => msg.delete({ timeout: 3000 }));
                    message.delete({ timeout: 3000 });
                    return;
                }
                db.set(`anuncio`, time);

                ch.send(new Discord.MessageEmbed()
                    .setColor(message.guild.member(client.user).displayHexColor)
                    .setAuthor(`│ Anúncio • Rarley`, message.guild.iconURL())
                    .setDescription(args.join(' '))
                    .setFooter(`Anúncio agendado para ${dateFormatMs(time)}`, message.author.displayAvatarURL({ format: "png" })))
                message.delete();

                const job = schedule.scheduleJob('0 * * * * *', function () {
                    scheduled(time, config.guilds.rarley.channels.anuncios);
                });

                function scheduled(schedule, channelID) {
                    const channel = client.guilds.resolve(config.guilds.rarley.id).channels.resolve(channelID);
                    if (Math.abs(schedule - Date.now()) <= 5000) {
                        channel.send(new Discord.MessageEmbed()
                            .setColor(message.guild.member(client.user).displayHexColor)
                            .setAuthor(`│ Anúncio • Rarley`, message.guild.iconURL())
                            .setDescription(args.join(' '))
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
                            .setTimestamp())
                            .then(msg => { msg.react(config.guilds.rarley.emojis.rarley); });
                        channel.send(`<@&${config.guilds.rarley.roles.membro}> @everyone`)
                            .then(msg => { msg.delete({ timeout: 200 }); });

                        db.delete(`anuncio`)
                    }
                }
                function dateFormatMs(ms) {
                    const date = new Date(ms);

                    const dateDate = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
                    const dateMonth = (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                    const dateHours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
                    const dateMinutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();

                    return `${dateDate}/${dateMonth}/${date.getFullYear()} - ${dateHours}:${dateMinutes}`;
                }
            })
        } else {
            message.channel.send("Você precisa da permissão \`Administrador\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}