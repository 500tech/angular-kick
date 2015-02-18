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

  templates.createDirectory('app/config/' + subdirectories);
  templates.createFile('app/config/' + subdirectories + configFileName, templates.config());
  logger.blankLine();
};
