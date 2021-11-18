const { run } = require("./ready");

module.exports = {
	name: "msg",
	async run(message, client) {
		if (message.author.bot) return;
		let prefix = client.config.prefix;
		if (!message.content.toLowerCase().startsWith(prefix)) return;

		let args = message.content.substring(prefix.length).split(" ");

		const extras = {
			hello: "Hello",
		};

		const cmd = args[0].toLowerCase();
		const command = client.commands.get(`${cmd}`);
		if (!command) return;
		command.command(client, message, args, extras);
	},
};
