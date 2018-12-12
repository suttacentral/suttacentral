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
      },
      {
        test: /\.json$/,
        type: 'json',
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
      'node_modules/raven-js/dist/*'
    ])
  ]
};

const swConfig = {
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: 'service-worker.js',
      swDest: 'sw-generated.js',
      importWorkboxFrom: 'disabled',
      globDirectory: '.',
      globPatterns: [
          'elements/styles/*.json',
          'localization/elements/**/en.json',
          'img/pray.png',
          'img/*.svg',
          'files/fonts/RaloksPE-Bold_3.007.woff2',
          'files/fonts/RaloksPE-Regular_3.007.woff2',
          'files/fonts/RaloksSansPE-Bd_2.004.woff2',
          'files/fonts/RaloksSansPE-It_2.004.woff2',
          'files/fonts/RaloksSansPE-Rg_2.004.woff2'
      ],
        globIgnores: [
          'node_modules/webcomponents/*',
          'elements/static-templates/*'
      ]
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
