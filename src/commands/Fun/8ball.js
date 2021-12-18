const { default: axios } = require("axios");
const exios = require("axios");

const { aspiversion, apiurl } = require("../../../config");
const { command } = require("./hello");

module.exports = {
	name: "8ball",
	desc: "Ask the bot a question",
	category: "Fun",
	usage: "8ball [question]",
	async command(client, message, args, MessageEmbed) {
		if (!args[3])
			return message.reply({
				content: "Please ask a 3 word or more question!",
				allowedMentions: { repliedUser: false },
			});

		await axios
			.get(`/8ball`, { baseURL: apiurl })
			.then(function (response) {
				if (response.data.Too_many_request)
					return message.reply({
						content: response.data.Too_many_request,
						allowMentions: { repliedUser: false },
					});
				let text = response.data.text;
				message.reply({
					content: text,
					allowedMentions: { repliedUser: false },
				});
			})
			.catch((error) => {
				console.log(error);
				message.reply({
					content: `${
						error.response.data.Too_many_requests
							? error.response.data.Too_many_requests
							: `Error Connecting to the ram api`
					}`,
					allowedMentions: { repliedUser: false },
				});
			});
	},
};
