'use strict';

const fs        = require('fs-extra');
const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const FSUtils   = require('../fs-utils');
const Templates = require('../templates');

// TODO: Replace with object destructuring once available in nodejs
const createFile   = FSUtils.createFile;
const appendToFile = FSUtils.appendToFile;

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
