'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = Utils.destroyFile;
const removeFromFile          = Utils.removeFromFile;
const destroyDirectoryIfEmpty = Utils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Format.checkName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = Format.toJSFileName(name);

  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/config/' + subdirectories + configFileName);
  destroyDirectoryIfEmpty('app/config/' + subdirectories);
  removeFromFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
