module.exports = function(config) {
  config.set({
    basePath: '',

    plugins: [
      require('karma-webpack'),
      'karma-jasmine',
      'karma-osx-reporter',
      'karma-clear-screen-reporter',
      'karma-mocha-reporter',
      'karma-chrome-launcher'
    ],

    frameworks: ['jasmine'],

    webpack: {
      resolve: {
        root: [__dirname + '/app']
      },

      modules: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
          { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
          { test: /\.css$/, loaders: ['style', 'css'] },
          { test: /\.json$/, loader: 'json' }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    },

    files: [
      './app/test.js'
    ],

    proxies: {
      '/assets': '/assets'
    },

    preprocessors: {
      './app/test.js': ['webpack']
    },

    exclude: [
      global.karmaBaseDirectory + "/app/assets/**",
      global.karmaBaseDirectory + "/app/config/**"
    ],

    mochaReporter: {
      output: 'minimal'
    },

    reporters: ['osx', 'clear-screen', 'mocha'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
