'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();
  Utils.ensureGlobalModule('eslint');
  Utils.ensureGlobalModule('eslint-plugin-angular');

  const environment = process.argv[3] || 'development';
  const args        = ['.'];
  let command       = 'eslint';
  let lintProcess;

  Logger.clearScreen();
  Logger.log(message.lint.starting);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  lintProcess = Utils.spawnProcess(command, args, environment, { inherit: true });
  lintProcess.on('exit', () => Logger.done());
};
