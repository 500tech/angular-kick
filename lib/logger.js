"use strict";

module.exports = {
  mkdir:  function (filename) {
    console.log(' MKDIR  '.blue + filename);
  },

  rmdir:  function (filename) {
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
  }
};
