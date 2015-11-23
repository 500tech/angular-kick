'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

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
