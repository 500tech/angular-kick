'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName         = Format.toFilterName(name);
  const filterFileName     = Format.toJSFileName(filterName);
  const filterSpecFileName = Format.toJSFileName(filterName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  Utils.destroyFile('app/filters/' + subdirectories + filterFileName);
  Utils.destroyFile('test/unit/filters/' + subdirectories + filterSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/filters/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/filters/' + subdirectories);
  Utils.removeFromFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + Format.toFolderName(filterName) + "';\n");
  Utils.modifyFile('app/filters/filters.js', [{
    find: ")\n  .filter('" + filterName + "', " + filterName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
