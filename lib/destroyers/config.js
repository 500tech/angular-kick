"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('config', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var configFileName      = format.toJSFileName(name);

  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/config/' + subdirectories + configFileName, templates.config());
  templates.destroyDirectoryIfEmpty('app/config/' + subdirectories);
  templates.modifyFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n", '');
  logger.blankLine();
};
