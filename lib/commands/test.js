"use strict";

var spawn   = require('child_process').spawn;
var utils   = require('../utils');
var logger  = require('../logger');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var testProcess;

  console.log('Starting tests...'.white);

  if (environment && environment.match(/^--/)) {
    testProcess = spawn('gulp', ['dev:test:env', environment]);
  } else {
    testProcess = spawn('gulp', ['dev:test']);
  }

  testProcess.stdout.on('data', function (data) {
    console.log(data.toString().replace(/\n/, ''));
  });

  testProcess.stderr.on('data', function (data) {
    console.log(data.toString().replace(/\n/, ''));
  });

  testProcess.on('exit', function () {
    logger.done();
  });

};