const { readdirSync } = require("fs");

module.exports = (client) => {
	const events = readdirSync("./src/events/").filter((f) => f.endsWith("js"));
	for (let file of events) {
		let pull = require(`../events/${file}`);
		client.events.set(pull.name, pull);
		console.log(`Loaded Event: ${file}`);
	}
};
