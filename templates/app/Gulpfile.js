"use strict";

var gulp  = require('gulp');
var run   = require('run-sequence');
var dev   = require('./gulp/development_tasks');
var build = require('./gulp/production_tasks');

gulp.task('default', function () {
  return run('dev:server');
});

gulp.task('dev:clean',            dev.clean);
gulp.task('dev:server',           dev.server);
gulp.task('dev:server:tdd',       dev.serverTdd);
gulp.task('dev:test',             dev.test);
gulp.task('dev:server:env',       dev.serverEnv);
gulp.task('dev:server:tdd:env',   dev.serverEnvTdd);
gulp.task('dev:test:env',         dev.testEnv);
gulp.task('dev:setEnvironment',   dev.setEnvironment);
gulp.task('dev:fonts',            dev.fonts);
gulp.task('dev:styles',           dev.styles);
gulp.task('dev:vendorStyles',     dev.vendorStyles);
gulp.task('dev:index',            dev.index);
gulp.task('dev:views',            dev.views);
gulp.task('dev:images',           dev.images);
gulp.task('dev:vendorJS',         dev.vendorJS);
gulp.task('dev:vendorJSConcat',   dev.vendorJSConcat);
gulp.task('dev:scripts',          dev.scripts);
gulp.task('dev:testOnce',         dev.testOnce);
gulp.task('dev:tdd',              dev.tdd);
gulp.task('dev:serve',            dev.serve);
gulp.task('dev:reloadScripts',    dev.reloadScripts);
gulp.task('dev:reloadViews',      dev.reloadViews);
gulp.task('dev:reloadStyles',     dev.reloadStyles);

gulp.task('build',                build.build);
gulp.task('build:env',            build.buildEnv);
gulp.task('build:clean',          build.clean);
gulp.task('build:setEnvironment', build.setEnvironment);
gulp.task('build:vendorJS',       build.vendorJS);
gulp.task('build:vendorStyles',   build.vendorStyles);
gulp.task('build:scripts',        build.scripts);
gulp.task('build:styles',         build.styles);
gulp.task('build:images',         build.images);
gulp.task('build:views',          build.views);
gulp.task('build:index',          build.index);
gulp.task('build:fonts',          build.fonts);
gulp.task('build:cleanManifests', build.cleanManifests);