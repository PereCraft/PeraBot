module.exports = {
    name: "ban",
    description: "Banna un utente",
    man: "Banna un utente",
    arg: "2-3",
    run: async (client, msg, content) => {

        if(content.length != 2) {
            msg.reply("**:x: Specifica utente da bannare e motivazione! :x:**")    
            return
        } else if(!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.reply("**:x: Cazzo vuoi fare oh, non hai il permesso di usare questo comando! :x:**")    
            return
        } 

        let user = msg.guild.member(msg.mentions.users.first());
        let banReason = content.join(" ").slice(22);
        
        // TODO: Fai messaggio embeded fiero
        user.ban({reason: banReason})
            .then(msg.channel.send(":stalinpera::hammer: `"+user.user.username+"` è stato perizzato!"));
    }
}