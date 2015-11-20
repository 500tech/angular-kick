'use strict';

const Logger          = require('../logger');
const fs              = require('fs-extra');
const spawn           = require('child_process').spawn;
const getSize         = require('get-folder-size');
const Progress        = require('progress');
const message         = require('../messages');
const nodeModulesSize = 98856631;
let lastChunk, command, args, done;

module.exports = function () {
  fs.removeSync('node_modules');
  Logger.log(message.setup.downloadingNpm);
  command = 'npm';
  args = ['install'];

  if (process.platform === 'win32') {
    args.unshift('/c', command);
    command = process.env.comspec;
  }

  const progress = initProgressBar(nodeModulesSize);
  const proc = spawn(command, args);

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
  getSize(directory, (err, size) => {
    if (progressBar.curr < nodeModulesSize) {
      var chunk = size - lastChunk;
      if (!done) {
        progressBar.tick(chunk);
      }
      lastChunk += chunk;
    }
  });
}
