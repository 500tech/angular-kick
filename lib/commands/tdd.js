"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');
var spawn   = require('child_process').spawn;

module.exports = function () {
  utils.ensurePackagesExist();

  var environment = process.argv[3] || 'test';
  var command = 'karma';
  var args = ['start'];

  logger.log(message.server.running);
  logger.log(message.server.testsRunning);
  logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  utils.spawnProcess(command, args, environment);
};
