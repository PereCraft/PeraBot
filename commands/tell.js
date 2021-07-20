const { MessageEmbed } = require('discord.js');
const Config = require('../config.json');

module.exports = {
    name: 'tell',
    alias: ['t'],
    category: 'Supporto',
    description: 'Comunica agli admin un problema o consiglio per migliorare il server.',
    slash: true,
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<titolo> <messaggio>',

    callback: async ({ client, interaction, args }) => {
        args.map(value => value.toLowerCase());

        try {
            client.channels.cache.get(Config.channel_report).send(
                new MessageEmbed()
                    .setTitle(args[0])
                    .setColor('ff000')
                    .setAuthor(`@${interaction.member.user.username}`)
                    .addFields({ name: 'Corpo del messaggio', value: args[1] })
            )

            return "**Grazie per la segnalazione! :peterpera::thumbsup:**";
        } catch(error) {
            console.log(error);
            return "**:x: C'è stato un errore nell'elaborare e inviare il messaggio.\n Fai !help e controlla se hai scritto correttamente il messaggio altrimenti segnalalo a un admin :x:**";
        } 
    }
}