var fs = require('fs-extra');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var common = require('../common');
var catchError = require('./catch_error');

module.exports = function () {
  var sources = common.sources;
  var destination = plugins.util.env.DESTINATION;
  var ENV = plugins.util.env.ENV;

  var appName = JSON.parse(fs.readFileSync(__dirname + '/../../package.json', "utf8")).name;
  return gulp.src(sources.views, { base: sources.base })
    .pipe(plugins.changed(destination, {
      hasChanged: plugins.changed.compareSha1Digest
    }))
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.html2js({
      outputModuleName: appName + '.templates',
      base:             'app/'
    }))
    .pipe(plugins.concat('templates.js'))
    .pipe(plugins.ngAnnotate())
    .pipe(gulp.dest(destination))
};