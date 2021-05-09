module.exports = {
    name: "ready",
    async execute(client, Discord, config, fs, db, pms) {

        // Console log
        console.log(`Estou online - ${new Date().toLocaleString()}`);

        // Set activity
        client.user.setActivity('jogar.rarley.com');

        // Re-react on support message
        client.channels.resolve(config.guilds.rarley.channels.suporte).messages.fetch(config.guilds.rarley.messages.suporte).then(supportMessage => {
            supportMessage.reactions.removeAll();
            supportMessage.react(config.guilds.rarley.emojis.duvidas);
            supportMessage.react(config.guilds.rarley.emojis.compras);
            supportMessage.react(config.guilds.rarley.emojis.yt);
            supportMessage.react(config.guilds.rarley.emojis.revisoes);
            supportMessage.react(config.guilds.rarley.emojis.outros);
        })
    }
}
