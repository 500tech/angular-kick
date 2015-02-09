"use strict";

var fs      = require('fs-extra');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');

module.exports = function () {
  var environment = process.argv[3];
  var testProcess;

  if (!fs.existsSync('node_modules') || !fs.existsSync('bower_components')) {
    logger.warn("Can't run tests with missing packages".yellow);
    console.log('Please run '.white + 'kick setup'.blue + ' first'.white);
    return;
  }

  console.log('Starting tests...'.white);

  if (environment && environment.match(/^--/)) {
    testProcess = spawn('gulp', ['test:env', environment]);
  } else {
    testProcess = spawn('gulp', ['test']);
  }

  testProcess.stdout.on('data', function (data) {
    console.log(('' + data).replace(/\n/, ''));
  });

  testProcess.stderr.on('data', function (data) {
    console.log(('' + data).replace(/\n/, ''));
  });

  testProcess.on('exit', function (code) {
    logger.done();
  });

};