'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const FSUtils   = require('../fs-utils');
const Templates = require('../templates');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = FSUtils.destroyFile;
const removeFromFile          = FSUtils.removeFromFile;
const destroyDirectoryIfEmpty = FSUtils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('stylesheet', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const stylesheetName = Format.toFolderName(name);
  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/assets/stylesheets/' + subdirectories + Format.toSCSSFileName(stylesheetName), Templates.stateStylesheet());
  removeFromFile('app/assets/stylesheets/application.scss', '@import "' + subdirectories + stylesheetName + '";\n');
  destroyDirectoryIfEmpty('app/assets/stylesheets/' + subdirectories);

  Logger.blankLine();
};
