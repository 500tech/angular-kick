var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var run = require('run-sequence');
var url = require('url');
var proxy = require('proxy-middleware');
var modRewrite = require('connect-modrewrite');
var browserSync = require('browser-sync');
var common = require('../common');

gulp.task('dev:reloadScripts', function () {
  return run('dev:scripts', 'dev:views', 'dev:index');
});

gulp.task('dev:reloadViews', function () {
  return run('dev:views', 'dev:index');
});

gulp.task('dev:reloadStyles', function () {
  return run('dev:styles', 'dev:index');
});

module.exports = function () {
  var sources = common.sources;

  var proxyOptions;
  proxyOptions = url.parse(plugins.util.env.ENV.API_URL);
  proxyOptions.route = '/api';
  browserSync({
    browser: ['google chrome', 'chrome'],
    notify:  false,
    port:    3001,
    server:  {
      baseDir:    '.tmp',
      middleware: [proxy(proxyOptions), modRewrite(['!\\.\\w+$ /app.html [L]'])]
    }
  });
  gulp.watch(sources.scripts, ['dev:reloadScripts', browserSync.reload]);
  gulp.watch(sources.views,   ['dev:reloadViews',   browserSync.reload]);
  gulp.watch(sources.index,   ['dev:reloadViews',   browserSync.reload]);
  gulp.watch(sources.styles,  ['dev:reloadStyles',  browserSync.reload]);
  gulp.watch(sources.images,  ['dev:images',        browserSync.reload]);
  gulp.watch(sources.fonts,   ['dev:fonts',         browserSync.reload]);
};