var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');
var catchError = require('./catch_error');

module.exports = function () {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;
  var ENV = plugins.util.env.ENV;

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
};