const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(require('./webpack.common'), {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
    chunkIds: 'deterministic',
    moduleIds: 'deterministic',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
    }),
    new CopyPlugin({
      patterns: [
        'manifest.json',
        'img/**',
        'files/map-data.json',
        'files/fonts/**',
        {
          context: 'localization/elements/build/',
          from: '*.json',
          to: 'localization/elements/',
          force: true,
        },
        'elements/styles/*.json',
        'node_modules/web-animations-js/*.js',
        'node_modules/@webcomponents/**/*.js',
        'node_modules/viewerjs/dist/*.css',
        'node_modules/workbox-sw/build/*.js',
      ],
    }),
  ],
});
