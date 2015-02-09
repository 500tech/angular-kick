"use strict";

var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins         = gulpLoadPlugins();
var fs              = require('fs-extra');
var runSequence     = require('run-sequence');
var url             = require('url');
var proxy           = require('proxy-middleware');
var modRewrite      = require('connect-modrewrite');
var browserSync     = require('browser-sync');
var karma           = require('karma').server;
var production      = require('./gulp/production_tasks');
var streams         = require('stream-series');

var common      = require('./gulp/common');
var sources     = common.sources;
var setENV      = common.setENV;
var destination = common.destinations.development;
var ENV;

var catchError = function (err) {
  plugins.util.beep();
  return console.log(err);
};

gulp.task('default', function () {
  return runSequence('server');
});

gulp.task('server', function () {
  ENV = ENV || setENV['development'];
  return runSequence('clean', 'vendorConcat', 'vendor', 'scripts', 'styles', 'images', 'views', 'index', 'fonts', 'serve');
});

gulp.task('server:tdd', function () {
  ENV = ENV || setENV['development'];
  return runSequence('server', 'tdd');
});

gulp.task('test', function () {
  ENV = ENV || setENV['development'];
  destination = common.destinations.test;
  return runSequence('clean', 'vendorConcat', 'scripts', 'styles', 'images', 'views', 'index', 'fonts', 'testOnce', 'clean');
});

gulp.task('build', function () {
  ENV = ENV || setENV['production'];
  destination = 'public';
  return runSequence('clean',
    'productionVendor',
    'productionScripts',
    'productionStyles',
    'productionImages',
    'productionViews',
    'productionIndex',
    'productionFonts');
});

gulp.task('setEnvironment', function () {
  var environment = process.argv[3];
  if (setENV[environment]) {
    console.log('Setting ENV to ' + environment);
    ENV = setENV[environment];
  } else {
    throw 'Environment "' + environment + '" was not found in environments.js file';
  }
});

gulp.task('server:env', function () {
  return runSequence('setEnvironment', 'server');
});

gulp.task('server:tdd:env', function () {
  return runSequence('setEnvironment', 'server:tdd');
});

gulp.task('build:env', function () {
  return runSequence('productionSetEnvironment', 'build');
});

gulp.task('test:env', function () {
  return runSequence('setEnvironment', 'test');
});

gulp.task('clean',          clean);
gulp.task('fonts',          fonts);
gulp.task('styles',         styles);
gulp.task('index',          index);
gulp.task('views',          views);
gulp.task('images',         images);
gulp.task('vendor',         vendor);
gulp.task('vendorConcat',   vendorConcat);
gulp.task('scripts',        scripts);
gulp.task('testOnce',       testOnce);
gulp.task('tdd',            tdd);
gulp.task('serve',          serve);
gulp.task('reloadScripts',  reloadScripts);
gulp.task('reloadViews',    reloadViews);
gulp.task('reloadStyles',   reloadStyles);

gulp.task('productionSetEnvironment', production.setEnvironment);
gulp.task('productionVendor',         production.vendor);
gulp.task('productionScripts',        production.scripts);
gulp.task('productionStyles',         production.styles);
gulp.task('productionImages',         production.images);
gulp.task('productionViews',          production.views);
gulp.task('productionIndex',          production.index);
gulp.task('productionFonts',          production.fonts);


function clean () {
  return gulp.src(destination, { read: false })
    .pipe(plugins.rimraf());
}

function fonts () {
  return gulp.src(sources.fonts, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(gulp.dest(destination));
}

function styles () {
  return gulp.src(sources.mainStyle, { base: sources.base })
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(destination));
}

function index () {
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
}

function views () {
  return gulp.src(sources.views, { base: sources.base })
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(gulp.dest(destination))
}

function images () {
  return gulp.src(sources.images, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(gulp.dest(destination));
}

function vendor () {
  return gulp.src(sources.vendorFiles, { base: sources.base })
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(gulp.dest(destination + '/vendor'));
}

function vendorConcat () {
  return gulp.src(sources.vendor)
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.include({ extensions: ['js'] }))
    .pipe(gulp.dest(destination));
}

function scripts () {
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
}

function tdd (done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
}

function testOnce (done) {
  return karma.start({
    configFile: __dirname + '/karma-once.conf.js',
    singleRun: true
  }, done);
}

function reloadScripts () { return runSequence('scripts', 'index'); }
function reloadViews  ()  { return runSequence('views', 'index'); }
function reloadStyles ()  { return runSequence('styles', 'index'); }

function serve () {
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
