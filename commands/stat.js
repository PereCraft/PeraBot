const config = require('../config.json');
const https = require('https');
const discord = require('discord.js');

module.exports = {
    name: "stat",
    description: "Mostra le informazioni del server.",
    man: "Mostra le informazioni del server.",
    args: "0",

    run: async(client, msg, content) => {

        let string = "";

        https.get(config.server_api, (res) => {
            res.setEncoding('utf-8');

            res.on('data', (chunk) => {
                string += chunk;
            })

            res.on('end', () => {
                let json;

                try{
                    json = JSON.parse(string);
                  }catch (error){
                    msg.channel.send("**:x: Errore nella lettura delle info sul server. Segnala l'errore a @Admin. :x:**");
                    console.error(error);
                    return
                  }

                let Emb;

                if(json.online) {
                
                    Emb = new discord.MessageEmbed()
                        .setColor("00cd00")
                        .setTitle("Server status")
                        .setDescription("Informarzioni attuali del server.")
                        .addFields(
                            { name: "IP", value: json.hostname },
                            { name: "Players", value: `${json.players.online}/${json.players.max}` },
                            { name: "Versione", value: json.version },
                            { name: "Stato", value: "online" },
                        )
                        .setFooter("Informazioni ricavate da mcsrvstat");
                
                } else {
                
                    Emb = new discord.MessageEmbed()
                        .setColor("cd0000")
                        .setTitle("Server offline")
                        .setDescription("Il server attualmente è offline, contattare lo staff per maggiori informazioni.")
                        .setFooter("Informazioni ricavate da mcsrvstat");
                
                }

                msg.channel.send(Emb);

            })

        }).on('error', (error) => {
            msg.channel.send("**:x: C'è stato un errore interno, siete pregati di segnalare l'errore a un @Admin. :x:**")
            console.error(error);
        })

    }

}