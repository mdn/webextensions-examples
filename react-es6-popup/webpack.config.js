const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    popup: './src/popup',
  },
  output: {
    path: 'extension/dist',
    filename: '[name].js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      // babel options are in .babelrc
      loaders: ['babel'],
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname),
    ],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  devtool: 'sourcemap',
};
