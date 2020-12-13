const discord = require('discord.js');
const files = require('fs').readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
    name: "help",
    description: "Mostra questa schermata.",
    man: "Mostra questa schermata. aggiungere il nome di un comando per averne maggiori informazioni.",
    args: "0-1",

    run: async(client, msg, content) => {

        if(content.length > 1) {
            msg.reply("Ci sono troppi argomenti, cerca solo un comando.")    
            return;
        }

        let helpContent = "";

        if((content.length == 1) && (files.includes(content[0].toLowerCase() + ".js"))) {

            let info = require(`./${files[files.indexOf(content[0].toLowerCase() + ".js")]}`);

            helpContent += `
\`${info.name}\`: ${info.man}
Argomenti necessari: ${info.args}
`

        } else {

            if(content[0] != undefined)
                msg.reply(`Il comando !${content[0]} non esiste.`);

            for(const file of files) {
                
                let info = require(`./${file}`);

                helpContent += `
\`${info.name}\`: ${info.description}
Argomenti necessari: ${info.args}
`
                
            }
        }

        msg.channel.send(
            new discord.MessageEmbed()
                .setTitle("Help!")
                .setColor("0ffd00")
                .setDescription(helpContent)
        );

    }

}