module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'components/traceur-runtime/traceur-runtime.js',
      '.test/dependencies.js',
      '.test/templates.js',
      'components/angular-mocks/angular-mocks.js',
      '.test/modules.js',
      '.test/app.js',
      '.test/services/**/*.js',
      '.test/directives/**/*.js',
      '.test/filters/**/*.js',
      '.test/config/**/*.js',
      '.test/states/**/*.js',
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
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    htmlReporter: {
      outputDir: 'test/results',
      namedFiles: true
    }
  });
};
