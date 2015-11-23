'use strict';

const fs              = require('fs-extra');
const spawn           = require('child_process').spawn;
const getSize         = require('get-folder-size');
const Progress        = require('progress');
const Logger          = require('../logger');
const message         = require('../messages');
const nodeModulesSize = 115555952;
let lastChunk, command, args, done;

module.exports = function () {
  //getSize('node_modules', (err, size) => console.log(size));
  fs.removeSync('node_modules');
  Logger.log(message.setup.downloadingNpm);
  command = 'npm';
  args    = ['install'];

  if (process.platform === 'win32') {
    args.unshift('/c', command);
    command = process.env.comspec;
  }

  const progress = initProgressBar(nodeModulesSize);
  const proc     = spawn(command, args);

  proc.stdout.on('data', () => tickProgress('node_modules', progress));
  proc.stderr.on('data', () => tickProgress('node_modules', progress));

  proc.on('exit', () => {
    progress.tick(nodeModulesSize);
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
  if (!done) {
    progressBar.tick(0);
  }

  getSize(directory, (err, size) => {
    if (progressBar.curr < nodeModulesSize) {
      const chunk = size - lastChunk;

      if (chunk < lastChunk) {
        return;
      }

      if (!done) {
        progressBar.tick(chunk);
      }

      lastChunk += chunk;
    }
  });
}
