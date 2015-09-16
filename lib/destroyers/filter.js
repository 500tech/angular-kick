'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName         = format.toFilterName(name);
  const filterFileName     = format.toJSFileName(filterName);
  const filterSpecFileName = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/filters/' + subdirectories + filterFileName);
  utils.destroyFile('test/unit/filters/' + subdirectories + filterSpecFileName);
  utils.destroyDirectoryIfEmpty('app/filters/' + subdirectories);
  utils.destroyDirectoryIfEmpty('test/unit/filters/' + subdirectories);
  utils.removeFromFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + format.toFolderName(filterName) + "';\n");
  utils.modifyFile('app/filters/filters.js', [{
    find: ")\n  .filter('" + filterName + "', " + filterName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
