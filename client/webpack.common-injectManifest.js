const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const OUTPUT_PATH = 'build';

module.exports = {
  entry: {
    main: './elements/sc-site-layout.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(OUTPUT_PATH),
    publicPath: '/',
  },
  resolve: {
    mainFields: ['es2015', 'module', 'main'],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new InjectManifest({
      swSrc: './service-worker.js',
      swDest: 'service-worker.js',
      exclude: [/\.(woff(2)?|ttf|epub)$/, /node_modules\//, /img\/.*(?<!\.svg)$/],
    }),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: [
              ['@babel/plugin-proposal-class-static-block'],
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/plugin-transform-runtime'],
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              ['@babel/plugin-proposal-function-bind'],
              ['@babel/plugin-proposal-do-expressions'],
              ['@babel/plugin-proposal-throw-expressions'],
              ['@babel/plugin-proposal-async-do-expressions'],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
            },
          },
        ],
      },
    ],
  },
};
