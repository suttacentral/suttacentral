const { resolve } = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BabelMultiTargetPlugin } = require('webpack-babel-multi-target-plugin');

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
  },
  resolve: {
    mainFields: [
      'es2015',
      'module',
      'main',
    ]
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
    historyApiFallback: {
      disableDotRule: true,
    }
  }
};


const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          BabelMultiTargetPlugin.loader(),
        ]
      }
    ]
  },
  plugins: [
    new BabelMultiTargetPlugin({
      targets: {
        modern: {
          tagAssetsWithKey: false,
        },
        legacy: {
          key: 'es5',
          tagAssetsWithKey: true,
        }
      }
    }),
    new CleanWebpackPlugin(
      [OUTPUT_PATH],
      { verbose: true }
    ),
    new CopyWebpackPlugin([
      'manifest.json',
      'img/**',
      'polyfills/*.js',
      'files/fonts/**',
      'localization/elements/**/*.json',
      'elements/styles/*.json',
      'node_modules/web-animations-js/*.js',
      'node_modules/@webcomponents/**/*.js',
      'node_modules/viewerjs/dist/*.css',
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
      navigateFallbackBlacklist: [/^\/img\/.*/, /^/ebook/.*, /^\/files\/.*/],
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
