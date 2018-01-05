module.exports = (config) ->

  config.set

    basePath: __dirname

    client:
      mocha:
        reporter: 'html'
        ui: 'bdd'

    files: ['test/**/*.js']
    frameworks: ['mocha']

    preprocessors:
      'test/**/*.js': ['webpack']

    reporters: ['dots']

    webpack:
      module:
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
      resolve:
        alias:
          'power-assert': 'power-assert/build/power-assert'
