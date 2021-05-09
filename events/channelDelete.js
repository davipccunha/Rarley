module.exports = {
    name: "channelDelete",
    async execute(client, Discord, config, db, channel) {

        if (channel.type == 'dm') return;

        const entry = await channel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first())

        if (entry.executor.bot) return;

        if (channel.parentID === config.guilds.harley.parents.suporte || channel.parentID === config.guilds.equipe.parents.formulario) {
            if (db.get(`form_${channel.name}`)) db.delete(`form_${channel.name}`);

            db.all().forEach(data => {
                if (data.ID.endsWith(channel.id)) {
                    db.delete(data.ID);
                }
            })
        }
    }
}
