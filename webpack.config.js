const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: path.join(__dirname, 'src'),
        query: {
          presets: 'es2015',
        },
      }
    ]
  },
  plugins: [new webpack.NoErrorsPlugin()],
  stats: {colors: true},
  devtool: 'source-map',
};

