const { readdirSync } = require('fs');
const client = require('../index');

// Event handler
readdirSync('./events/').forEach(file => require('../events/' + file));

// Slash command handler
readdirSync('./commands/').forEach(dir => {
    const slash = readdirSync(`./commands/${dir}/`);

    slash.forEach(file => {
        const pull = require(`../commands/${dir}/${file}`);

        if(pull.name) {
            client.commands.set(pull.name, pull);
        }
    });
});