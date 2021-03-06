const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const OUTPUT_PATH = 'build';

module.exports = {
  entry: {
    main: './elements/sc-site-layout.js',
  },
  output: {
    filename: '[name].js',
    path: resolve(OUTPUT_PATH),
    publicPath: '/',
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
      swDest: 'sw-generated.js',
      skipWaiting: true,
      clientsClaim: true,
      importScripts: ['node_modules/workbox-sw/build/workbox-sw.js'],
      runtimeCaching: [
        {
          urlPattern: new RegExp('/api/((?!ebook).*)'),
          handler: 'NetworkFirst',
        },
        {
          urlPattern: new RegExp('/node_modules/(.*)'),
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
