"use strict";

var utils   = require('../utils');
var spawn   = require('child_process').spawn;
var logger  = require('../logger');
var message = require('../messages');

module.exports = function () {
  utils.ensureGlobalModule('gulp');
  utils.ensurePackagesExist();

  var environment = process.argv[3];
  var proc, errorFlag;

  logger.log(message.build.start);

  if (environment && environment.match(/^--/)) {
    proc = spawn('gulp', ['build:env', environment]);
  } else {
    proc = spawn('gulp', ['build']);
  }

  proc.stdout.on('data', function (data) {
    if (data.toString().match('err')) {
      errorFlag = true;
      logger.log((data.toString())
          .replace(/\n/, '')
          .replace('[gulp]', '[gulp]'.green).red
      );
    }
  });

  proc.stderr.on('data', function (data) {
    logger.log((data.toString().red)
        .replace(/\n/, '')
        .replace('[gulp]', '[gulp]'.red)
    );
  });

  proc.on('exit', function () {
    if (!errorFlag) {
      logger.log(message.build.done);
      logger.done();
    }
  });
};
