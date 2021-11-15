const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const { version, prefix } = require("../config");
const { token } = require("../secure/token");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.events = new Collection();
client.commands = new Collection();

["event"].forEach((hand) => {
	require(`./utils/${hand}`)(client);
});

client.on("ready", async () => {
	await client.events.get("ready").run(version);
});

client.on("messageCreate", async (message) => {
	client.config = {
		prefix,
		version,
	};
	await client.events.get("msg").run(message, client);
});

client.login(token);
