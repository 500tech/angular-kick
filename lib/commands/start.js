"use strict";

const Logger = require('../logger');
const Utils  = require('../utils');

var message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  var environment = process.argv[3] || 'development';
  var command = 'npm';
  var args = ['start'];

  Logger.log(message.server.running);
  Logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  Utils.spawnProcess(command, args, environment);
};
