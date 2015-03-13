module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jspm', 'jasmine'],
    jspm: {
      useBundles: true,
      loadFiles: [
        '.tmp/jspm_packages/github/angular/bower-angular-mocks@1.3.14/angular-mocks.js',
        '.tmp/app.js',
        'test/mock/**/*.js',
        'test/unit/**/*.js'
      ],
      serveFiles: ['.tmp/**']
    },
    files: [],
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
