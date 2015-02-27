"use strict";

var gulp        = require('gulp');
var del         = require('del');
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
var ENV         = ENV || setENV['development'];
var errorRaised = false;

module.exports = {
  clean:          clean,
  setEnvironment: setEnvironment,
  fonts:          fonts,
  styles:         styles,
  vendorStyles:   vendorStyles,
  index:          index,
  views:          views,
  images:         images,
  vendorJS:       vendorJS,
  vendorJSConcat: vendorJSConcat,
  scripts:        scripts,
  test:           test,
  testEnv:        testEnv,
  server:         server,
  serverTdd:      serverTdd,
  serverEnv:      serverEnv,
  serverEnvTdd:   serverEnvTdd,
  tdd:            tdd,
  testOnce:       testOnce,
  reloadScripts:  reloadScripts,
  reloadViews:    reloadViews,
  reloadStyles:   reloadStyles,
  serve:          serve
};

function catchError(err) {
  plugins.util.beep();
  console.log(err);
  errorRaised = true;

  return gulp.src(sources.index)
    .pipe(plugins.inject(gulp.src(sources.error), {
      starttag: '<body>',
      endtag: '</body>',
      transform: function (filename, file) {
        if (err.plugin) {
          return file.contents.toString('utf8')
            .replace('%%MESSAGE%%', err.message)
            .replace('%%FILENAME%%', err.fileName)
            .replace('%%PLUGIN%%', err.plugin);
        } else {
          return file.contents.toString('utf8')
            .replace('%%MESSAGE%%', err.message + ' (line: ' + err.line + ' column: ' + err.column + ')')
            .replace('%%FILENAME%%', err.file)
            .replace('%%PLUGIN%%', 'gulp-sass');
        }
      }
    }))
    .pipe(gulp.dest(destination));
}

function clean(done) {
  return del(destination, done);
}

function setEnvironment() {
  var environment = process.argv[3].replace(/^--/, '');
  if (setENV[environment]) {
    console.log('Setting ENV to ' + environment);
    ENV = setENV[environment];
  } else {
    throw 'Environment "' + environment + '" was not found in environments.js file';
  }
}

function fonts() {
  return gulp.src(sources.fonts, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(gulp.dest(destination));
}

function styles() {
  return gulp.src(sources.styleFiles, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.include({ extensions: ['scss', 'css'] }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      onError: catchError
    }))
    .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(destination));
}

function vendorStyles() {
  return gulp.src(sources.vendor.styles, {base: sources.base})
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.include({ extensions: ['scss', 'css'] }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      onError: catchError
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(destination + '/vendor'));
}

function index() {
  if (errorRaised) {
    errorRaised = false;
    return;
  }

  var app = gulp.src(sources.app, {read: false});
  var modules = gulp.src(sources.modules, {read: false});
  var configs = gulp.src(sources.configs, {read: false});
  var directives = gulp.src(sources.directives, {read: false});
  var filters = gulp.src(sources.filters, {read: false});
  var models = gulp.src(sources.models, {read: false});
  var services = gulp.src(sources.services, {read: false});
  var controllers = gulp.src(sources.controllers, {read: false});
  var vendorScripts = sources.vendor.scripts.map(function (file) {
    if (file.match(/^\.\./)) {
      return file;
    } else {
      return destination + '/' + file;
    }
  });
  var vendorStyles = gulp.src(sources.vendor.styles, {read: false});
  var styleFiles = sources.styleFiles.map(function (file) {
    return destination + '/' + file.replace('app/', '').replace('scss', 'css');
  });
  styleFiles = gulp.src(styleFiles, {read: false});
  vendorScripts = gulp.src(vendorScripts, {read: false});

  return gulp.src(sources.index)
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.inject(streams(vendorStyles, styleFiles, vendorScripts, modules, app, configs, directives, filters, models, services, controllers)))
    .pipe(plugins.replace(/\.\.\//g, ''))
    .pipe(plugins.replace('app/', ''))
    .pipe(plugins.replace(destination + '/', ''))
    .pipe(gulp.dest(destination));
}

function views() {
  return gulp.src(sources.views, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(gulp.dest(destination))
}

function images() {
  return gulp.src(sources.images, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(gulp.dest(destination));
}

function vendorJS() {
  return gulp.src(sources.vendor.scripts, {base: sources.base})
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(gulp.dest(destination + '/vendor'));
}

function vendorJSConcat() {
  return gulp.src(sources.vendor.scriptsFile)
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.include({extensions: ['js']}))
    .pipe(gulp.dest(destination));
}

function scripts() {
  return gulp.src(sources.scripts)
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.replaceTask({patterns: [{json: ENV}]}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.traceur({modules: 'register'}))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(destination));
}

function test() {
  destination = common.destinations.test;
  return run('dev:clean', 'dev:vendorJSConcat', 'dev:scripts', 'dev:vendorStyles', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts', 'dev:index', 'dev:testOnce', 'dev:clean');
}

function testEnv() {
  return run('dev:setEnvironment', 'dev:test');
}

function server() {
  return run('dev:clean', ['dev:vendorJSConcat', 'dev:vendorJS', 'dev:scripts', 'dev:vendorStyles', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts'], 'dev:index', 'dev:serve');
}

function serverTdd() {
  return run('dev:clean', 'dev:vendorJSConcat', 'dev:vendorJS', 'dev:scripts', 'dev:vendorStyles', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts', 'dev:index', 'dev:serve', 'dev:tdd');
}

function serverEnv() {
  return run('dev:setEnvironment', 'dev:server');
}

function serverEnvTdd() {
  return run('dev:setEnvironment', 'dev:server:tdd');
}

function tdd(done) {
  return karma.start({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: false
  }, done);
}

function testOnce(done) {
  return karma.start({
    configFile: __dirname + '/../karma-once.conf.js',
    singleRun: true
  }, done);
}

function reloadScripts() {
  return run('dev:scripts', 'dev:views', 'dev:index');
}

function reloadViews() {
  return run('dev:views', 'dev:index');
}

function reloadStyles() {
  return run('dev:styles', 'dev:index');
}

function serve() {
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
  gulp.watch(sources.scripts, ['dev:reloadScripts', browserSync.reload]);
  gulp.watch(sources.views,   ['dev:reloadViews',   browserSync.reload]);
  gulp.watch(sources.index,   ['dev:reloadViews',   browserSync.reload]);
  gulp.watch(sources.styles,  ['dev:reloadStyles',  browserSync.reload]);
  gulp.watch(sources.images,  ['dev:images',        browserSync.reload]);
  gulp.watch(sources.fonts,   ['dev:fonts',         browserSync.reload]);
}