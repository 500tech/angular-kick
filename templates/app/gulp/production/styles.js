var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');
var catchError = require('./catch_error');

module.exports = function () {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;
  var ENV = plugins.util.env.ENV;

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
};