var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');
var catchError = require('./catch_error');

module.exports = function () {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;

  if (plugins.util.env.GULP_ERROR_RAISED) {
    plugins.util.env.GULP_ERROR_RAISED = false;
    return;
  }

  return gulp.src(sources.index)
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(plugins.replace(/\.\.\//g, ''))
    .pipe(plugins.replace('app/', ''))
    .pipe(plugins.replace(destination + '/', ''))
    .pipe(gulp.dest(destination));
};