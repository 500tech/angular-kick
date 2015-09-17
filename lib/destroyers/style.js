'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('stylesheet', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const stylesheetName = format.toFolderName(name);
  subdirectories = format.parentPath(subdirectories);

  Utils.destroyFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  Utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');
  Utils.destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);

  Logger.blankLine();
};
