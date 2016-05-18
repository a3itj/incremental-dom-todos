
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
	devtool: 'cheap-module-source-map',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
        new ExtractTextPlugin("main.css")
	],
    postcss: function() {
      return [autoprefixer({
        browsers: ['last 3 versions']
      })];
  },
	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js$/,
			exclude: /(node_modules)/,
			// include: [path.resolve(__dirname, 'src', 'js')],
			query: {
				plugins: ['transform-runtime', 'incremental-dom'],
				presets: ['es2015']
			}
		}, {
			loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less'),
			test: /\.css$/,
			include: [path.resolve(__dirname, 'src', 'css')]
		}]
	}
};
