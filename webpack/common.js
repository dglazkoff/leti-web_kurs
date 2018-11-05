const { join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = join(__dirname, '../');

module.exports = {
  entry: {
    /*
      each entry's resulting bundle size should not be more than 250kb,
      more info here: https://github.com/webpack/webpack/issues/3216
    */
    'demo-feature': join(rootDir, './src/demo-feature/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: join(rootDir, './build'),
    publicPath: '/',
    filename: './[name].js',
    sourceMapFilename: '[file].map?[hash]',
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_ENV: process.env.NODE_ENV === 'development',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin({
      filename: './[name].css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      src: join(rootDir, './src'),
    },
  },
};
