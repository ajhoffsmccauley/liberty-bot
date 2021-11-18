const { readdirSync } = require("fs");
module.exports = (client) => {
	readdirSync("./src/commands/").forEach((dir) => {
		const commands = readdirSync(`./src/commands/${dir}/`).filter((f) =>
			f.endsWith(".js")
		);

		for (let file of commands) {
			let pull = require(`../commands/${dir}/${file}`);

			client.commands.set(pull.name, pull);
			console.log(`Loaded command: ${file}`);
		}
	});
};
