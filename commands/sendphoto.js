const discord = require('discord.js');

module.exports = {
    name: "sendphoto",
    description: "Link per inviare le foto.",
    man: "Comando per inviare le foto.",
    args: "0",

    run: async(client, msg, content) => {
        msg.reply("**Se vuoi condividere una foto, utilizza imgur!** <https://imgur.com/upload>");
    }

}