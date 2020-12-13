const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = {
    name: "ten",
    description: "Translates the sentences",
    man: "Translates the sentences into english.",
    args: "1",

    run: async(client, msg, content) => {
        
        if(content < 1) {
            msg.channel.send("Write a sentences to translate it into english.");
            return;
        }

        translate(content.join(" "), {to: "en"}).then((res) => {
            msg.channel.send(`${msg.author.username}: ${res.text}`);
        }).catch((error) => {
            msg.channel.send("**There was an internal error, please report the error to an @Admin.**");
            console.log(error);
        })

    }
}