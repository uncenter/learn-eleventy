const fs = require('fs');

const defaultConfig = {
	title: 'Notes',
	description: 'Notes app',
	theme: {
		color: 'sky',
	},
	sidebar: {
		links: [],
		notes: [{}],
	},
};

module.exports = function () {
	const configPath = './../app.json';

	if (!fs.existsSync(configPath)) return defaultConfig;

	const customConfig = JSON.parse(fs.readFileSync(configPath));
	let mergedConfig = mergeConfigs(defaultConfig, customConfig);
	const date = new Date();
	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	};
	mergedConfig.now = new Intl.DateTimeFormat('en-US', options).format(date);
	return mergedConfig;
};

function mergeConfigs(a, b) {
	return {
		...a,
		...b,
		theme: {
			...a.theme,
			...b.theme,
		},
		sidebar: {
			...a.sidebar,
			...b.sidebar,
		},
	};
}
