"use strict";

var spawn   = require('child_process').spawn;
var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var testProcess;

  logger.log(message.test.starting);

  if (environment && environment.match(/^--/)) {
    testProcess = spawn('gulp', ['dev:test:env', environment]);
  } else {
    testProcess = spawn('gulp', ['dev:test']);
  }

  testProcess.stdout.on('data', function (data) {
    logger.log(data.toString().replace(/\n/, ''));
  });

  testProcess.stderr.on('data', function (data) {
    logger.log(data.toString().replace(/\n/, ''));
  });

  testProcess.on('exit', function () {
    logger.done();
  });

};
