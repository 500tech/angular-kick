"use strict";

var gulp        = require('gulp');
var del         = require('del');
var plugins     = require('gulp-load-plugins')();
var fs          = require('fs-extra');
var run         = require('run-sequence');
var common      = require('./common');
var builder     = require('systemjs-builder');
var sources     = common.sources;
var setENV      = common.setENV;
var destination = common.destinations.production;
var ENV         = setENV['production'];

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
  bundle:         bundle,
  build:          build,
  buildEnv:       buildEnv,
  cleanManifests: cleanManifests
};

function catchError(err) {
  plugins.util.beep();
  return console.log(err);
}

function clean(done) {
  return del(destination, done);
}

function cleanManifests(done) {
  return del(destination + '/manifests', done);
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
  return gulp.src(sources.fonts, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(gulp.dest(destination));
}

function styles() {
  return gulp.src(sources.mainStyle, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(plugins.cssmin())
    .pipe(plugins.rev())
    .pipe(gulp.dest(destination))
    .pipe(plugins.rev.manifest({ path: 'manifests/styles.json' }))
    .pipe(gulp.dest(destination));
}

function index() {
  var styleManifest       = JSON.parse(fs.readFileSync(destination + '/manifests/styles.json', "utf8"));
  var applicationSCSS = styleManifest[Object.keys(styleManifest)[0]].match(/application-.*\.css/)[0];
  return gulp.src(sources.index)
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replace('application.css', applicationSCSS))
    .pipe(plugins.minifyHtml({
      empty: true,
      comments: true,
      quotes: true,
      spare: true,
      conditionals: true
    }))
    .pipe(gulp.dest(destination));
}

function views() {
  var appName = JSON.parse(fs.readFileSync(__dirname + '/../package.json', "utf8")).name;
  return gulp.src(sources.views, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.minifyHtml({
      empty: true,
      comments: true,
      quotes: true,
      spare: true,
      conditionals: true
    }))
    .pipe(plugins.html2js({
      outputModuleName: appName + '.templates',
      base: 'app/'
    }))
    .pipe(plugins.concat('templates.js'))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(destination));
}

function images() {
  return gulp.src(sources.images, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.imagemin({ progressive: true }))
    .pipe(gulp.dest(destination));
}

function scripts() {
  return gulp.src(sources.scripts)
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.ngAnnotate())
    //.pipe(plugins.uglify())
    .pipe(gulp.dest(destination));
}

function jspm() {
  return gulp.src(['config.js', 'jspm_packages/**'], {base: sources.base})
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(gulp.dest(destination + '/jspm'));
}

function bundle(cb) {
  builder = new builder();
  builder.reset();
  builder.loadConfig('./config.js').then(function () {
    builder.config({
      baseURL: 'public/'
    });
    builder.build('app', 'public/app.js', { minify: true }).then(function () {
      return cb();
    })
  });
}

function build() {
  return run(
    'build:clean',
    'build:scripts',
    'build:styles',
    'build:images',
    'build:views',
    'build:index',
    'build:fonts',
    'build:jspm',
    'build:bundle',
    'build:cleanManifests'
  );
}

function buildEnv() {
  return run('build:setEnvironment', 'build');
}