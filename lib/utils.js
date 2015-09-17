'use strict';

const Logger = require('./logger');

const fs = require('fs-extra');
const message = require('./messages');
const changeCase = require('change-case');
const child_process = require('child_process');
const path = require('path');
const prompt = require('readline-sync').question;

module.exports = class Utils {

  static appName() {
    return Utils.exists('package.json') ? fs.readJSONSync('package.json').name : '';
  }

  static isEmptyDir(path) {
    const files = fs.readdirSync(path);

    return !files.length;
  }

  static ensurePackagesExist() {
    if (!Utils.exists('node_modules')) {
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

  static ensureNodeVersion() {
    try {
      child_process.execSync('node -v').toString();
    } catch (e) {
      Logger.warn(message.oldNodeVersion);
      process.exit(0);
    }
  }

  static replaceInFile(filename, replacements) {
    let file = fs.readFileSync(filename, 'utf8');

    Object.keys(replacements).forEach((key) => {
      const value = new RegExp('%' + changeCase.constantCase(key) + '%', 'g');

      file = file.replace(value, replacements[key]);
    });

    return file.replace(/%APP_NAME%/g, Utils.appName);
  }

  static createFile(filename, template) {
    Logger.createFile(filename);
    return fs.writeFileSync(filename, template);
  }

  static prependToFile(filename, string) {
    if (!Utils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename, string + fs.readFileSync(filename, 'utf-8'))
  }

  static appendToFile(filename, string) {
    if (!Utils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    if (fs.readFileSync(filename, 'utf-8').match(/\n$/)) {
      return fs.appendFileSync(filename, string);
    } else {
      return fs.appendFileSync(filename, '\n' + string);
    }
  }

  static modifyFile(filename, rules) {
    if (!Utils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return rules.forEach((rule) => {
      fs.writeFileSync(filename,
        fs.readFileSync(filename, 'utf8').replace(rule.find, rule.replace)
      );
    })
  }

  static removeFromFile(filename, pattern) {
    if (!Utils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename,
      fs.readFileSync(filename, 'utf8').replace(pattern, '')
    );
  }

  static createDirectory(name) {
    if (!Utils.exists(name)) {
      Logger.mkdir(name);
    }
    return fs.ensureDirSync(name);
  }

  static destroyFile(filename) {
    if (Utils.exists(filename)) {
      Logger.destroyFile(filename);
    }
    return fs.removeSync(filename);
  }

  static destroyDirectoryIfEmpty(name) {
    if (name.match(/app\/[^\/]*\/$/)) {
      return;
    }
    if (name.match(/test\/unit\/[^\/]*\/$/)) {
      return;
    }
    if (name.match(/test\/mock\/[^\/]*\/$/)) {
      return;
    }
    if (Utils.exists(name) && Utils.isEmptyDir(name)) {
      Logger.rmdir(name);
      return fs.removeSync(name);
    }
  }

  static spawnProcess(command, args, environment, options) {
    const spawn = require('child_process').spawn;
    const env = Object.create(process.env);

    env.NODE_ENV = environment;

    return spawn(command, args, {
      stdio: (options || {}).inherit ? 'inherit' : ['pipe', 'pipe', process.stderr],
      env
    });
  }

  static exists(fileName) {
    try {
      fs.statSync(fileName);
    } catch (error) {
      return false;
    }
    return true;
  }
};
