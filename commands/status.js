const Https = require('https');
const { MessageEmbed } = require('discord.js');
const Config = require('../config.json');

module.exports = {
    name: 'status',
    alias: ['stat'],
    category: 'Supporto',
    description: 'Mostra le informazioni del server.',
    slash: true,

    execute: async ({ message }) => {
        
        let jsonGet = () => {
            return new Promise((resolve, reject) => {
                Https.get(Config.server_api, (res) => {
                    let string = "";
                    res.setEncoding('utf-8');
        
                    res.on('data', (chunk) => {
                        string += chunk;
                    })
        
                    res.on('end', () => {
                        let json;
        
                        try{
                            json = JSON.parse(string);
                            resolve(json);
                        }catch (error){
                            console.error(error);
                            reject("**:x: Errore nella lettura delle info sul server. Segnala l'errore a @Admin. :x:**");
                        }
                    })
        
                }).on('error', (error) => {
                    console.error(error);
                    reject("**:x: C'è stato un errore interno, siete pregati di segnalare l'errore a un @Admin. :x:**");
                })
            })
        };

        let Emb;

        await jsonGet().then((json) =>{
            if(json.online) {
                    
                Emb = new MessageEmbed()
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
            
                Emb = new MessageEmbed()
                    .setColor("cd0000")
                    .setTitle("Server offline")
                    .setDescription("Il server attualmente è offline, contattare lo staff per maggiori informazioni.")
                    .setFooter("Informazioni ricavate da mcsrvstat");
            
            }
        });

        return Emb;
    }

}