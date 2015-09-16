"use strict";

const Logger = require('../logger');

var utils   = require('../utils');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();

  var environment = process.argv[3] || 'development';
  var command = 'npm';
  var args = ['start'];

  Logger.log(message.server.running);
  Logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  utils.spawnProcess(command, args, environment);
};
