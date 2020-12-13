const htt = require('html-to-text');
const http = require('http');

const config = require('../config.json');

module.exports = {
    name: "rules",
    description: "Mostra le regole del server.",
    man: "Mostra le regole del server. C'è necessario almeno un argomento valido tra `generale` o `server`",
    args: "1-2",

    run: async(client, msg, content) => {

        if(content == 0) {
            msg.channel.send("Inserire almeno un argomento. Fai !help rules per maggiori informazioni.");
            return;
        }

        content.map(value => value.toLowerCase());

        http.get(config.wikipera_api, (res) => {

            function readRules(array) {
                
                let string = "";
          
                for(let i = 2; i < array.length; i++){
                   string += array[i] + "\n";
                }
                
                return string;
            
            }

            let rules = "";
            res.setEncoding("utf8");

            res.on('data', (chunk) => {
                rules += chunk;
            })

            res.on('end', () => {

                let json;

                try{
                  json = JSON.parse(rules);
                }catch (error){
                  msg.channel.send("**Errore nella lettura delle info sul server. Segnala l'errore a @Admin.**");
                  return
                }

                
                let contentRules = htt.fromString(json.parse.text['*']).split("\n\n");

                generalRules = contentRules[4].split("\n");
                serverRules = contentRules[7].split("\n");
                
                
                if(content.includes("generale"))
                    msg.channel.send("**REGOLAMENTO GENERALE**\n" + readRules(generalRules));
                if(content.includes("server"))
                    msg.channel.send("**REGOLAMENTO DEL SERVER**\n" + readRules(serverRules));

            })

        }).on("error", (error) => {
            msg.channel.send("**C'è stato un errore interno, siete pregati di segnalare l'errore a un @Admin.**");
            console.log(error);
        })

    }

}