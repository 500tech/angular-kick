"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');

module.exports = function (name) {
  name = format.checkName('filter', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var filterName          = format.toFilterName(name);
  var filterFileName      = format.toJSFileName(filterName);
  var filterSpecFileName  = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/filters/' + subdirectories + filterFileName);
  utils.destroyFile('test/unit/filters/' + subdirectories + filterSpecFileName);
  utils.destroyDirectoryIfEmpty('app/filters/' + subdirectories);
  utils.destroyDirectoryIfEmpty('test/unit/filters/' + subdirectories);
  utils.modifyFile('app/filters/filters.js', "require('./" + subdirectories + filterFileName.replace('.js', '') + "');\n", '');
  logger.blankLine();
};
