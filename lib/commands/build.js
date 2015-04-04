"use strict";

var utils   = require('../utils');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var command = 'gulp';
  var proc, args;

  logger.log(message.build.start);

  if (environment && environment.match(/^--/)) {
    args = ['build', environment];
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
