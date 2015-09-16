"use strict";

const Logger = require('../logger');
const Utils  = require('../utils');

var message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();
  Utils.ensureGlobalModule('karma');

  var environment = process.argv[3] || 'test';
  var command = 'karma';
  var args = ['start', '--single-run'];
  var testProcess;

  Logger.log(message.test.starting);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  testProcess = Utils.spawnProcess(command, args, environment, { inherit: true });

  testProcess.on('exit', function () {
    Logger.done();
  });

};
