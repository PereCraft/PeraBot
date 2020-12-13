/*
 * ~ PeraBot ~
 *
 * Descrizione: Bot discord di PereCraft
 * Licenza: GPL3
 * Autori: Team di PereCraft
 */

const discord = require('discord.js');
const PeraSpam = require('./moderation/peraspam.js');
const fs = require('fs');

const config = require('./config.json');
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const client = new discord.Client();
client.commands = new discord.Collection();
const peraspam = new PeraSpam(process.env.configSpam, client); // Antispam

for (const file of files) {

    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);

}

client.on('ready', async() => {
    console.log("PeraBot started...");
})

client.on('message', async(msg) => {

    if(!msg.author.bot)
        peraspam.checkMessage(msg);

    if(!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const content = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const cmdExec = content.shift().toLowerCase();
    
    try {
        client.commands.get(cmdExec).run(discord, msg, content);
    } catch(error) {
        msg.channel.send("Il comando cercato non esiste. Fai `!help` per conoscere la pera");
    }

})

client.login(process.env.token);