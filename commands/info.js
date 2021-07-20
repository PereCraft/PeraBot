const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'info',
    alias: ['i'],
    category: 'Presentazione',
    description: 'Mostra le info sul server, con relativi servizi.',
    slash: true,
    
    callback: async ({}) => {
        return new MessageEmbed()
            .setTitle('Informazioni')
            .setAuthor('PereCraft')
            .setColor('0ffd0')
            .setDescription('\
            Benvenuto nel server di PereCraft!\
            Qui ci sono tutti i nostri servizi:\
            ')
            .addFields(
                { name: 'IP', value: 'mc.perecraft.ml' },
                { name: 'Sito', value: 'https://www.perecraft.ml/' },
                { name: 'Reddit', value: 'https://www.reddit.com/r/PereCraft/' },
                { name: 'GitHub', value: 'https://github.com/PereCraft/' },
                { name: 'Wikipera', value: 'http://wiki.perecraft.ml/p/Pagina_principale' }
            )
            .setThumbnail('http://wiki.perecraft.ml/resources/assets/perecraft.png')
    }
}