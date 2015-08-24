"use strict";

var utils   = require('../utils');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var command = 'npm';
  var args = ['run', 'build'];
  var proc;

  logger.log(message.build.start);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  proc = utils.spawnProcess(command, args, environment);

  proc.on('exit', function () {
    logger.done();
  });
};
