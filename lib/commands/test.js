"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensurePackagesExist();

  var environment = process.argv[3] || 'test';
  var command = 'karma';
  var args = ['start', '--single-run'];
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
