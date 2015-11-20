'use strict';

const Logger  = require('lib/logger');
const Utils   = require('lib/utils');
const message = require('lib/messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'development';
  const args        = ['.'];
  let command       = 'node_modules/.bin/eslint';

  Logger.clearScreen();
  Logger.log(message.lint.starting);

  const lintProcess = Utils.spawnProcess(command, args, environment, { inherit: true });

  lintProcess.on('exit', () => Logger.done());
};
