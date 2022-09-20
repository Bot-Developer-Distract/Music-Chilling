const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});
const downloader = require("@discord-player/downloader").Downloader;
const { Player } = require("discord-player");
require('dotenv').config();

client.commands = new Collection();

client.config = {
    prefix: "!"
};

const player = new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: false,
    leaveOnEmpty: false,
    leaveOnEmptyCooldown: 300000
});

player.use("YOUTUBE_DL", downloader);

client.player = player;

player.on('error', (q, e) => console.log(e, '\nError'));
player.on('connectionError', (q, e) => console.log(e, '\nConnection error'));
module.exports = client;

require('./handler');

client.login(process.env.TOKEN, err => console.log(err));
client.on('error', err => console.log(err));