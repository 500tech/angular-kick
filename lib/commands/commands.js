"use strict";

var exportedCommands = {};

var commands = [
  'help',
  'about',
  'new',
  'generate',
  'destroy',
  'setup',
  'start',
  'tdd',
  'bundle',
  'test',
  'upgrade'
];

commands.forEach(function (command) {
  exportedCommands[command] = require('./' + command)
});

module.exports = exportedCommands;