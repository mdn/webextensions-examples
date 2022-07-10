/* eslint-env node */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // Each entry in here would declare a file that needs to be transpiled
    // and included in the extension source.
    // For example, you could add a background script like:
    background: 'background.js',
    popup: 'popup.js',
    'navigate-collection': 'navigate-collection.js',
  },
  output: {
    // This copies each source entry into the extension dist folder named
    // after its entry config key.
    path: path.join(__dirname, 'extension', 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      exclude: ['/node_modules/', '!/node_modules/idb-file-storage'],
      test: /\.js$/,
      use: [
        // This transpiles all code (except for third party modules) using Babel.
        {
          // Babel options are in .babelrc
          loader: 'babel-loader',
        },
      ]
    }]
  },
  resolve: {
    // This allows you to import modules just like you would in a NodeJS app.
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    // Since some NodeJS modules expect to be running in Node, it is helpful
    // to set this environment var to avoid reference errors.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  // This will expose source map files so that errors will point to your
  // original source files instead of the transpiled files.
  devtool: 'sourcemap',
};
