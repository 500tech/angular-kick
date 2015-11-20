'use strict';

const which         = require('which');
const fs            = require('fs-extra');
const changeCase    = require('change-case');
const child_process = require('child_process');
const nodePath      = require('path');
const prompt        = require('readline-sync').question;
const message       = require('lib/messages');
const Logger        = require('lib/logger');

module.exports = class Utils {

  static getPath(path) {
    return nodePath.join.apply(null, (path || '').split('/'));
  }

  static appName() {
    return Utils.exists('package.json') ? fs.readJSONSync('package.json').name : '';
  }

  static isEmptyDir(path) {
    path = Utils.getPath(path);
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
      which.sync(moduleName);
    } catch (e) {
      // If some global module doesn't exist, suggest to install it
      Logger.warn(message.moduleNotInstalled(moduleName));
      Logger.log(message.installModuleQuestion(moduleName));

      const result = prompt(message.yesNo).toLowerCase();

      if (result === 'yes' || result === 'y' || result === '') {
        Logger.log(message.installingModule(moduleName));
        Utils.spawnProcess('npm', ['install', '-g', moduleName], null, { sync: true });
        Logger.done();
        process.exit(0);
      } else {
        Logger.warn(message.pleaseInstall(moduleName));
        process.exit(0);
      }
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
    filename = Utils.getPath(filename);
    if (Utils.exists(filename)) {
      Logger.warn(`${filename.yellow} ${'already exists.'.white}`);

      const answer = prompt(`${message.new.overrideQuestion} ${message.yesNo}`);
      Logger.blankLine();

      switch (answer.toLowerCase()) {
        case 'yes':
        case 'y':
          break;
        default:
          return Logger.log(`${filename} was not overriden`);
      }
    }

    Logger.createFile(filename);
    fs.writeFileSync(filename, template);
  }

  static prependToFile(filename, string) {
    filename = Utils.getPath(filename);
    if (!Utils.exists(filename)) {
      return;
    }

    Logger.modifyFile(filename);
    return fs.writeFileSync(filename, string + fs.readFileSync(filename, 'utf-8'))
  }

  static appendToFile(filename, string) {
    filename = Utils.getPath(filename);
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
    filename = Utils.getPath(filename);
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
    filename = Utils.getPath(filename);
    if (!Utils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename,
      fs.readFileSync(filename, 'utf8').replace(pattern, '')
    );
  }

  static createDirectory(name) {
    name = Utils.getPath(name);
    if (!Utils.exists(name)) {
      Logger.mkdir(name);
    }
    return fs.ensureDirSync(name);
  }

  static destroyFile(filename) {
    filename = Utils.getPath(filename);
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

    name = Utils.getPath(name);
    if (Utils.exists(name) && Utils.isEmptyDir(name)) {
      Logger.rmdir(name);
      return fs.removeSync(name);
    }
  }

  static spawnProcess(command, args, environment, options) {
    if (command.indexOf('/') !== -1) {
      command = Utils.getPath(command);
    }

    if (process.platform === 'win32') {
      args.unshift('/c', command);
      command = process.env.comspec;
    }

    const env = Object.create(process.env);
    if (environment) {
      env.NODE_ENV = environment;
    }

    if ((options || {}).sync) {
      const execSync = require('child_process').execSync;
      args = args.join(' ');

      return execSync(`${command} ${args}`);
    } else {
      const spawn = require('child_process').spawn;

      return spawn(command, args, {
        stdio: (options || {}).inherit ? 'inherit' : ['pipe', 'pipe', process.stderr],
        env
      });
    }
  }

  static terminateProcess(childProcess) {
    var isWin = /^win/.test(process.platform);
    if(!isWin) {
      childProcess.kill('SIGHUP');
    } else {
      const child_process = require('child_process');
      child_process.exec(`taskkill /PID ${childProcess.pid} /T /F`, function (error, stdout, stderr) {
        // console.log('stdout: ' + stdout);
        // console.log('stderr: ' + stderr);
        // if(error !== null) {
        //      console.log('exec error: ' + error);
        // }
      });
    }
  }

  static exists(fileName) {
    fileName = Utils.getPath(fileName);

    try {
      fs.statSync(fileName);
    } catch (error) {
      return false;
    }
    return true;
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
