'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = Format.toJSFileName(name);

  subdirectories = Format.parentPath(subdirectories);

  Utils.createDirectory(`app/config/${subdirectories}`);
  Utils.createFile('app/config/' + subdirectories + configFileName, templates.config());

  Utils.appendToFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
