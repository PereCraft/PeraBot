const Discord = require('discord.js');
const WOKCommands = require('wokcommands');

const Config = require('./config.json');

const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });

client.on('ready', () => {
    // TODO: Togli help
    new WOKCommands(client, {
        commandsDir: 'commands',
        showWarns: true,
        del: -1,
        ignoreBots: true,
    }).setDefaultPrefix(Config.prefix);

    console.log('PeraBot is ready!');
})

client.login(Config.token);