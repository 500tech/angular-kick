"use strict";

var fs        = require('fs-extra');
var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('stylesheet', name);
  if (!name) return;

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var stylesheetName  = format.toFolderName(name);
  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  templates.modifyFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n', '');
  templates.destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);
  console.log('');
};