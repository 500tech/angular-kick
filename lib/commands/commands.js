"use strict";

const exportedCommands = {};

const commands = [
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

commands.forEach( command => {
  exportedCommands[command] = require('./' + command)
});

module.exports = exportedCommands;