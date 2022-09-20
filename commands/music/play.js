const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js")
const { QueryType } = require('discord-player');

module.exports = {
    name: "play",
    description: "Chơi nhạc",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "input",
            type: ApplicationCommandOptionType.String,
            description: "Nhập nhạc bạn muốn nghe",
            required: true
        }
    ],
    category: 'music',

    async execute(client, interaction) {
        const query = interaction.options.getString("input");

        await interaction.deferReply();

        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.author,
                searchEngine: QueryType.AUTO
            })
            .catch(err => {
                console.log(err)
            });
        if (!searchResult || !searchResult.tracks.length) return await interaction.reply("Không tìm thấy kết quả!");

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        const member = interaction.member;
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(interaction.guildId);
            return await interaction.followUp("Bot không thể vào phòng của bạn thử lại sau!");
        }

        await searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) {
            await queue.play();
            await interaction.followUp('Đang chơi **' + searchResult.tracks[0] + "**!");
        } else {
            await interaction.followUp('Đã thêm **' + searchResult.tracks[0] + "** vào hàng chờ!");
        }
    }
}
