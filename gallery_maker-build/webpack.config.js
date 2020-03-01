const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
				  {
					loader: "html-loader"
				  }
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]
	  },
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js'
	  },
	plugins: [    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })]
};