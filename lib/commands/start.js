'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'development';
  const args        = ['--hot', '--progress'];
  let command       = 'node_modules/.bin/webpack-dev-server';

  Logger.log(message.server.running);
  Logger.log(message.server.stop);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  Utils.spawnProcess(command, args, environment);
};
