'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName          = format.toFilterName(name);
  const filterFileName      = format.toJSFileName(filterName);
  const filterSpecFileName  = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.createDirectory('app/filters/' + subdirectories);
  utils.createFile('app/filters/' + subdirectories + filterFileName,
    templates.filter({ filterName: filterName })
  );

  utils.createDirectory('test/unit/filters/' + subdirectories);
  utils.createFile('test/unit/filters/' + subdirectories + filterSpecFileName,
    templates.testFilterUnit({
      filterName: filterName
    })
  );

  utils.prependToFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + format.toFolderName(filterName) + "';\n");
  utils.modifyFile('app/filters/filters.js', [{
    find: ');',
    replace: ")\n  .filter('" + filterName + "', " + filterName + ");"
  }]);

  Logger.blankLine();
};
