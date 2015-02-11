"use strict";

var utils   = require('../utils');
var spawn   = require('child_process').spawn;

module.exports = function () {
  var environment = process.argv[3];
  var proc;

  utils.ensurePackagesExist();

  console.log('Running browserSync server on ' + 'http://localhost:3001/'.white);
  console.log('Press ' + 'CTRL+C'.red + ' to stop');

  if (environment && environment.match(/^--/)) {
    proc = spawn('gulp', ['server:env', environment]);
  } else {
    proc = spawn('gulp');
  }

  proc.stdout.on('data', function (data) {
    console.log(('' + data)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.green)
      .replace('[BS]', '[browserSync]'.green)
    );
  });

  proc.stderr.on('data', function (data) {
    console.log(('' + data.red)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.red)
      .replace('[BS]', '[browserSync]'.red)
    );
  });
};