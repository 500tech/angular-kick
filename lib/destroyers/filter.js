'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = Utils.destroyFile;
const modifyFile              = Utils.modifyFile;
const removeFromFile          = Utils.removeFromFile;
const destroyDirectoryIfEmpty = Utils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName         = Format.toFilterName(name);
  const filterFileName     = Format.toJSFileName(filterName);
  const filterSpecFileName = Format.toJSFileName(filterName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/filters/' + subdirectories + filterFileName);
  destroyFile('test/unit/filters/' + subdirectories + filterSpecFileName);
  destroyDirectoryIfEmpty('app/filters/' + subdirectories);
  destroyDirectoryIfEmpty('test/unit/filters/' + subdirectories);
  removeFromFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + Format.toFolderName(filterName) + "';\n");
  modifyFile('app/filters/filters.js', [{
    find: ")\n  .filter('" + filterName + "', " + filterName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
