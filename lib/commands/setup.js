"use strict";

var fs        = require('fs-extra');
var spawn     = require('child_process').spawn;
var getSize   = require('get-folder-size');
var Progress  = require('progress');
var logger    = require('../logger');
var utils     = require('../utils');
var lastChunk, command, args;

module.exports = function () {
  utils.ensureGlobalModule('bower');

  fs.deleteSync('node_modules');
  fs.deleteSync('bower_components');
  logger.log('Downloading npm packages (approx. 170MB), this usually takes 5–7 minutes...'.white);

  command = 'npm';
  args = ['install'];

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  var npmProgress = initProgressBar(172149822);
  var npmProcess = spawn(command, args);

  npmProcess.stdout.on('data', function () {
    tickProgress('node_modules', npmProgress);
  });

  npmProcess.stderr.on('data', function () {
    tickProgress('node_modules', npmProgress);
  });

  npmProcess.on('exit', function () {
    logger.blankLine();
    installBower();
  });
};

function installBower() {
  logger.log('Downloading bower packages (approx. 2MB), this usually takes less than a minute...'.white);

  command = 'bower';
  args = ['install'];

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  var bowerProgress = initProgressBar(2125023);
  var bowerProcess = spawn(command, args);

  bowerProcess.stdout.on('data', function () {
    tickProgress('bower_components', bowerProgress)
  });

  bowerProcess.on('exit', function () {
    logger.blankLine();
    logger.log('Hurray! Your app is ready.'.white);
    logger.done();
  });
}

function initProgressBar(size) {
  lastChunk = 0;
  return new Progress(':bar :percent :elapseds'.white, {
    complete: '▉'.green,
    incomplete: '▉'.dim,
    width: 50,
    total: size
  })
}

function tickProgress(directory, progressBar) {
  getSize(directory, function (err, size) {
    if (progressBar.curr < 172149822) {
      var chunk = size - lastChunk;
      progressBar.tick(chunk);
      lastChunk += chunk;
    }
  });
}
