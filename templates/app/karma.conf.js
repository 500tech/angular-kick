module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jspm', 'jasmine'],
    jspm: {
      useBundles: true,
      loadFiles: [
        global.karmaBaseDirectory + '/jspm_packages/github/angular/bower-angular-mocks@1.3.14/angular-mocks.js',
        global.karmaBaseDirectory + '/app.js',
        'test/mock/**/*.js',
        'test/unit/**/*.js'
      ],
      serveFiles: [global.karmaBaseDirectory + '/**']
    },
    files: [],
    exclude: [
      global.karmaBaseDirectory + "/app/assets/**",
      global.karmaBaseDirectory + "/app/config/**"
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
