'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('config', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const configFileName = Format.toJSFileName(name);

  subdirectories = Format.parentPath(subdirectories);

  Utils.destroyFile('app/config/' + subdirectories + configFileName, Templates.config());
  Utils.destroyDirectoryIfEmpty('app/config/' + subdirectories);
  Utils.removeFromFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");

  Logger.blankLine();
};
