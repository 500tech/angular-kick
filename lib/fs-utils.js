'use strict';

const fs         = require('fs-extra');
const changeCase = require('change-case');
const path       = require('path');
const prompt     = require('readline-sync').question;
const message    = require('./messages');
const Logger     = require('./logger');

module.exports = class FSUtils {

  static appName() {
    return FSUtils.exists('package.json') ? fs.readJSONSync('package.json').name : '';
  }

  static getPath(localPath) {
    return path.join.apply(null, (localPath || '').split('/'));
  }

  static isEmptyDir(path) {
    const files = fs.readdirSync(path);

    return !files.length;
  }

  static replaceInFile(filename, replacements) {
    let file = fs.readFileSync(filename, 'utf8');

    Object.keys(replacements).forEach((key) => {
      const value = new RegExp('%' + changeCase.constantCase(key) + '%', 'g');

      file = file.replace(value, replacements[key]);
    });

    return file.replace(/%APP_NAME%/g, FSUtils.appName());
  }

  static createFile(filename, template) {
    filename = FSUtils.getPath(filename);

    if (FSUtils.exists(filename)) {
      Logger.warn(`${filename.yellow} ${'already exists.'.white}`);

      const answer = prompt(`${message.new.overrideQuestion} ${message.yesNo}`);
      Logger.blankLine();

      switch (answer.toLowerCase()) {
        case 'yes':
        case 'y':
          break;
        default:
          Logger.log(`${filename} was not overriden`);
          process.exit(0);
      }
    }

    Logger.createFile(filename);
    fs.writeFileSync(filename, template);
  }

  static prependToFile(filename, string) {
    filename = FSUtils.getPath(filename);

    if (!FSUtils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename, string + fs.readFileSync(filename, 'utf-8'))
  }

  static appendToFile(filename, string) {
    filename = FSUtils.getPath(filename);

    if (!FSUtils.exists(filename)) {
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
    filename = FSUtils.getPath(filename);

    if (!FSUtils.exists(filename)) {
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
    filename = FSUtils.getPath(filename);

    if (!FSUtils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename,
      fs.readFileSync(filename, 'utf8').replace(pattern, '')
    );
  }

  static createDirectory(name) {
    name = FSUtils.getPath(name);

    if (!FSUtils.exists(name)) {
      Logger.mkdir(name);
    }
    return fs.ensureDirSync(name);
  }

  static destroyFile(filename) {
    filename = FSUtils.getPath(filename);

    if (FSUtils.exists(filename)) {
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

    name = FSUtils.getPath(name);
    if (FSUtils.exists(name) && FSUtils.isEmptyDir(name)) {
      Logger.rmdir(name);
      return fs.removeSync(name);
    }
  }

  static exists(fileName) {
    fileName = FSUtils.getPath(fileName);

    try {
      fs.statSync(fileName);
    } catch (error) {
      return false;
    }
    return true;
  }
};
