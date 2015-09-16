"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();

  let environment = process.argv[3] || 'production';
  let command     = 'npm';
  let args        = ['run', 'bundle'];
  let proc;

  logger.log(message.bundle.start);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  proc = utils.spawnProcess(command, args, environment);

  proc.on('exit', function () {
    logger.done();
  });
};
