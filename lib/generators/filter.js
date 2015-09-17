'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName          = format.toFilterName(name);
  const filterFileName      = format.toJSFileName(filterName);
  const filterSpecFileName  = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.createDirectory('app/filters/' + subdirectories);
  Utils.createFile('app/filters/' + subdirectories + filterFileName,
    templates.filter({ filterName: filterName })
  );

  Utils.createDirectory('test/unit/filters/' + subdirectories);
  Utils.createFile('test/unit/filters/' + subdirectories + filterSpecFileName,
    templates.testFilterUnit({
      filterName: filterName
    })
  );

  Utils.prependToFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + format.toFolderName(filterName) + "';\n");
  Utils.modifyFile('app/filters/filters.js', [{
    find: ');',
    replace: ")\n  .filter('" + filterName + "', " + filterName + ");"
  }]);

  Logger.blankLine();
};
