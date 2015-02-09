"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');
var spawn   = require('child_process').spawn;

module.exports = function () {
  var environment = process.argv[3];
  var proc;

  if (!fs.existsSync('node_modules') || !fs.existsSync('bower_components')) {
    logger.warn("Can't start server with missing packages".yellow);
    console.log('Please run '.white + 'kick setup'.blue + ' first'.white);
    return;
  }

  console.log('Running browserSync server on ' + 'http://localhost:3001/'.white);
  console.log('Press ' + 'CTRL+C'.red + ' to stop');

  if (environment) {
    proc = spawn('gulp', ['server:env', environment])
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