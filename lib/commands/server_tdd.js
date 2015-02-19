"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');
var spawn   = require('child_process').spawn;

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var command = 'gulp';
  var args;

  logger.log(message.server.running);
  logger.log(message.server.testsRunning);
  logger.log(message.server.stop);

  if (environment && environment.match(/^--/)) {
    args = ['dev:server:tdd:env', environment];
  } else {
    args = ['dev:server:tdd'];
  }

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  spawn(command, args, { stdio: 'inherit' });
};
