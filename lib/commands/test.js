"use strict";

var fs      = require('fs-extra');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');

module.exports = function () {
  if (!fs.existsSync('node_modules') || !fs.existsSync('components')) {
    logger.warn("Can't run tests with missing packages".yellow);
    console.log('Please run '.white + 'kick setup'.blue + ' first'.white);
    return;
  }

  console.log('Starting tests...'.white);

  var testProcess = spawn('gulp', ['test']);

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