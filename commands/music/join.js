const { joinVoiceChannel } = require('@discordjs/voice');
const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "join",
    description: "Tham gia phòng thoại của bạn",
    type: ApplicationCommandType.ChatInput,
    category: "music",

    async execute(client, interaction) {
        if (interaction.member.voice.channel && interaction.member.voice.channel == interaction.guild.members.me.voice.channel) return;

        await interaction.reply('Đã tham gia voice của bạn!');

        joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
    }
}