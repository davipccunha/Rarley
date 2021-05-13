module.exports = {
    name: "updateMembers",
    async count(client, config) {

        const memberCount = client.guilds.resolve(config.guilds.rarley.id).memberCount;
        const count = memberCount.toString()
            .replace(/0/g, ':zero:')
            .replace(/1/g, ':one:')
            .replace(/2/g, ':two:')
            .replace(/3/g, ':three:')
            .replace(/4/g, ':four:')
            .replace(/5/g, ':five:')
            .replace(/6/g, ':six:')
            .replace(/7/g, ':seven:')
            .replace(/8/g, ':eight:')
            .replace(/9/g, ':nine:');

        client.guilds.resolve(config.guilds.rarley.id).channels.resolve(config.guilds.rarley.channels.geral).edit({
            topic: `<:rarley:${config.guilds.rarley.emojis.rarley}> Contamos com ${count} membros em nosso Discord`
        })
    }
}