const { Client, Intents, Collection } = require("discord.js");
const { version } = require("../config");
const { token } = require("../secure/token");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.events = new Collection();
client.commands = new Collection();

["events", "command"].forEach((hand) => {
	require(`./utils/${hand}`)(client);
});

client.on("ready", async () => {
	await client.events.get("ready").run(version);
});

client.login(token);
