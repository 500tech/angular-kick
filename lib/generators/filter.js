'use strict';

const Format    = require('lib/format');
const Logger    = require('lib/logger');
const Utils     = require('lib/utils');
const FSUtils   = require('lib/fs-utils');
const Templates = require('lib/templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = FSUtils.createDirectory;
const createFile      = FSUtils.createFile;
const modifyFile      = FSUtils.modifyFile;
const prependToFile   = FSUtils.prependToFile;

module.exports = function (name) {
  name = Utils.ensureName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName          = Format.toFilterName(name);
  const filterFileName      = Format.toJSFileName(filterName);
  const filterSpecFileName  = Format.toJSFileName(filterName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  createDirectory('app/filters/' + subdirectories);
  createFile('app/filters/' + subdirectories + filterFileName,
    Templates.filter({ filterName })
  );

  createDirectory('test/unit/filters/' + subdirectories);
  createFile('test/unit/filters/' + subdirectories + filterSpecFileName,
    Templates.testFilterUnit({ filterName })
  );

  prependToFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + Format.toFolderName(filterName) + "';\n");
  modifyFile('app/filters/filters.js', [{
    find: ');',
    replace: ")\n  .filter('" + filterName + "', " + filterName + ");"
  }]);

  Logger.blankLine();
};
