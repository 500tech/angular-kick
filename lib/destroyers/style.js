"use strict";

var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('stylesheet', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var stylesheetName  = format.toFolderName(name);
  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  templates.modifyFile('app/assets/stylesheets/application.scss', '//= include ' + subdirectories + stylesheetName + '.scss\n', '');
  templates.destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);
  console.log('');
};