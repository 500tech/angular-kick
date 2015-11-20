'use strict';

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
  'lint',
  'upgrade'
];

commands.forEach((command) => exportedCommands[command] = require('lib/commands/' + command));

module.exports = exportedCommands;
