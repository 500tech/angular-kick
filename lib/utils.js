'use strict';

const fs            = require('fs-extra');
const child_process = require('child_process');
const prompt        = require('readline-sync').question;
const message       = require('lib/messages');
const Logger        = require('lib/logger');
const FSUtils       = require('lib/fs-utils');

module.exports = class Utils {

  static appName() {
    return FSUtils.exists('package.json') ? fs.readJSONSync('package.json').name : '';
  }

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
      child_process.execSync('which ' + moduleName);
    } catch (e) {
      // If some global module doesn't exist, suggest to install it
      Logger.warn(message.moduleNotInstalled(moduleName));
      Logger.log(message.installModuleQuestion(moduleName));

      const result = prompt(message.yesNo).toLowerCase();

      if (result === 'yes' || result === 'y' || result === '') {
        Logger.log(message.installingModule(moduleName));
        child_process.execSync('npm install -g ' + moduleName);
        Logger.done();
        process.exit(0);
      } else {
        Logger.warn(message.pleaseInstall(moduleName));
        process.exit(0);
      }
    }
  }

  static spawnProcess(command, args, environment, options) {
    if (process.platform === 'win32') {
      args.unshift('/c', command);
      command = process.env.comspec;
    }

    const spawn = require('child_process').spawn;
    const env = Object.create(process.env);

    env.NODE_ENV = environment;

    return spawn(command, args, {
      stdio: (options || {}).inherit ? 'inherit' : ['pipe', 'pipe', process.stderr],
      env
    });
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
