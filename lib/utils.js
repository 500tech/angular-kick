'use strict';

const which         = require('which');
const fs            = require('fs-extra');
const child_process = require('child_process');
const prompt        = require('readline-sync').question;
const message       = require('./messages');
const Logger        = require('./logger');
const FSUtils       = require('./fs-utils');

module.exports = class Utils {

  static ensurePackagesExist() {
    if (!FSUtils.exists('node_modules')) {
      Logger.warn(message.missingPackages);
      Logger.log(message.runSetup);
      process.exit(0);
    }
  }

  static ensureGlobalModule(moduleName) {
    Logger.log(message.checkingModulePresence(moduleName));

    try {
      which.sync(moduleName);
    } catch (e) {
      // If some global module doesn't exist, suggest to install it
      Logger.warn(message.moduleNotInstalled(moduleName));
      Logger.log(message.installModuleQuestion(moduleName));

      const result = prompt(message.yesNo).toLowerCase();

      if (result === 'yes' || result === 'y' || result === '') {
        Logger.log(message.installingModule(moduleName));
        Utils.execSync('npm', ['install', '-g', moduleName]);
        Logger.done();
        process.exit(0);
      } else {
        Logger.warn(message.pleaseInstall(moduleName));
        process.exit(0);
      }
    }
  }

  static spawnProcess(command, args, environment, options) {
    command = Utils.prepareCommand(command, args);
    const env = Utils.getENV(environment);

    const spawn = child_process.spawn;

    return spawn(command, args, {
      stdio: (options || {}).inherit ? 'inherit' : ['pipe', 'pipe', process.stderr],
      env
    });
  }

  static execSync(command, args) {
    command = Utils.prepareCommand(command, args);

    const exec = child_process.execSync;
    args = args.join(' ');

    return exec(`${command} ${args}`);
  }

  static prepareCommand(command, args) {

    // if the command contains a path get the correct path to the command
    if (command.indexOf('/') !== -1) {
      command = FSUtils.getPath(command);
    }

    if (process.platform === 'win32') {
      args.unshift('/c', command);
      command = process.env.comspec;
    }

    return command;
  }

  static getENV(environment) {
    const env = Object.create(process.env);

    if (environment) {
      env.NODE_ENV = environment;
    }

    return env;
  }

  static terminateProcess(childProcess) {
    const isWin = /^win/.test(process.platform);

    if(!isWin) {
      childProcess.kill('SIGHUP');
    } else {
      child_process.exec(`taskkill /PID ${childProcess.pid} /T /F`,
        (error, stdout, stderr) => {});
    }
  }

  static ensureName(type, name) {
    if (!name) {
      Logger.log(('Please specify a name for your '+ type).white);
      name = prompt('No'.red + ' or ' + 'N'.red + ' to cancel: ');
    }

    if (name.match(/^[^a-zA-Z]/) || name.match(/[^-_a-zA-Z0-9/]/)) {
      Logger.log('Names should start with a character and contain only characters, digits, dashes or underscores'.yellow);
      Logger.log(('Please specify another name for your '+ type).white);
      name = prompt('No'.red + ' or ' + 'N'.red + ' to cancel: ');
    }

    if (name.match(/^[^a-zA-Z]/) || name.match(/[^-_a-zA-Z0-9/]/)) {
      Logger.warn("You can't use '" + name.blue + ("' as a " + type + " name.").yellow);
      process.exit(1);
    }

    switch (name.toLowerCase()) {
      case '':
      case 'no':
      case 'n':
      case 'cancel':
        Logger.warn(`Any ${type} should have a name`);
        process.exit(1);
        break;
    }

    return name;
  }
};
