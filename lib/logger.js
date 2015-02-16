"use strict";

module.exports = {
  mkdir:  function (filename) {
    console.log(' MKDIR  '.blue + filename);
  },

  rmdir:  function (filename) {
    console.log(' RMDIR  '.red + filename);
  },

  create: function (filename) {
    console.log('CREATE  '.green + filename);
  },

  destroy: function (filename) {
    console.log('DELETE  '.red + filename);
  },

  modify: function (filename) {
    console.log('MODIFY  '.yellow + filename);
  },

  done: function () {
    console.log('✔ Done.'.green);
  },

  warn: function (message) {
    return console.log('⚠ '.red + message.yellow);
  },

  log: function (message) {
    return console.log(message);
  }
};
