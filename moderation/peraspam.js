const { MessageEmbed } = require("discord.js");

class PeraSpam {

    constructor(configSpam, client) {
        this.config = JSON.parse(configSpam);
        this.userMap = new Map();
        this.client = client;
    }
    
    checkMessage(msg) {

        let role = msg.member.guild.roles.cache.find(role => role.name === "muto");
        
        if(this.userMap.has(msg.author.id)){
            
            let user = this.userMap.get(msg.author.id);

            if(
                (msg.createdTimestamp - user.lastMsg.createdTimestamp < this.config.time) &&
                (user.countMsg >= this.config.limit)
            ) {
                
                msg.reply("ok mo te stai zitto");

                msg.member.roles.add(role);
                this.userMap.delete(msg.author.id);

                this.client.channels.cache.get(this.config.channelReportId).send(
                    new MessageEmbed()
                        .setTitle("Utete mutato")
                        .setDescription("Utente mutato per spam")
                        .addFields(
                            {name: "Utente", value: `@${msg.author.tag}`},
                            {name: "Canale", value: `${msg.channel.name}`}
                        )
                )
                
            } else if(msg.createdTimestamp - user.lastMsg.createdTimestamp < this.config.time) {
                
                if(user.countWarn == this.config.warnLimit) 
                    msg.reply("vedi di stare zitto!");
                    
                user.countMsg += 1;
                user.countWarn += 1;
                this.userMap.set(msg.author.id, user);
            } else {
                this.userMap.delete(msg.author.id);
            }

        } else {
            this.userMap.set(msg.author.id, {
                lastMsg: msg,
                countMsg: 1,
                countWarn: 0
            });
        }

    }

}

module.exports = PeraSpam;