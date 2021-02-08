const { MessageEmbed } = require("discord.js");

class PeraSpam {

    constructor(config, client) {
        this.config = config;
        this.configSpam = config.peraSpam_config;
        this.userMap = new Map();
        this.client = client;
    }
    
    checkMessage(msg) {

        if(!this.userMap.has(msg.author.id)) {

            this.setUserMsg(msg);
            /*this.userMap.set(msg.author.id, {
                lastMsg: msg,
                countMsg: 1,
                countWarn: 0
            });*/

            return;
        }

        let user = this.userMap.get(msg.author.id);
        let role = msg.member.guild.roles.cache.find(role => role.name === "muto");
        let muteCondition = (msg.createdTimestamp - user.lastMsg.createdTimestamp < this.configSpam.time) && (user.countMsg >= this.configSpam.limit);
        let msgEqual = (msg.createdTimestamp - user.lastMsg.createdTimestamp < this.configSpam.time) && (msg.content === user.lastMsg.content);
        let msgCountOk = msg.createdTimestamp - user.lastMsg.createdTimestamp < this.configSpam.time;
        
        if(muteCondition) {
            this.muteUser(role, msg);
        } else if(msgEqual) {

            user.countMsg += 1;
            msg.delete();
            this.userMap.set(msg.author.id, user);

        } else if(msgCountOk) {
                
            if(user.countWarn == this.configSpam.warnLimit) msg.reply("vedi di stare zitto!");
                    
            user.countMsg += 1;
            user.countWarn += 1;
            this.userMap.set(msg.author.id, user);

        } else this.userMap.delete(msg.author.id);
 
    }

    setUserMsg(msg) {

        this.userMap.set(msg.author.id, {
            lastMsg: msg,
            countMsg: 1,
            countWarn: 0
        });

    }

    muteUser(role, msg) {
        msg.reply("ok mo te stai zitto");
        msg.member.roles.add(role);

        console.log(`Muted @${msg.author.tag}`);
        this.client.channels.cache.get(this.config.channel_report).send(
            new MessageEmbed()
                .setTitle("Utete mutato")
                .setDescription("Utente mutato per spam")
                .addFields(
                    {name: "Utente", value: `@${msg.author.tag}`},
                    {name: "Canale", value: `${msg.channel.name}`}
                )
        )
    }
}

module.exports = PeraSpam;