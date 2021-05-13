const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true, messageCacheMaxSize: -1, partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');
const db = require('quick.db');
const pms = require('parse-ms');
const schedule = require('node-schedule');
const config = require('./config.json');
const package = require('./package.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.events = new Discord.Collection();

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    client.events.set(event.name, event);
}

const prefix = config.prefix;

client.once('ready', async () => {
    await client.events.get("ready").execute(client, Discord, config, fs, db, pms);
    await client.events.get("updateMembers").count(client, config);
});

client.on('messageReactionAdd', async (reaction, user) => {
    await client.events.get("messageReactionAdd").execute(client, Discord, config, db, reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
    await client.events.get("messageReactionRemove").execute(client, Discord, config, db, reaction, user);
})

client.on('channelDelete', async channel => {
    await client.events.get("channelDelete").execute(client, Discord, config, db, channel);
})

client.on('guildMemberAdd', async member => {
    await client.events.get("guildMemberAdd").execute(client, Discord, config, member);
    await client.events.get("updateMembers").count(client, config);
});

client.on('guildMemberRemove', async member => {
    await client.events.get("guildMemberRemove").execute(client, Discord, config, member)
    await client.events.get("updateMembers").count(client, config);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    await client.events.get("messageUpdate").execute(client, Discord, config, oldMessage, newMessage);
});

client.on('messageDelete', async message => {
    await client.events.get("messageDelete").execute(client, Discord, config, message);
});

client.on('message', async message => {

    if (!message.content.startsWith(prefix) && message.channel.id == config.guilds.rarley.channels.comandos && !message.author.bot && !message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(`Só é possível enviar comandos no canal <#${config.guilds.rarley.channels.comandos}>.`)
            .then(msg => { msg.delete({ timeout: 3000 }); });
        message.delete({ timeout: 50 });
    } else {

        if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type == 'dm') return;

        if (message.channel.id == config.guilds.rarley.channels.comandos || message.member.hasPermission('MANAGE_MESSAGES')) {

            const args = message.content.trim().slice(prefix.length).split(' ');
            const command = args.shift().toLowerCase();

            switch (command) {
                case 'control':
                    if (message.author.id !== config.devID) return message.delete({ timeout: 1000 });
                    switch (args[0]) {
                        case 'all':
                            console.log(db.all());
                            break;
                        case 'reset':
                            db.all().forEach(data => {
                                db.delete(data.ID);
                            });
                            break;
                        case 'msg':
                            client.channels.resolve(config.guilds.rarley.channels.suporte).messages.fetch('842505665104707636').then(msg => {
                                console.log(msg);
                                message.channel.send(msg.embeds[0]);
                            })
                            break;
                    }
                    message.delete({ timeout: 1000 });
                    break;
                case 'ping':
                    await client.commands.get("ping").execute(client, Discord, message, args, config);
                    break;
                case 'status':
                    await client.commands.get("status").execute(client, Discord, message, args, config);
                    break;
                case 'sugerir':
                case 'sugestão':
                case 'sugestao':
                    await client.commands.get("sugerir").execute(client, Discord, message, args, config);
                    break;
                case 'embed':
                    await client.commands.get("embed").execute(client, Discord, message, args, config);
                    break;
                case 'spoiler':
                    await client.commands.get("spoiler").execute(client, Discord, message, args, config);
                    break;
                case 'clear':
                    await client.commands.get("clear").execute(client, Discord, message, args, config);
                    break;
                case 'mutech':
                    await client.commands.get("mutech").execute(client, Discord, message, args, config);
                    break;
                case 'unmutech':
                    await client.commands.get("unmutech").execute(client, Discord, message, args, config);
                    break;
                case 'anunciar':
                    await client.commands.get("anunciar").execute(client, Discord, message, args, config);
                    break;
                case 'agendaranuncio':
                    await client.commands.get("agendaranuncio").execute(client, Discord, message, args, config, db, schedule);
                    break;
                case 'cancelaranuncio':
                    await client.commands.get("cancelaranuncio").execute(client, Discord, message, args, config, db, schedule);
                    break;
                case 'kick':
                    await client.commands.get("kick").execute(client, Discord, message, args, config);
                    break;
                case 'mute':
                    await client.commands.get("mute").execute(client, Discord, message, args, config);
                    break;
                case 'unmute':
                    await client.commands.get("unmute").execute(client, Discord, message, args, config);
                    break;
                case 'ban':
                    await client.commands.get("ban").execute(client, Discord, message, args, config);
                    break;
                case 'unban':
                    await client.commands.get("unban").execute(client, Discord, message, args, config);
                    break;
                case 'checkban':
                    await client.commands.get("checkban").execute(client, Discord, message, args, config);
                    break;
                case 'help':
                case 'ajuda':
                    await client.commands.get("help").execute(client, Discord, message, args, client.commands, config);
                    break;
                case 'formulario':
                case 'formulário':
                    await client.commands.get("formulario").execute(client, Discord, message, args, config, fs, db, pms);
                    break;
                case 'info':
                    await client.commands.get("info").execute(client, Discord, message, args, config, package);
                    break;
                case 'marcartodomundonobagulho':
                    await client.commands.get("marcartodomundonobagulho").execute(client, Discord, message, args, config);
                    break;
                case 'resetform':
                    await client.commands.get("resetform").execute(client, Discord, message, args, config, fs, db, pms);
                    break;
                default:
                    await message.channel.send('Comando inexistente.')
                        .then(msg => { msg.delete({ timeout: 5000 }); });
                    message.delete({ timeout: 3000 });
            }
        } else {
            message.channel.send(`Comandos devem ser enviadas no canal <#${config.guilds.rarley.channels.comandos}>.`)
                .then(msg => { msg.delete({ timeout: 5000 }); });
            message.delete({ timeout: 3000 });
        }
    }
})

client.login(config.token);