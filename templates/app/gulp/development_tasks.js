"use strict";

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var run         = require('run-sequence');
var url         = require('url');
var proxy       = require('proxy-middleware');
var modRewrite  = require('connect-modrewrite');
var browserSync = require('browser-sync');
var karma       = require('karma').server;
var streams     = require('stream-series');

var common      = require('./common');
var sources     = common.sources;
var setENV      = common.setENV;
var destination = common.destinations.development;
var ENV = ENV || setENV['development'];

var catchError = function (err) {
  plugins.util.beep();
  return console.log(err);
};

module.exports = {
  clean: function () {
    return gulp.src(destination, { read: false })
      .pipe(plugins.rimraf());
  },

  setEnvironment: function () {
    var environment = process.argv[3].replace(/^--/, '');
    if (setENV[environment]) {
      console.log('Setting ENV to ' + environment);
      ENV = setENV[environment];
    } else {
      throw 'Environment "' + environment + '" was not found in environments.js file';
    }
  },

  fonts: function () {
    return gulp.src(sources.fonts, { base: sources.base })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(gulp.dest(destination));
  },

  styles: function () {
    return gulp.src(sources.mainStyle, { base: sources.base })
      .pipe(plugins.changed(destination, {
        hasChanged: plugins.changed.compareSha1Digest
      }))
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(destination));
  },

  index: function () {
    var app         = gulp.src(sources.app, { read: false });
    var modules     = gulp.src(sources.modules, { read: false });
    var configs     = gulp.src(sources.configs, { read: false });
    var directives  = gulp.src(sources.directives, { read: false });
    var filters     = gulp.src(sources.filters, { read: false });
    var services    = gulp.src(sources.services, { read: false });
    var controllers = gulp.src(sources.controllers, { read: false });
    var vendorFiles = gulp.src(sources.vendorFiles, { read: false });

    return gulp.src(sources.index)
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.inject(streams(vendorFiles, modules, app, configs, directives, filters, services, controllers), { relative: true }))
      .pipe(plugins.replace(/\.\.\//g, ''))
      .pipe(plugins.replace('app/', ''))
      .pipe(gulp.dest(destination));
  },

  views: function () {
    return gulp.src(sources.views, { base: sources.base })
      .pipe(plugins.changed(destination, {
        hasChanged: plugins.changed.compareSha1Digest
      }))
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
      .pipe(gulp.dest(destination))
  },

  images: function () {
    return gulp.src(sources.images, { base: sources.base })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(gulp.dest(destination));
  },

  vendor: function () {
    return gulp.src(sources.vendorFiles, { base: sources.base })
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(gulp.dest(destination + '/vendor'));
  },

  vendorConcat: function () {
    return gulp.src(sources.vendor)
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.include({ extensions: ['js'] }))
      .pipe(gulp.dest(destination));
  },

  scripts: function () {
    return gulp.src(sources.scripts)
      .pipe(plugins.changed(destination, {
        hasChanged: plugins.changed.compareSha1Digest
      }))
      .pipe(plugins.plumber({ errorHandler: catchError }))
      .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.traceur({ modules: 'register' }))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(destination));
  },

  test: function () {
    destination = common.destinations.test;
    return run('clean', 'vendorConcat', 'scripts', 'styles', 'images', 'views', 'index', 'fonts', 'testOnce', 'clean');
  },

  testEnv: function () {
    return run('setEnvironment', 'test');
  },

  server: function () {
    return run('clean', 'vendorConcat', 'vendor', 'scripts', 'styles', 'images', 'views', 'index', 'fonts', 'serve');
  },

  serverTdd: function () {
    return run('server', 'tdd');
  },

  serverEnv: function () {
    return run('setEnvironment', 'server');
  },

  serverEnvTdd: function () {
    return run('setEnvironment', 'server:tdd');
  },

  tdd: function (done) {
    return karma.start({
      configFile: __dirname + '/../karma.conf.js',
      singleRun: false
    }, done);
  },

  testOnce: function (done) {
    return karma.start({
      configFile: __dirname + '/../karma-once.conf.js',
      singleRun: true
    }, done);
  },

  reloadScripts: function () { return run('scripts', 'views', 'index');},
  reloadViews : function ()  { return run('views', 'index');},
  reloadStyles: function ()  { return run('styles', 'index');},

  serve: function () {
    var proxyOptions;
    proxyOptions = url.parse(ENV['API_URL']);
    proxyOptions.route = '/api';
    browserSync({
      browser: ['google chrome', 'chrome'],
      notify: false,
      port: 3001,
      server: {
        baseDir: '.tmp',
        middleware: [proxy(proxyOptions), modRewrite(['!\\.\\w+$ /app.html [L]'])]
      }
    });
    gulp.watch(sources.scripts, ['reloadScripts', browserSync.reload]);
    gulp.watch(sources.views,   ['reloadViews',   browserSync.reload]);
    gulp.watch(sources.index,   ['reloadViews',   browserSync.reload]);
    gulp.watch(sources.styles,  ['reloadStyles',  browserSync.reload]);
  }
};
