module.exports = {
    name: "messageReactionRemove",
    async execute(client, Discord, config, db, reaction, user) {

        // Spoilers
        if (reaction.message.id === config.guilds.rarley.messages.spoilers && !user.bot && reaction.emoji.name === '🧐') {
            reaction.message.guild.members.resolve(user.id).roles.remove(config.guilds.rarley.roles.spoiler);
        }
    }
}