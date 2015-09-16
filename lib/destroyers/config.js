'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = format.toJSFileName(name);

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/config/' + subdirectories + configFileName, templates.config());
  utils.destroyDirectoryIfEmpty('app/config/' + subdirectories);
  utils.removeFromFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
