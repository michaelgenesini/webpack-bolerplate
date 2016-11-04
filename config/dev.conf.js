// webpack.config.js
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = ({
	entry: [
		'./src/index.js',
	],
	output: {
		path: './public/assets/js/',
		filename: '/main.min.js',
		library: 'App',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: ['babel'],
				query: {
					presets: ['es2015'],
				}
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
			},
			{
				test: /\.(jpg|png|otf|eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=public/assets/fonts/[name].[ext]'
			}
		],
		plugins: [
			new ExtractTextPlugin("style.css", {allChunks: false}),
			new DashboardPlugin({ port: 3001 })
		],
		noParse: /node_modules\/quill\/dist/,
	},
	watch: false,
	devtool: 'source-map',
});
