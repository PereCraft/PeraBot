//const HTT = require('html-to-text');
const { htmlToText } = require('html-to-text');
const Http = require('http');
const Config = require('../config.json');

module.exports = {
    name: 'rules',
    alias: ['r', 'rule'],
    category: 'Supporto',
    description: "Mostra le regole del server. C'è necessario almeno un argomento valido tra `generale` o `server`",
    slash: true,
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: '<generale> <server>',

    callback: async ({ args }) => {
        args.map(value => value.toLowerCase());

        let jsonGet = () => {
            return new Promise((resolve, reject) => {
                Http.get(Config.wikipera_api, (res) => {
                    res.setEncoding('utf-8')
                    let rules = "";

                    res.on('data', (chunk) => {
                        rules += chunk;
                    })

                    res.on('end', () => {
                        let json;

                        try{
                            json = JSON.parse(rules);
                            resolve(json);
                        }catch (error){
                            console.error(error);
                            reject("**:x: Errore nella lettura delle info sul server. Segnala l'errore a @Admin. :x:**");
                        }
                    })
        
                }).on("error", (error) => {
                    console.error(error);
                    reject("**:x: C'è stato un errore interno, siete pregati di segnalare l'errore a un @Admin. :x:**");
                })
            })
        }

        let ret = "";

        await jsonGet().then((json) => {
            function readRules(array) {
                let string = "";
          
                for(let i = 0; i < array.length; i++){
                   string += array[i].replace("[", "<").replace("]", ">") + "\n";
                }
                
                return string;
            
            }

            let html = json.parse.text['*'];
            let generalRules = readRules(htmlToText(html).split("\n\n")[5].split("\n")) + readRules(htmlToText(html).split("\n\n")[6].split("\n"));
            let serverRules = readRules(htmlToText(html).split("\n\n")[8].split("\n"));

            args.some((rulesCheck) => {
                if(rulesCheck == "generale") {
                    ret += "**REGOLAMENTO GENERALE**\n" + generalRules;
                } else if(rulesCheck == "server") {
                    ret += "**REGOLAMENTO SERVER**\n" + serverRules;
                } else {
                    ret = "**:x: Il regolamento cercato non esiste! Fai `!help rules` per maggiori informazioni. :x:**";
                }
            })
        })

        return ret;
    }
}