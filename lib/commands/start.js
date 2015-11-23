'use strict';

const Logger              = require('../logger');
const Utils               = require('../utils');
const message             = require('../messages');
const listenForKeystrokes = require('keypress');
const open                = require('opn');
const portscanner         = require('portscanner');

function runServer(port) {
  const environment = process.argv[3] || 'development';
  const args        = ['--hot', '--progress', '--port', port];
  let command       = 'node_modules/.bin/webpack-dev-server';

  Logger.log(message.server.running(port));
  Logger.log(message.server.commands);

  listenForKeystrokes(process.stdin);

  let childProcess = Utils.spawnProcess(command, args, environment, { inherit: true });

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
          childProcess = Utils.spawnProcess(command, args, environment, { inherit: true });
          Logger.log('Server reloaded!');
        });

        Utils.terminateProcess(childProcess);
        break;

      case 'o':
        open('http://localhost:' + port);
        break;
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
}

module.exports = function () {
  Utils.ensurePackagesExist();

  portscanner.findAPortNotInUse(8080, 8100, '127.0.0.1', (error, availablePort) => {
    runServer(availablePort);
  });
};
