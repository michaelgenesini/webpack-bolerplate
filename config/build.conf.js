// webpack.config.js
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = ({
  entry: [
    './src/index.js',
		'./src/sass/main.sass'
  ],
  output: {
    path: './public/assets/js/',
    filename: '/main.min.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
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
				loader: 'file?name=assets/fonts/[name].[ext]'
			}
    ],
    noParse: /node_modules\/quill\/dist/,
  },
	plugins: [
		new ExtractTextPlugin("/assets/css/caffeina.min.css", {allChunks: false}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'isomorphic-fetch',
      'Map': 'core-js/fn/map',
      'Symbol': 'core-js/fn/symbol',
      'Promise': 'core-js/fn/promise',
      'Object.assign': 'core-js/fn/object/assign'
    }),
  ],
  watch: false,
  devtool: 'source-map',
});
