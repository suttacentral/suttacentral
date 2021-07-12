const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
    new WorkboxPlugin.GenerateSW({
      cacheId: 'SuttaCentral PWA',
      swDest: 'sw-generated.js',
      skipWaiting: true,
      clientsClaim: true,
      importScripts: ['node_modules/workbox-sw/build/workbox-sw.js'],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: new RegExp('/api/((?!ebook).*)'),
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: /\.(?:js|css|html|map|json|ico)$/,
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('/node_modules/(.*)'),
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('/search'),
          handler: 'NetworkFirst',
        },
        {
          urlPattern: new RegExp('/(?:img|files)/(.*)'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets',
            expiration: {
              maxAgeSeconds: 7 * 24 * 60 * 60,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: new RegExp('^https://(?:js|m).stripe.com/(.*)'),
          handler: 'CacheFirst',
        },
      ],
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [/^\/img\/.*/, /^\/ebook\/.*/, /^\/api\/.*/, /^\/files\/.*/],
      exclude: [/\.(woff(2)?|ttf|epub)$/, /node_modules\//, /img\/.*(?<!\.svg)$/],
    }),
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
              ['@babel/plugin-proposal-class-properties', { loose: true }],
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
