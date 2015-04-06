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
    .pipe(plugins.plumber({ errorHandler: catchError }))
    .pipe(plugins.replaceTask({ patterns: [{ json: ENV }] }))
    .pipe(plugins.minifyHtml({
      empty: true,
      comments: true,
      quotes: true,
      spare: true,
      conditionals: true
    }))
    .pipe(plugins.angularTemplatecache({
      module: appName + '.templates',
      standalone: true,
      templateHeader: 'export default angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
      base: function (file) {
        return file.history[0].replace(file.cwd,'').replace(file.base,'').substring(2);
      }
    }))
    .pipe(plugins.concat('templates.js'))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(destination));
};