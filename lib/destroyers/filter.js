'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName         = format.toFilterName(name);
  const filterFileName     = format.toJSFileName(filterName);
  const filterSpecFileName = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.destroyFile('app/filters/' + subdirectories + filterFileName);
  Utils.destroyFile('test/unit/filters/' + subdirectories + filterSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/filters/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/filters/' + subdirectories);
  Utils.removeFromFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + format.toFolderName(filterName) + "';\n");
  Utils.modifyFile('app/filters/filters.js', [{
    find: ")\n  .filter('" + filterName + "', " + filterName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
