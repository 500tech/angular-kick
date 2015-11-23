'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'test';
  const args        = ['start', '--single-run'];
  let command       = 'node_modules/.bin/karma';
  let testProcess;

  Logger.log(message.test.starting);

  // TODO: Allow karma to run in production environment
  // In order to do this, we should not include webpack CommonsChunkPlugin
  // while running karma-webpack since they are incompatible

  testProcess = Utils.spawnProcess(command, args, environment, { inherit: true });
  testProcess.on('exit', () => Logger.done());
};
