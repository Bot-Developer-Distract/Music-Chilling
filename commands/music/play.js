const { Client, Message } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: "play",
    description: "Chơi bài hát hoặc playlist",
    aliases: ["p"],
    category: "music",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        if(!args[0]) return message.lineReply("Cung cấp video để phát");
         
        const query = args.join(" ");
        const searchResult = await client.player
            .search(query, {
                requestedBy: message.author,
                searchEngine: QueryType.AUTO
            })
            .catch(err => {
                console.log(err)
            });
            if (!searchResult || !searchResult.tracks.length) return message.lineReply("Không tìm thấy kết quả!");

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const member = message.member;
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(message.guildId);
            return message.lineReply("Bot không thể vào phòng của bạn thử lại sau!");
        }
        
        await searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) {
            await queue.play();
            await message.lineReply('Đang chơi **' + searchResult.tracks[0] + "**!");
        } else {
            await message.lineReply('Đã thêm **' + searchResult.tracks[0] + "** vào hàng chờ!");
        }
    }
}