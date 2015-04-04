"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('filter', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var filterName          = format.toFilterName(name);
  var filterFileName      = format.toJSFileName(filterName);
  var filterSpecFileName  = format.toJSFileName(filterName + '.spec');

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

  utils.appendToFile('app/filters/filters.js', "require('./" + subdirectories + filterFileName.replace('.js', '') + "');\n");
  logger.blankLine();
};
