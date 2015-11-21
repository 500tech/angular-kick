'use strict';

const Format    = require('lib/format');
const Logger    = require('lib/logger');
const Utils     = require('lib/utils');
const FSUtils   = require('lib/fs-utils');
const Templates = require('lib/templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = FSUtils.createDirectory;
const createFile      = FSUtils.createFile;
const appendToFile    = FSUtils.appendToFile;

module.exports = function (name) {
  name = Utils.ensureName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = Format.toJSFileName(name);

  subdirectories = Format.parentPath(subdirectories);

  createDirectory(`app/config/${subdirectories}`);
  createFile('app/config/' + subdirectories + configFileName, Templates.config());

  appendToFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
