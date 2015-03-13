module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jspm', 'jasmine'],
    jspm: {
      useBundles: true,
      loadFiles: [
        '.test/jspm_packages/github/angular/bower-angular-mocks@1.3.14/angular-mocks.js',
        '.test/app.js',
        'test/mock/**/*.js',
        'test/unit/**/*.js'
      ],
      serveFiles: ['.test/**']
    },
    files: [],
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
