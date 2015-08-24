"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();

  var environment = process.argv[3] || 'development';
  var command = 'npm';
  var args = ['start'];

  logger.log(message.server.running);
  logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  utils.spawnProcess(command, args, environment);
};
