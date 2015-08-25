"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('stylesheet', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var stylesheetName  = format.toFolderName(name);
  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');
  utils.destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);
  logger.blankLine();
};
