'use strict';

const fs        = require('fs-extra');
const Format    = require('lib/format');
const Logger    = require('lib/logger');
const Utils     = require('lib/utils');
const Templates = require('lib/templates');

// TODO: Replace with object destructuring once available in nodejs
const createFile   = Utils.createFile;
const appendToFile = Utils.appendToFile;

module.exports = function (name) {
  name = Utils.ensureName('stylesheet', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const stylesheetName = Format.toFolderName(name);
  subdirectories = Format.parentPath(subdirectories);

  fs.ensureDirSync('app/assets/stylesheets/' + subdirectories);
  createFile('app/assets/stylesheets/' + subdirectories + Format.toSCSSFileName(stylesheetName), Templates.stateStylesheet());
  appendToFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');

  Logger.blankLine();
};
