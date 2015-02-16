"use strict";

var utils = require('../utils');
var spawn = require('child_process').spawn;
var logger = require('../logger');

module.exports = function () {

  if (!utils.ensureGlobalModules('gulp')) {
    return;
  }

  var environment = process.argv[3];
  var proc, errorFlag;

  utils.ensurePackagesExist();

  console.log('Building application to '.white + '/public'.blue + ' folder...'.white);

  if (environment && environment.match(/^--/)) {
    proc = spawn('gulp', ['build:env', environment]);
  } else {
    proc = spawn('gulp', ['build']);
  }

  proc.stdout.on('data', function (data) {
    if (data.toString().match('err')) {
      errorFlag = true;
      console.log(('' + data)
          .replace(/\n/, '')
          .replace('[gulp]', '[gulp]'.green).red
      );
    }
  });

  proc.stderr.on('data', function (data) {
    console.log(('' + data.red)
        .replace(/\n/, '')
        .replace('[gulp]', '[gulp]'.red)
    );
  });

  proc.on('exit', function () {
    if (!errorFlag) {
      console.log('Feel free to copy it as is.'.white);
      logger.done();
    }
  });
};