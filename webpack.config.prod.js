const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
  target: 'electron',
  entry: './src',
  output: {
    filename: 'index.js',
    path: path.resolve('./build'),
    libraryTarget: 'commonjs2'
  },
  externals: ['react', 'prop-types'],
  plugins: [
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
