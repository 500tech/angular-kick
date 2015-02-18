"use strict";

var utils   = require('../utils');
var logger  = require('../logger');
var message = require('../messages');
var spawn   = require('child_process').spawn;

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var proc;

  logger.log(message.server.running);
  logger.log(message.server.stop);

  if (environment && environment.match(/^--/)) {
    proc = spawn('gulp', ['dev:server:env', environment]);
  } else {
    proc = spawn('gulp', ['dev:server']);
  }

  proc.stdout.on('data', function (data) {
    logger.log(data.toString()
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.green)
      .replace('[BS]', '[browserSync]'.green)
    );
  });

  proc.stderr.on('data', function (data) {
    logger.log((data.toString().red)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.red)
      .replace('[BS]', '[browserSync]'.red)
    );
  });
};
