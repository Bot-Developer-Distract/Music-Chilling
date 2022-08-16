const { readdirSync } = require('fs');
const client = require('../index');

// Event handler
readdirSync('./events/').forEach(file => require('../events/' + file));

// Command handler
readdirSync('./commands/').forEach(dir => {
    readdirSync(`./commands/${dir}/`).forEach(file => {
        const pull = require(`../commands/${dir}/${file}`);
        client.commands.set(pull.name, pull);
    });
});

// Slash command handler
readdirSync('./slashCommands/').forEach(dir => {
    const slash = readdirSync(`./slashCommands/${dir}/`);

    slash.forEach(file => {
        const pull = require(`../slashCommands/${dir}/${file}`);

        if(pull.name) {
            client.slashCommands.set(pull.name, pull);
        }
    });
});