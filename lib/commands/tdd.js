'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'test';
  const args        = ['start'];
  let command       = 'node_modules/.bin/karma';

  Logger.log(message.server.running);
  Logger.log(message.server.testsRunning);

  Utils.spawnProcess(command, args, environment, { inherit: true });
};
