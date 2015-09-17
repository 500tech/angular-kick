'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('stylesheet', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const stylesheetName = Format.toFolderName(name);
  subdirectories = Format.parentPath(subdirectories);

  Utils.destroyFile('app/assets/stylesheets/' + subdirectories + Format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  Utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');
  Utils.destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);

  Logger.blankLine();
};
