'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = format.toJSFileName(name);

  subdirectories = format.parentPath(subdirectories);

  Utils.destroyFile('app/config/' + subdirectories + configFileName, templates.config());
  Utils.destroyDirectoryIfEmpty('app/config/' + subdirectories);
  Utils.removeFromFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
