'use strict';

const fs        = require('fs-extra');
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

  fs.ensureDirSync('app/assets/stylesheets/' + subdirectories);
  Utils.createFile('app/assets/stylesheets/' + subdirectories + Format.toSCSSFileName(stylesheetName), templates.stateStylesheet());
  Utils.appendToFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');

  Logger.blankLine();
};
