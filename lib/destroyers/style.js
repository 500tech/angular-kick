'use strict';

const format    = require('../formatters');
const logger    = require('../logger');
const utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('stylesheet', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const stylesheetName = format.toFolderName(name);
  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');
  utils.destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);

  logger.blankLine();
};
