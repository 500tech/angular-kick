"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var spawn   = require('child_process').spawn;

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var proc;

  logger.log('Running browserSync server on ' + 'http://localhost:3001/'.white);
  logger.log('Press ' + 'CTRL+C'.red + ' to stop');

  if (environment && environment.match(/^--/)) {
    proc = spawn('gulp', ['dev:server:env', environment]);
  } else {
    proc = spawn('gulp', ['dev:server']);
  }

  proc.stdout.on('data', function (data) {
    logger.log(('' + data)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.green)
      .replace('[BS]', '[browserSync]'.green)
    );
  });

  proc.stderr.on('data', function (data) {
    logger.log(('' + data.red)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.red)
      .replace('[BS]', '[browserSync]'.red)
    );
  });
};
