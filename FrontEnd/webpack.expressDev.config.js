const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var DISTRIBUTION_DIRECTORY = path.resolve(__dirname, "dist");
var SOURCE_DIRECTORY = path.resolve(__dirname, "src");

var config =
{
	entry: 
	[
		'webpack-hot-middleware/client',
		SOURCE_DIRECTORY + "/app/index.js",
	],

	output: 
	{
		path: DISTRIBUTION_DIRECTORY + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module:
	{
		loaders: 
		[
				{
					test: /\.js?/,
					include: SOURCE_DIRECTORY,
					loader: "babel-loader",
					query:
					{
						presets: ["react", "es2015", "stage-2"]
					}
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract(
						 {
							use:
							[
								{
									loader: 'css-loader',
									options: {importLoaders:1}, //git @import statements first 
								},
								'postcss-loader',
							],
						 }),
				},
		],
	},
	plugins:
	[
		new ExtractTextPlugin('[name].bundle.css'),
		new webpack.HotModuleReplacementPlugin()
	],	
};

module.exports = config;

