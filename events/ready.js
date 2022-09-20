const client = require('../index');

client.on('ready', async () => {
    client.application.commands.set(client.commands);

    console.log("Bot online!");
});