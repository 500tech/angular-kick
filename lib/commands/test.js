"use strict";

var spawn   = require('child_process').spawn;
var utils   = require('../utils');
var logger  = require('../logger');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var testProcess, args;

  logger.log('Starting tests...'.white);

  if (environment && environment.match(/^--/)) {
    args = ['dev:test:env', environment];
  } else {
    args = ['dev:test'];
  }

  testProcess = spawn('gulp', args, { stdio: 'inherit' });

  testProcess.on('exit', function () {
    logger.done();
  });

};
