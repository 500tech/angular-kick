"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('config', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var configFileName      = format.toJSFileName(name);

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/config/' + subdirectories + configFileName, templates.config());
  utils.destroyDirectoryIfEmpty('app/config/' + subdirectories);
  utils.modifyFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n", '');
  logger.blankLine();
};
