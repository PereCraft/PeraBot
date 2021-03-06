const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = {
    name: "tit",
    description: "Translates the sentences",
    man: "Translates the sentences into italian.",
    args: "1",

    run: async(client, msg, content) => {
        
        if(content < 1) {
            msg.channel.send("**Write a sentences to translate it into italian :flag_it:.**");
            return;
        }

        translate(content.join(" "), {to: "it"}).then((res) => {

            msg.channel.send(`${msg.author.username}: ${res.text}`);
        
        }).catch((error) => {
            console.error(error);
            msg.channel.send("**:x: There was an internal error, please report the error to an @Admin. :x:**");
        })

        

    }
}