module.exports = {
    name: "guildMemberAdd",
    async execute(client, Discord, config, member) {

        //Autorole
        if (member.guild.id === config.guilds.harley.id) {
            await member.roles.add(config.guilds.harley.roles.membro)
        } else if (member.guild.id === config.guilds.equipe.id) {
            member.roles.add(config.guilds.equipe.roles.ajudante)
            client.guilds.resolve(config.guilds.equipe.id).channels.resolve(config.guilds.equipe.channels.changelog).send(new Discord.MessageEmbed()
                .setColor(client.guilds.resolve(config.guilds.equipe.id).member(client.user).displayHexColor)
                .setTitle('│ Changelog • Equipe')
                .setDescription(`<@${member.id}> integrou a equipe como **Ajudante**.`)
                .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp());

            const m = client.guilds.resolve(config.guilds.harley.id).members.resolve(member.id);
            if (!m) return;

            m.roles.add(config.guilds.harley.roles.ajudante);
        }

        //Welcome
        if (member.guild.id === config.guilds.harley.id) {
            const channel = client.guilds.resolve(config.guilds.harley.id).channels.resolve(config.guilds.harley.channels.welcome);

            const Canvas = require('canvas');
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');

            const background = await Canvas.loadImage(config.welcomeImageURL);
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer());
            channel.send(`Bem-vindo(a) ao servidor de Discord da Rede Harley, <@${member.id}>!`, attachment);
        }
    }
}