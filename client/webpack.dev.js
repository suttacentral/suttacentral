const { merge } = require('webpack-merge');

module.exports = merge(require('./webpack.common'), {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    public: 'localhost',
    host: 'sc-frontend',
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  performance: {
    hints: 'warning',
  },
});
