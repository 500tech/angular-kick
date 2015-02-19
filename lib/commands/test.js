"use strict";

var spawn   = require('child_process').spawn;
var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var command = 'gulp';
  var testProcess, args;

  logger.log(message.test.starting);

  if (environment && environment.match(/^--/)) {
    args = ['dev:test:env', environment];
  } else {
    args = ['dev:test'];
  }

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  testProcess = spawn(command, args, { stdio: 'inherit' });

  testProcess.on('exit', function () {
    logger.done();
  });

};
