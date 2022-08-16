const client = require('../index');

client.on('ready', async () => {
    client.application.commands.set(client.slashCommands);

    console.log("Bot online!");
});