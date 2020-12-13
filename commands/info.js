const discord = require('discord.js');
const { description } = require('./rules');

module.exports = {
    name: "info",
    description: "Mostra le info sul server.",
    man: "Mostra le info sul server, con relativi servizi.",
    args: "0",

    run: async(client, msg, content) => {

        msg.channel.send(
            new discord.MessageEmbed()
                .setTitle("Informazioni")
                .setAuthor("PereCraft")
                .setColor("0ffd00")
                .setDescription("\
                Benvenuto nel server di PereCraft!\
                Qui ci sono tutti i nostri servizi:\
                ")
                .addFields(
                    { name: "IP", value: "mc.perecraft.ml" },
                    { name: "Sito", value: "https://www.perecraft.ml/" },
                    { name: "Reddit", value: "https://www.reddit.com/r/PereCraft/" },
                    { name: "GitHub", value: "https://github.com/PereCraft/" },
                    { name: "Wikipera", value: "http://perecraft.altervista.org/" }
                )
                .setThumbnail("http://perecraft.altervista.org/resources/assets/perecraft.png")
        )

    }

}