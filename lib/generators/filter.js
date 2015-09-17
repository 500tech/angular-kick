'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('filter', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const filterName          = Format.toFilterName(name);
  const filterFileName      = Format.toJSFileName(filterName);
  const filterSpecFileName  = Format.toJSFileName(filterName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

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

  Utils.prependToFile('app/filters/filters.js', "import { " + filterName + " } from './" + subdirectories + Format.toFolderName(filterName) + "';\n");
  Utils.modifyFile('app/filters/filters.js', [{
    find: ');',
    replace: ")\n  .filter('" + filterName + "', " + filterName + ");"
  }]);

  Logger.blankLine();
};
