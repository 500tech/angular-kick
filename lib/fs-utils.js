'use strict';

const fs            = require('fs-extra');
const changeCase    = require('change-case');
const path          = require('path');
const prompt        = require('readline-sync').question;
const message       = require('lib/messages');
const Logger        = require('lib/logger');

module.exports = class FSUtils {

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

    return file.replace(/%APP_NAME%/g, Utils.appName);
  }

  static createFile(filename, template) {
    if (FSUtils.exists(filename)) {
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
    if (!FSUtils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename, string + fs.readFileSync(filename, 'utf-8'))
  }

  static appendToFile(filename, string) {
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
    if (!FSUtils.exists(filename)) {
      return;
    }
    Logger.modifyFile(filename);
    return fs.writeFileSync(filename,
      fs.readFileSync(filename, 'utf8').replace(pattern, '')
    );
  }

  static createDirectory(name) {
    if (!FSUtils.exists(name)) {
      Logger.mkdir(name);
    }
    return fs.ensureDirSync(name);
  }

  static destroyFile(filename) {
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
    if (FSUtils.exists(name) && FSUtils.isEmptyDir(name)) {
      Logger.rmdir(name);
      return fs.removeSync(name);
    }
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
