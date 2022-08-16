const { joinVoiceChannel } = require('@discordjs/voice');
const { ApplicationCommandType } = require("discord.js")

module.exports = {
    name: "leave",
    description: "Thoát khỏi phòng thoại",
    type: ApplicationCommandType.ChatInput,
    category: "music",

    async execute(client, interaction) {
        if(!interaction.member.voice.channel && interaction.member.voice.channel !== interaction.guild.me.voice.channel)
            return await interaction.reply("Bot không ở trong voice của bạn!");

        await interaction.reply("Đã thoát khỏi voice của bạn!");

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        connection.destroy();
    }
}