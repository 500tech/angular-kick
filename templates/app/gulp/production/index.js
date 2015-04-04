var fs = require('fs-extra');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');
var catchError = require('./catch_error');

module.exports = function () {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;

  var styleManifest = JSON.parse(fs.readFileSync(destination + '/manifests/styles.json', "utf8"));
  var applicationSCSS = styleManifest[Object.keys(styleManifest)[0]].match(/application-.*\.css/)[0];
  return gulp.src(sources.index)
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replace('application.css', applicationSCSS))
    .pipe(plugins.minifyHtml({
      empty:        true,
      comments:     true,
      quotes:       true,
      spare:        true,
      conditionals: true
    }))
    .pipe(gulp.dest(destination));
};