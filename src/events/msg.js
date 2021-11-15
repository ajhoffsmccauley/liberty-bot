const { run } = require("./ready");

module.exports = {
	name: "msg",
	async run(message, client) {
		if (message.author.bot) return;
		let prefix = client.config.prefix;
		if (!message.content.toLowerCase().startsWith(prefix)) return;

		let args = message.content.substring(prefix.length).split(" ");

		switch (args[0]) {
			case "hello":
				message.reply({
					content: "hello",
					allowedMentions: { repliedUser: false },
				});
				break;
		}
	},
};
