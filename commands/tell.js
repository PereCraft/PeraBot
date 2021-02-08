const discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "tell",
    description: "Comunica agli admin un problema o consiglio per migliorare il server",
    man: "Comunica agli admin un problema o consiglio per migliorare il server. Per farlo è necessario digitare: `!tell {titolo del messaggio} messaggio`, il messaggio si autodistruggerà una volta scritto e verrà inviato allo staff.",
    args: "2",

    run: async(client, msg, content) => {
        let message = content.join(" ");
        msg.delete();

        try {

            client.channels.cache.get(config.channel_report).send(
                new discord.MessageEmbed()
                    .setTitle(message.split("{", 2)[1].split("}")[0])
                    .setColor("ff0000")
                    .setAuthor(msg.author.tag)
                    .addFields(
                        {name: "Corpo del messaggio", value: message.split("}")[1]}
                    )
            );

            msg.reply("**Grazie per la segnalazione! :thumbsup:**");

        }catch(error) {
            console.error(error);
            msg.channel.send("**:x: C'è stato un errore nell'elaborare e inviare il messaggio.\n Fai !help e controlla se hai scritto correttamente il messaggio altrimenti segnalalo a un admin :x:**")
        }        

    }

}