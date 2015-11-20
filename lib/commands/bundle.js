'use strict';

const Logger  = require('lib/logger');
const Utils   = require('lib/utils');
const message = require('lib/messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  const environment = process.argv[3] || 'production';
  const args        = ['-p', '--progress'];
  let command       = 'node_modules/.bin/webpack';

  Logger.log(message.bundle.start);

  const proc = Utils.spawnProcess(command, args, environment);

  proc.on('exit', () => Logger.done());
};
