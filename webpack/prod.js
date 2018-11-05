const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mergeConfigs = require('./utils/mergeConfigs');
const config = require('./common');

const prodConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
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
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        booleans: false,
        unused: false,
      },
    }),
  ],
};

module.exports = mergeConfigs(config, prodConfig);
