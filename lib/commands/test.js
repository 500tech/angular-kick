"use strict";

var spawn   = require('child_process').spawn;
var utils   = require('../utils');
var logger  = require('../logger');

module.exports = function () {
  var environment = process.argv[3];
  var testProcess;

  utils.ensurePackagesExist();

  console.log('Starting tests...'.white);

  if (environment && environment.match(/^--/)) {
    testProcess = spawn('gulp', ['test:env', environment]);
  } else {
    testProcess = spawn('gulp', ['test']);
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