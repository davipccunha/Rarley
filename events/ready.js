module.exports = {
    name: "ready",
    async execute(client, Discord, config, fs, db, pms) {

        const support = require('./ready-support.js');
        const form = require('./ready-form.js');

        const server = config.guilds.harley.id;

        // Console log
        console.log(`Estou online - ${new Date().toLocaleString()}`);

        // Set activity
        client.user.setActivity('jogar.redeharley.com');

        // Forms reset
        form.execute(client, Discord, config, fs, db, pms);

        // Support reset
        support.execute(client, Discord, config);
        const tickets = client.guilds.resolve(config.guilds.harley.id).channels.resolve(config.guilds.harley.channels.APISupport).parent.children;
        tickets.forEach(ticket => {
            if (ticket.id === config.guilds.harley.channels.APISupport) return;

            ticket.send(new Discord.MessageEmbed()
                .setColor(client.guilds.resolve(config.guilds.harley.id).member(client.user).displayHexColor)
                .setTitle('│ Suporte • Rede Harley')
                .setDescription(`Mensagem automática após reinício do bot.
                
                Clique na reação desta mensagem para fechar o ticket.
                A mensagem anterior já não funciona mais.`)
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp())
                .then(msg => {
                    msg.react(config.guilds.harley.emojis.fechar);

                    const filterFechar = (reaction, user) => reaction.emoji.id === config.guilds.harley.emojis.fechar && !user.bot
                    const collectorFechar = msg.createReactionCollector(filterFechar);

                    collectorFechar.on('collect', (reaction, user) => {
                        ticket.delete();
                    })
                })
        })
    }
}
