'use strict';

const fs        = require('fs-extra');
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

  fs.ensureDirSync('app/assets/stylesheets/' + subdirectories);
  Utils.createFile('app/assets/stylesheets/' + subdirectories + format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  Utils.appendToFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');

  Logger.blankLine();
};
