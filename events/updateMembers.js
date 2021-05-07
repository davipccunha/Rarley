module.exports = {
    name: "updateMembers",
    async count(client, config) {

        const memberCount = client.guilds.resolve(config.guilds.harley.id).memberCount;
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

        client.guilds.resolve(config.guilds.harley.id).channels.resolve(config.guilds.harley.channels.geral).edit({
            topic: `<:harley:618507312226893850> Contamos com ${count} membros em nosso Discord`
        })
    }
}