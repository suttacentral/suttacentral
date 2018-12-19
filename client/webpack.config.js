const { resolve } = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


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
    public: 'localhost',
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
      'node_modules/raven-js/dist/*',
      'node_modules/workbox-sw/build/*.js',
    ])
  ]
};

const swConfig = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw-generated.js',
      importWorkboxFrom: 'disabled',
      skipWaiting: true,
      clientsClaim: true,
      importScripts: ['node_modules/workbox-sw/build/workbox-sw.js'],
      runtimeCaching: [
        {
          urlPattern: new RegExp('/api/(.*)'),
          handler: 'networkFirst',
        },
        {
          urlPattern: new RegExp('/node_modules/(.*)'),
          handler: 'networkFirst',
        },
        {
          urlPattern: new RegExp('/(?:img|files)/(.*)'),
          handler: 'cacheFirst',
          options: {
            cacheName: "assets",
            expiration: {
                maxAgeSeconds: 7 * 24 * 60 * 60
            },
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: new RegExp('^https://(?:js|m).stripe.com/(.*)'),
          handler: 'cacheFirst',
        },
      ],
      navigateFallback: '/index.html',
      navigateFallbackBlacklist: [/^\/img\/.*/, /^\/files\/.*/],
      exclude: [/\.(woff(2)?|ttf)$/, /node_modules\//, /img\/.*(?<!\.svg)$/],
    })
  ]
};


module.exports = env => {
  switch (env) {
    case 'dev':
      return merge(commonConfig, devConfig, swConfig);
    case 'prod':
      return merge(commonConfig, prodConfig, swConfig);
    default:
      return {};
  }
};
