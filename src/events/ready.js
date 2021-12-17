const axios = require("axios");
const { createLogger, format, transports, level } = require("winston");
const { consoleFormat } = require("winston-console-format");
const { apiurl } = require("../../config");

const logger = createLogger({
	level: "silly",
	format: format.combine(
		format.timestamp(),
		format.ms(),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: "Test" },
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
				format.padLevels(),
				consoleFormat({
					showMeta: true,
					metaStrip: ["timestamp", "service"],
					inspectOptions: {
						depth: Infinity,
						colors: true,
						maxArrayLength: Infinity,
						breakLength: 120,
						compact: Infinity,
					},
				})
			),
		}),
	],
});
module.exports = {
	name: "ready",
	async run(version) {
		console.log(`Ready! On Version: ${version}`);

		await axios
			.get(`/version`, {
				baseURL: apiurl,
			})
			.then(function (response) {
				let apiversion = response.data.version;
				let ifSupported = response.data.supported;
				let ifOutdated = response.data.outdated;
				let latest = response.data.latest;

				if (ifOutdated) {
					if (!ifSupported)
						return logger.error(
							`${apiversion} is no longer supported the lates version is ${latest}`
						);
					return logger.warn(
						`${apiversion} is outdated but is still supported the latest version is ${latest}`
					);
				} else {
					logger.silly(`${apiversion} matches latest verstion`);
				}
			})
			.catch((error) => {
				logger.error(error);
			});
	},
};
