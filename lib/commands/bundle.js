"use strict";

const Logger = require('../logger');
const Utils  = require('../utils');

var message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();

  var environment = process.argv[3] || 'production';
  var command = 'npm';
  var args = ['run', 'bundle'];
  var proc;

  Logger.log(message.bundle.start);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  proc = Utils.spawnProcess(command, args, environment);

  proc.on('exit', function () {
    Logger.done();
  });
};
