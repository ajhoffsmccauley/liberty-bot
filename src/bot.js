const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const { version, prefix } = require("../config");
const { token, mongourl } = require("../secure/token");
const mongoose = require("mongoose");

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.events = new Collection();
client.commands = new Collection();

["event", "command"].forEach((hand) => {
	require(`./utils/${hand}`)(client);
});

mongoose
	.connect(mongourl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then(console.log("Mongo Activated.. On Bot!"));

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
