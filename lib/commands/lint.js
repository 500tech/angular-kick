'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();
  Utils.ensureGlobalModule('eslint');

  // TODO: check if 'eslint-plugin-angular' is installed

  const environment = process.argv[3] || 'development';
  const args        = ['.'];
  let command       = 'eslint';
  let lintProcess;

  Logger.clearScreen();
  Logger.log(message.lint.starting);

  lintProcess = Utils.spawnProcess(command, args, environment, { inherit: true });
  lintProcess.on('exit', () => Logger.done());
};
