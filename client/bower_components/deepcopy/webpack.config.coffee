webpack = require 'webpack'

module.exports =

  context: __dirname

  target: 'web'

  entry: './index.js'

  output:
    path: __dirname
    chunkFilename: 'chunk-[id].js'
    library: ['deepcopy']
    libraryTarget: 'umd'

  module:
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]

  node:
    Buffer: false

  resolve:
    extensions: [
      ''
      '.js'
    ]
    modulesDirectories: [
      'node_modules'
    ]

  plugins: [
    new webpack.BannerPlugin(
      '''
      @license deepcopy.js Copyright(c) 2013 sasa+1
      https://github.com/sasaplus1/deepcopy.js
      Released under the MIT license.
      '''
    ,
      options:
        raw: false
        entryOnly: true
    )
    new webpack.NoErrorsPlugin
    new webpack.IgnorePlugin(/vertx/)
    new webpack.optimize.OccurenceOrderPlugin
    new webpack.optimize.DedupePlugin
    new webpack.optimize.AggressiveMergingPlugin
  ]
