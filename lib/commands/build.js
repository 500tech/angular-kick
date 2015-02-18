"use strict";

var utils   = require('../utils');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var proc, args, errorFlag;

  logger.log('Building application to '.white + '/public'.blue + ' folder...'.white);

  if (environment && environment.match(/^--/)) {
    args = ['build:env', environment];
  } else {
    args = ['build'];
  }

  proc = spawn('gulp', args, { stdio: ['pipe', 'pipe', process.stderr] });

  proc.on('exit', function () {
    if (!errorFlag) {
      logger.log('Feel free to copy it as is.'.white);
      logger.done();
    }
  });
};
