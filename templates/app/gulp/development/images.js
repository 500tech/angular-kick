var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');
var catchError = require('./catch_error');

module.exports = function () {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;

  return gulp.src(sources.images, {base: sources.base})
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({errorHandler: catchError}))
    .pipe(gulp.dest(destination));
};