'use strict';

const fs        = require('fs-extra');
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

  fs.ensureDirSync('app/assets/stylesheets/' + subdirectories);
  utils.createFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  utils.appendToFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');

  logger.blankLine();
};
