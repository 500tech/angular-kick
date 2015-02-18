"use strict";

var fs        = require('fs-extra');
var format    = require('./../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('stylesheet', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var stylesheetName  = format.toFolderName(name);
  subdirectories = format.parentPath(subdirectories);

  fs.ensureDirSync('app/assets/stylesheets/' + subdirectories);
  templates.createFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  templates.appendToFile('app/assets/stylesheets/application.scss', '//= include ' + subdirectories + stylesheetName + '.scss\n');
  logger.blankLine();
};
