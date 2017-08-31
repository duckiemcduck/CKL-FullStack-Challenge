const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var DISTRIBUTION_DIRECTORY = path.resolve(__dirname, "dist");
var SOURCE_DIRECTORY = path.resolve(__dirname, "src");
module.exports = 
{
  devtool: 'source-map',
  entry: SOURCE_DIRECTORY + '/app/index.js',
  output: 
  {
    path: DISTRIBUTION_DIRECTORY + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  plugins: 
  [
    new webpack.optimize.UglifyJsPlugin
	({
        minimize: true,
        compress: 
		{
        	warnings: false
      	}
    })
  ],
  module: 
  {
    loaders: 
	[{
    	test: /.jsx?$/,
    	loader: 'babel-loader',
    	include: SOURCE_DIRECTORY,
    	exclude: /node_modules/,
		query: 
		{
			presets: ['es2015', 'react', "stage-2"]
		}

     },
	 {	
		test: /\.css$/,
		use: ExtractTextPlugin.extract
		({
			use:
			[
				{
					loader: 'css-loader',
					options: {importLoaders:1}, //git @import statements first 
				},
				'postcss-loader',
			],
		}),
	
	}],
  },
  plugins:
  [
	new ExtractTextPlugin('[name].bundle.css'),
  ],	
};