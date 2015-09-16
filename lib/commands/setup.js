"use strict";

const Logger = require('../logger');

var fs        = require('fs-extra');
var spawn     = require('child_process').spawn;
var getSize   = require('get-folder-size');
var Progress  = require('progress');
var message   = require('../messages');
var lastChunk, command, args, done;
var nodeModulesSize = 98856631;

module.exports = function () {
  fs.removeSync('node_modules');
  Logger.log(message.setup.downloadingNpm);
  command = 'npm';
  args = ['install'];

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  let progress = initProgressBar(nodeModulesSize);
  let proc = spawn(command, args);

  proc.stdout.on('data', () => tickProgress('node_modules', progress));
  proc.stderr.on('data', () => tickProgress('node_modules', progress));

  proc.on('exit', () => {
    Logger.blankLine();
    Logger.log(message.setup.done);
    done = true;
    Logger.done();
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
      if (!done) {
        progressBar.tick(chunk);
      }
      lastChunk += chunk;
    }
  });
}
