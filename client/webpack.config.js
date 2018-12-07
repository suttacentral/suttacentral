const { resolve, join } = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const OUTPUT_PATH = 'build';

const commonConfig = {
  entry: './elements/sc-drawer-layout.js',
  bail: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  output: {
    filename: '[name].js',
    path: resolve(OUTPUT_PATH),
    publicPath: '/'
  }
};


const devConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/esm',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    host: 'sc-frontend',
    port: 3000,
    historyApiFallback: true
  }
};


const prodConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(
      [ OUTPUT_PATH ],
      { verbose: true }
    ),
    new CopyWebpackPlugin([
      'manifest.json',
      'service-worker.js',
      'img/**',
      'polyfills/*.js',
      'files/fonts/**',
      'localization/elements/**/*.json',
      'elements/styles/*.json',
      'node_modules/web-animations-js/*.js',
      'node_modules/@webcomponents/**/*.js',
      'node_modules/viewerjs/dist/*',
      'node_modules/raven-js/dist/*'
    ])
  ]
};


module.exports = env => {
  switch (env) {
    case 'dev':
      return merge(commonConfig, devConfig);
    case 'prod':
      return merge(commonConfig, prodConfig);
    default:
      return {};
  }
};
