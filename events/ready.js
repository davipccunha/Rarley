module.exports = {
    name: "ready",
    async execute(client, Discord, config, fs, db, pms) {

        // Console log
        console.log(`Estou online - ${new Date().toLocaleString()}`);

        // Set activity
        client.user.setActivity('jogar.rarley.com');

        // Re-react on support message
        client.channels.resolve(config.guilds.harley.channels.suporte).messages.fetch(config.guilds.harley.messages.suporte).then(supportMessage => {
            supportMessage.reactions.removeAll();
            supportMessage.react(config.guilds.harley.emojis.duvidas);
            supportMessage.react(config.guilds.harley.emojis.compras);
            supportMessage.react(config.guilds.harley.emojis.yt);
            supportMessage.react(config.guilds.harley.emojis.revisoes);
            supportMessage.react(config.guilds.harley.emojis.outros);
        })
    }
}
