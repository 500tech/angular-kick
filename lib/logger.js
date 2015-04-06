"use strict";
var fs = require('fs-extra');

module.exports = {
  mkdir: function (filename) {
    console.log(' MKDIR  '.blue + filename);
  },

  rmdir: function (filename) {
    console.log(' RMDIR  '.red + filename);
  },

  createFile: function (filename) {
    console.log('CREATE  '.green + filename);
  },

  destroyFile: function (filename) {
    console.log('DELETE  '.red + filename);
  },

  modifyFile: function (filename) {
    console.log('MODIFY  '.yellow + filename);
  },

  done: function () {
    console.log('✔ Done.'.green);
  },

  warn: function (message) {
    console.log('⚠ '.red + message.yellow);
  },

  log: function (message) {
    console.log(message);
  },

  blankLine: function () {
    console.log('');
  },

  directoryTree: function (root, indentation) {
    var self = this;
    var stats = fs.lstatSync(root);
    var filename = root.split('/').pop();
    indentation = indentation || '';

    if (stats.isDirectory()) {
      self.mkdir(indentation + filename + '/');
      fs.readdirSync(root).map(function (child) {
        return self.directoryTree(root + '/' + child, indentation + '  ');
      });
    } else if (!filename.match(/^\./)) {
      self.createFile(indentation + filename);
    }
  }
};