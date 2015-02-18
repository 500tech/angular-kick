"use strict";

var utils   = require('../utils');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var command = 'gulp';
  var proc, args;

  logger.log('Building application to '.white + '/public'.blue + ' folder...'.white);

  if (environment && environment.match(/^--/)) {
    args = ['build:env', environment];
  } else {
    args = ['build'];
  }

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  proc = spawn(command, args, { stdio: ['pipe', 'pipe', process.stderr] });

  proc.on('exit', function () {
    logger.done();
  });
};
