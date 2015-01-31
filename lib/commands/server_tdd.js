"use strict";

var fs      = require('fs-extra');
var logger  = require('../logger');
var spawn   = require('child_process').spawn;

module.exports = function () {
  if (!fs.existsSync('node_modules') || !fs.existsSync('components')) {
    logger.warn("Can't start server with missing packages".yellow);
    console.log('Please run '.white + 'kick setup'.blue + ' first'.white);
    return;
  }

  console.log('Running browserSync server on ' + 'http://localhost:3001/'.white);
  console.log('Running Karma test server on ' + 'http://localhost:9876/'.white);
  console.log('Press ' + 'CTRL+C'.red + ' to stop');

  var process = spawn('gulp', ['server:tdd']);

  process.stdout.on('data', function (data) {
    console.log(('' + data)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.green)
      .replace('[BS]', '[browserSync]'.green)
    );
  });

  process.stderr.on('data', function (data) {
    console.log(('' + data.red)
      .replace(/\n/, '')
      .replace('[gulp]', '[gulp]'.red)
      .replace('[BS]', '[browserSync]'.red)
    );
  });

  process.on('exit', function () {
    console.log('Feel free to copy it as is.'.white);
  });
};