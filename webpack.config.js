var webpack = require('webpack');

var isDev = process.env.NODE_ENV !== 'production';
var plugins = [];

if (!isDev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: isDev,
      mangle: false
    })
  );
}

module.exports = {
  entry: './src/index.js',
  devtool: isDev ? 'cheap-module-source-map' : false,
  output: {
    path: __dirname,
    filename: process.env.OUTPUT_PATH
      ? process.env.OUTPUT_PATH
      : './compiled.js'
  },
  watch: isDev,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
};
