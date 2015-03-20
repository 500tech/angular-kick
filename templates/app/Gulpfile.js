"use strict";

var gulp = require('gulp');
var run = require('run-sequence');
var plugins = require('gulp-load-plugins')();
var common = require('./gulp/common');
plugins.util.env.GULP_ERROR_RAISED = false;

gulp.task('dev:clean',            require('./gulp/development/clean'));
gulp.task('dev:setEnvironment',   require('./gulp/development/set_environment'));
gulp.task('dev:fonts',            require('./gulp/development/fonts'));
gulp.task('dev:styles',           require('./gulp/development/styles'));
gulp.task('dev:index',            require('./gulp/development/index'));
gulp.task('dev:views',            require('./gulp/development/views'));
gulp.task('dev:images',           require('./gulp/development/images'));
gulp.task('dev:scripts',          require('./gulp/development/scripts'));
gulp.task('dev:jspm',             require('./gulp/development/jspm'));
gulp.task('dev:testOnce',         require('./gulp/development/test_once'));
gulp.task('dev:tdd',              require('./gulp/development/tdd'));
gulp.task('dev:serve',            require('./gulp/development/serve'));

gulp.task('build:clean',          require('./gulp/production/clean'));
gulp.task('build:setEnvironment', require('./gulp/production/set_environment'));
gulp.task('build:scripts',        require('./gulp/production/scripts'));
gulp.task('build:styles',         require('./gulp/production/styles'));
gulp.task('build:images',         require('./gulp/production/images'));
gulp.task('build:views',          require('./gulp/production/views'));
gulp.task('build:index',          require('./gulp/production/index'));
gulp.task('build:fonts',          require('./gulp/production/fonts'));
gulp.task('build:jspm',           require('./gulp/production/jspm'));
gulp.task('build:bundle',         require('./gulp/production/bundle'));
gulp.task('build:cleanManifests', require('./gulp/production/clean_manifests'));

gulp.task('default', function () {
  return run('dev:server');
});

gulp.task('dev:server', function () {
  plugins.util.env.DESTINATION = common.destinations.development;
  return run(
    'dev:setEnvironment',
    'dev:clean',
    ['dev:scripts', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts'],
    'dev:index',
    'dev:jspm',
    'dev:serve'
  );
});

gulp.task('dev:server:tdd', function () {
  plugins.util.env.DESTINATION = common.destinations.development;
  return run(
    'dev:setEnvironment',
    'dev:clean',
    'dev:scripts',
    'dev:styles',
    'dev:images',
    'dev:views',
    'dev:fonts',
    'dev:index',
    'dev:jspm',
    'dev:serve',
    'dev:tdd'
  );
});

gulp.task('dev:test', function () {
  plugins.util.env.DESTINATION = common.destinations.test;
  return run(
    'dev:setEnvironment',
    'dev:clean',
    ['dev:scripts', 'dev:styles', 'dev:images', 'dev:views', 'dev:fonts'],
    'dev:index',
    'dev:jspm',
    'dev:testOnce',
    'dev:clean');
});

gulp.task('build', function () {
  plugins.util.env.DESTINATION = common.destinations.production;
  return run(
    'build:setEnvironment',
    'build:clean',
    'build:scripts',
    'build:styles',
    'build:images',
    'build:views',
    'build:index',
    'build:fonts',
    'build:jspm',
    'build:bundle',
    'build:cleanManifests'
  );
});