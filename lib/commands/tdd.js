"use strict";

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();
  Utils.ensureGlobalModule('karma');

  const environment = process.argv[3] || 'test';
  const args        = ['start'];
  let command       = 'karma';

  Logger.log(message.server.running);
  Logger.log(message.server.testsRunning);
  Logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  Utils.spawnProcess(command, args, environment, { inherit: true });
};
