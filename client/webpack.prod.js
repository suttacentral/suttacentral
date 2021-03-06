const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(require('./webpack.common'), {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
