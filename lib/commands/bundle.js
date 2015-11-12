'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'production';
  const args        = ['run', 'build'];
  let command       = 'npm';

  Logger.log(message.bundle.start);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  const proc = Utils.spawnProcess(command, args, environment);

  proc.on('exit', () => Logger.done());
};
