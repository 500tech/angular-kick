'use strict';

const Format  = require('lib/format');
const Logger  = require('lib/logger');
const Utils   = require('lib/utils');
const FSUtils = require('lib/fs-utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = FSUtils.destroyFile;
const removeFromFile          = FSUtils.removeFromFile;
const destroyDirectoryIfEmpty = FSUtils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = Format.toJSFileName(name);

  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/config/' + subdirectories + configFileName);
  destroyDirectoryIfEmpty('app/config/' + subdirectories);
  removeFromFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
