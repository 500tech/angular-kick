"use strict";

var gulp        = require('gulp');
var run         = require('run-sequence');
var development = require('./gulp/development_tasks');
var production  = require('./gulp/production_tasks');

gulp.task('default', function () {
  return run('server');
});

gulp.task('clean',            development.clean);
gulp.task('server',           development.server);
gulp.task('server:tdd',       development.serverTdd);
gulp.task('test',             development.test);
gulp.task('server:env',       development.serverEnv);
gulp.task('server:tdd:env',   development.serverEnvTdd);
gulp.task('test:env',         development.testEnv);
gulp.task('setEnvironment',   development.setEnvironment);
gulp.task('fonts',            development.fonts);
gulp.task('styles',           development.styles);
gulp.task('index',            development.index);
gulp.task('views',            development.views);
gulp.task('images',           development.images);
gulp.task('vendorJS',         development.vendorJS);
gulp.task('vendorJSConcat',   development.vendorJSConcat);
gulp.task('scripts',          development.scripts);
gulp.task('testOnce',         development.testOnce);
gulp.task('tdd',              development.tdd);
gulp.task('serve',            development.serve);
gulp.task('reloadScripts',    development.reloadScripts);
gulp.task('reloadViews',      development.reloadViews);
gulp.task('reloadStyles',     development.reloadStyles);

gulp.task('build',                    production.build);
gulp.task('build:env',                production.buildEnv);
gulp.task('productionClean',          production.clean);
gulp.task('productionSetEnvironment', production.setEnvironment);
gulp.task('productionVendorJS',       production.vendorJS);
gulp.task('productionScripts',        production.scripts);
gulp.task('productionStyles',         production.styles);
gulp.task('productionImages',         production.images);
gulp.task('productionViews',          production.views);
gulp.task('productionIndex',          production.index);
gulp.task('productionFonts',          production.fonts);