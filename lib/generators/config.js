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

  utils.createDirectory('app/config/' + subdirectories);
  utils.createFile('app/config/' + subdirectories + configFileName, templates.config());

  utils.appendToFile('app/config/config.js', "require('./" + subdirectories + configFileName.replace('.js', '') + "');\n");
  logger.blankLine();
};
