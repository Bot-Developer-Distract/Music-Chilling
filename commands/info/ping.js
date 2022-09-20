const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Xem websocket ping của bot",
    type: ApplicationCommandType.ChatInput,
    category: "info",

    async execute(client, interaction, args) {
        await interaction.reply({ content: "Pong! *" + client.ws.ping + "ms*.", ephemeral: true });
    }
}