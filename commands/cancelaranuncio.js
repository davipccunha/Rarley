module.exports = {
    name: "cancelaranuncio",
    description: "Cancela um anúncio agendado",
    execute(client, Discord, message, args, config, db, schedule) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

            if (!db.get(`anuncio`)) {
                message.channel.send('Não existe um anúncio agendado.')
                    .then(msg => msg.delete({ timeout: 3000 }));
                message.delete({ timeout: 3000 });
                return;
            }

            message.channel.send(`O anúncio agendado para \`${dateFormatMs(db.get(`anuncio`))}\` foi cancelado.`)
            db.delete(`anuncio`);

            function dateFormatMs(ms) {
                const date = new Date(ms);

                const dateDate = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
                const dateMonth = (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                const dateHours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
                const dateMinutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();

                return `${dateDate}/${dateMonth}/${date.getFullYear()} - ${dateHours}:${dateMinutes}`;
            }

        } else {
            message.channel.send("Você precisa da permissão \`Administrador\` para usar esse comando.")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            message.delete({ timeout: 3000 });
        }
    }
}