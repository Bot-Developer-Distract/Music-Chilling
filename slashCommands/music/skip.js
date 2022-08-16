const { ApplicationCommandType } = require("discord.js")

module.exports = {
    name: "skip",
    description: "Bỏ qua bài hát trong hàng đợi",
    type: ApplicationCommandType.ChatInput,
    category: "music",

    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return await interaction.reply("Không có bài hát nào trong hàng chờ.");

        const currentTrack = queue.current;
        const success = queue.skip();
        interaction.reply(success ? "Đã bỏ qua bài **" + currentTrack + "**" : "Có gì đó sai sai thử lại sau!");
    }
}