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
var fs          = require('fs-extra');
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
  index:          index,
  views:          views,
  images:         images,
  scripts:        scripts,
  jspm:           jspm,
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
  return gulp.src(sources.styles, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      onError: catchError
    }))
    .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(destination));
}

function index() {
  if (errorRaised) {
    errorRaised = false;
    return;
  }

  return gulp.src(sources.index)
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.replace(/\.\.\//g, ''))
    .pipe(plugins.replace('app/', ''))
    .pipe(plugins.replace(destination + '/', ''))
    .pipe(gulp.dest(destination));
}

function views() {
  var appName = JSON.parse(fs.readFileSync(__dirname + '/../package.json', "utf8")).name;
  return gulp.src(sources.views, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.html2js({
      outputModuleName: appName + '.templates',
      base: 'app/'
    }))
    .pipe(plugins.concat('templates.js'))
    .pipe(plugins.ngAnnotate())
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

function scripts() {
  return gulp.src(sources.scripts)
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.replaceTask({patterns: [{json: ENV}]}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(destination));
}

function jspm() {
  return gulp.src(['config.js', 'jspm_packages/**'], {base: sources.base})
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(gulp.dest(destination + '/jspm'));
}

function test() {
  destination = common.destinations.test;
  return run('dev:clean', ['dev:scripts', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts'], 'dev:index', 'dev:jspm', 'dev:testOnce', 'dev:clean');
}

function testEnv() {
  return run('dev:setEnvironment', 'dev:test');
}

function server() {
  return run('dev:clean', ['dev:scripts', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts'], 'dev:index', 'dev:jspm', 'dev:serve');
}

function serverTdd() {
  return run('dev:clean', 'dev:scripts', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts', 'dev:index', 'dev:jspm', 'dev:serve', 'dev:tdd');
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