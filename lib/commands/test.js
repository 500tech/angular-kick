"use strict";

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();
  Utils.ensureGlobalModule('karma');

  const environment = process.argv[3] || 'test';
  const args        = ['start', '--single-run'];
  let command       = 'karma';
  let testProcess;

  Logger.log(message.test.starting);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  testProcess = Utils.spawnProcess(command, args, environment, {inherit: true});
  testProcess.on('exit', () => Logger.done());
};
