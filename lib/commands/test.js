"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();
  utils.ensureGlobalModule('karma');

  const environment = process.argv[3] || 'test';
  const args        = ['start', '--single-run'];
  let command       = 'karma';
  let testProcess;

  logger.log(message.test.starting);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  testProcess = utils.spawnProcess(command, args, environment, { inherit: true });
  testProcess.on('exit', () => logger.done());
};
