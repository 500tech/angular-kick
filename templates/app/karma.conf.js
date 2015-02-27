module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      '.tmp/vendor.js',
      '.tmp/templates.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '.tmp/modules.js',
      '.tmp/app.js',
      '.tmp/services/**/*.js',
      '.tmp/directives/**/*.js',
      '.tmp/filters/**/*.js',
      '.tmp/config/**/*.js',
      '.tmp/states/**/*.js',
      '.tmp/layouts/**/*.js',
      'test/mock/**.js',
      'test/unit/**/**.js'
    ],
    exclude: [
      ".tmp/app/assets/**",
      ".tmp/app/config/**"
    ],
    reporters: ['progress', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    htmlReporter: {
      outputDir: 'test/results',
      namedFiles: true
    }
  });
};
