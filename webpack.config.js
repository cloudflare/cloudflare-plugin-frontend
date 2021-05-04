var webpack = require('webpack');

var isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  output: {
    path: __dirname,
    filename: process.env.OUTPUT_PATH
      ? process.env.OUTPUT_PATH
      : './compiled.js'
  },
  watch: isDev,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
