"use strict";

var fs        = require('fs-extra');
var spawn     = require('child_process').spawn;
var getSize   = require('get-folder-size');
var Progress  = require('progress');
var logger    = require('../logger');
var message   = require('../messages');
var lastChunk, command, args;
var nodeModulesSize = 98856631;

module.exports = function () {
  fs.deleteSync('node_modules');
  logger.log(message.setup.downloadingNpm);

  command = 'npm';
  args = ['install'];

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  var progress = initProgressBar(nodeModulesSize);
  var proc = spawn(command, args);

  proc.stdout.on('data', function () {
    tickProgress('node_modules', progress);
  });

  proc.stderr.on('data', function () {
    tickProgress('node_modules', progress);
  });

  proc.on('exit', function () {
    logger.blankLine();
    logger.log(message.setup.done);
    logger.done();
  });
};

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
    if (progressBar.curr < nodeModulesSize) {
      var chunk = size - lastChunk;
      progressBar.tick(chunk);
      lastChunk += chunk;
    }
  });
}
