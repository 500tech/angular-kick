"use strict";

var spawn   = require('child_process').spawn;
var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var command = 'npm';
  var args = ['test'];
  var testProcess;

  logger.log(message.test.starting);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  testProcess = utils.spawnProcess(command, args, environment);

  testProcess.on('exit', function () {
    logger.done();
  });

};
