"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();
  utils.ensureGlobalModule('karma');

  const environment = process.argv[3] || 'test';
  const args        = ['start'];
  let command       = 'karma';

  logger.log(message.server.running);
  logger.log(message.server.testsRunning);
  logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  utils.spawnProcess(command, args, environment, { inherit: true });
};
