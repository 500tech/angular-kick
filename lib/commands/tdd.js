"use strict";

const Logger = require('../logger');

var utils   = require('../utils');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();
  utils.ensureGlobalModule('karma');

  var environment = process.argv[3] || 'test';
  var command = 'karma';
  var args = ['start'];

  Logger.log(message.server.running);
  Logger.log(message.server.testsRunning);
  Logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  utils.spawnProcess(command, args, environment, { inherit: true });
};
