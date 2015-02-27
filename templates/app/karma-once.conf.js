module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      '.test/vendor.js',
      '.test/templates.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '.test/modules.js',
      '.test/app.js',
      '.test/services/**/*.js',
      '.test/directives/**/*.js',
      '.test/filters/**/*.js',
      '.test/config/**/*.js',
      '.test/states/**/*.js',
      '.test/layouts/**/*.js',
      'test/mock/**.js',
      'test/unit/**/**.js'
    ],
    exclude: [
      ".test/app/assets/**",
      ".test/app/config/**"
    ],
    reporters: ['progress', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    htmlReporter: {
      outputDir: 'test/results',
      namedFiles: true
    }
  });
};
