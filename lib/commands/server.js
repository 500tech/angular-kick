"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var spawn   = require('child_process').spawn;

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var args;

  logger.log('Running browserSync server on ' + 'http://localhost:3001/'.white);
  logger.log('Press ' + 'CTRL+C'.red + ' to stop');

  if (environment && environment.match(/^--/)) {
    args = ['dev:server:env', environment];
  } else {
    args = ['dev:server'];
  }

  spawn('gulp', args, { stdio: 'inherit' });
};
