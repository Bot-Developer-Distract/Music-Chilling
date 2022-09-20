const { ApplicationCommandType } = require("discord.js")

module.exports = {
    name: "stop",
    description: "Dừng chơi nhạc",
    type: ApplicationCommandType.ChatInput,
    category: "music",

    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue)
            return interaction.reply({ content: "Không có bài hát nào đang được phát cả!" });

        queue.destroy();
        interaction.reply("Đã ngưng phát nhạc!");
    }
}