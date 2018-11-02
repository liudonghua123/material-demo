const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

export default (config, env, helpers) => {
	config.target = 'electron-renderer';
	if (env.production) {
		config.output.publicPath = env.pkg.homepage;
		let { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
		plugin.definitions.PUBLIC_PATH = env.pkg.homepage;
	}
	
	const uglifyJsPlugin = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
	if (uglifyJsPlugin) {
		const { index } = uglifyJsPlugin;
		config.plugins.splice(index, 1, new UglifyJsPlugin());
	}
};
