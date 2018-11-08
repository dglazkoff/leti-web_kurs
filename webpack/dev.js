const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mergeConfigs = require('./utils/mergeConfigs');
const config = require('./common');

const rootDir = join(__dirname, '../');

const devConfig = {
  devtool: 'eval',
  devServer: {
    contentBase: join(rootDir, 'static'),
    host: '0.0.0.0',
    port: 8000,
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },
};

module.exports = mergeConfigs(config, devConfig);
