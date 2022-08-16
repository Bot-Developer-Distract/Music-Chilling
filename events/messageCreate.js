const client = require('../index');

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(client.config.prefix)) return;
    
    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    function lineReply(content, mention) {
        if(!mention) mention = false;
        return message.reply({ content: content, allowedMentions: { repliedUser: mention } });
    }

    message.lineReply = lineReply;

    if (!cmd) return;

    if (cmd.category = 'music') {
        if (!message.member.voice.channelId)
            return await lineReply("Tham gia bất kì voice nào để sử dụng lệnh!");
        if (message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId)
            return await lineReply("Bạn không có trong voice của bot!");
    }
    
    cmd.execute(client, message, args);
});