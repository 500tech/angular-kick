'use strict';

const fs          = require('fs-extra');
const clearScreen = require('cli-clear');

module.exports = class Logger {

  static mkdir(filename) {
    console.log(' MKDIR  '.blue + filename);
  }

  static rmdir(filename) {
    console.log(' RMDIR  '.red + filename);
  }

  static createFile(filename) {
    console.log('CREATE  '.green + filename);
  }

  static destroyFile(filename) {
    console.log('DELETE  '.red + filename);
  }

  static modifyFile(filename) {
    console.log('MODIFY  '.yellow + filename);
  }

  static done() {
    console.log('✔ Done.'.green);
  }

  static warn(message) {
    console.log('⚠ '.red + message.yellow);
  }

  static log(message) {
    console.log(message);
  }

  static blankLine() {
    console.log('');
  }

  static clearScreen() {
    clearScreen();
  }

  // Outputs folder structure of the created app in terminal
  // Used by `kick new` command
  static directoryTree(root, indentation) {
    const stats    = fs.lstatSync(root);
    const filename = root.split('/').pop();

    indentation = indentation || '';

    if (stats.isDirectory()) {
      Logger.mkdir(indentation + filename + '/');

      fs.readdirSync(root).map((child) => Logger.directoryTree(`${root}/${child}`, indentation + '  '));
    } else if (!filename.match(/^\./)) {
      Logger.createFile(indentation + filename);
    }
  }
};
