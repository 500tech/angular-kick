'use strict';

const Logger              = require('lib/logger');
const Utils               = require('lib/utils');
const message             = require('lib/messages');
const listenForKeystrokes = require('keypress');
const open                = require('opn');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'development';
  const args        = ['--hot', '--progress'];
  let command       = 'node_modules/.bin/webpack-dev-server';

  Logger.log(message.server.running);
  Logger.log(message.server.commands);

  listenForKeystrokes(process.stdin);

  let childProcess = Utils.spawnProcess(command, args, environment);

  // Catch keystrokes from the process
  // This enables restarting and opening the browser
  process.stdin.on('keypress', (character, key) => {
    if (!key || !key.ctrl) {
      return;
    }

    switch (key.name) {
      case 'c':
        childProcess.on('exit', () => {
          process.exit();
        });

        Logger.log('Stopping server...');
        Utils.terminateProcess(childProcess);
        break;

      case 'r':
        childProcess.on('exit', () => {
          childProcess = Utils.spawnProcess(command, args, environment);
          Logger.log('Server reloaded!');
        });

        Utils.terminateProcess(childProcess);
        break;

      case 'o':
        open('http://localhost:8080');
        break;
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
};
