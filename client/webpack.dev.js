const { merge } = require('webpack-merge');

module.exports = merge(require('./webpack.common-injectManifest'), {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    public: 'localhost',
    host: 'sc-frontend',
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
  },
  performance: {
    hints: 'warning',
  },
});
