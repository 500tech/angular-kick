"use strict";

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var fs          = require('fs-extra');
var run         = require('run-sequence');
var common      = require('./common');
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
  vendor:         vendor,
  scripts:        scripts,
  build:          build,
  buildEnv:       buildEnv
};

function catchError(err) {
  plugins.util.beep();
  return console.log(err);
}

function clean() {
  return gulp.src(destination, { read: false })
    .pipe(plugins.rimraf());
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
  var manifest          = JSON.parse(fs.readFileSync(destination + '/manifests/scripts.json', "utf8"));
  var configManifest    = JSON.parse(fs.readFileSync(destination + '/manifests/config.json', "utf8"));
  var templateManifest  = JSON.parse(fs.readFileSync(destination + '/manifests/templates.json', "utf8"));
  var styleManifest   = JSON.parse(fs.readFileSync(destination + '/manifests/styles.json', "utf8"));
  var applicationSCSS = styleManifest[Object.keys(styleManifest)[0]].match(/application-.*\.css/)[0];
  return gulp.src(sources.index)
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replace('app.js', manifest['app.js']))
    .pipe(plugins.replace('vendor.js', configManifest['vendor.js']))
    .pipe(plugins.replace('templates.js', templateManifest['templates.js']))
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
    .pipe(plugins.rev())
    .pipe(gulp.dest(destination))
    .pipe(plugins.rev.manifest({ path: 'manifests/templates.json' }))
    .pipe(gulp.dest(destination));
}

function images() {
  return gulp.src(sources.images, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.imagemin({ progressive: true }))
    .pipe(gulp.dest(destination));
}

function vendor() {
  return gulp.src(sources.vendor)
    .pipe(plugins.include({ extensions: ['js'] }))
    .pipe(plugins.rev())
    .pipe(gulp.dest(destination))
    .pipe(plugins.rev.manifest({ path: 'manifests/config.json' }))
    .pipe(gulp.dest(destination));
}

function scripts() {
  return gulp.src(sources.app)
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.include({ extensions: ['js'] }))
    .pipe(plugins.traceur({ modules: 'register' }))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.rev())
    .pipe(gulp.dest(destination))
    .pipe(plugins.rev.manifest({ path: 'manifests/scripts.json' }))
    .pipe(gulp.dest(destination));
}

function build() {
  return run(
    'productionClean',
    'productionVendor',
    'productionScripts',
    'productionStyles',
    'productionImages',
    'productionViews',
    'productionIndex',
    'productionFonts'
  );
}

function buildEnv() {
  return run('productionSetEnvironment', 'build');
}