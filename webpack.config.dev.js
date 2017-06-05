const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const port = 8080;
const publicPath = `http://localhost:${port}/`;

module.exports = {
  devtool: 'cheap-module-sourcemap',
  target: 'electron-renderer',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './example/renderer.js',
    './example/style.css'
  ],
  output: {
    filename: 'renderer.js',
    path: path.resolve('./build'),
    publicPath
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    new webpack.HotModuleReplacementPlugin()
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    noInfo: true,
    inline: true,
    hot: true,
    setup() {
      spawn('npm', ['run', 'electron'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    }
  }
};
