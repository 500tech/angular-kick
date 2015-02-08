"use strict";

var fs        = require('fs-extra');
var format    = require('../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('filter', name);
  if (!name) return;

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var filterName          = format.toFilterName(name);
  var filterFileName      = format.toJSFileName(filterName);
  var filterSpecFileName  = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/filters/' + subdirectories + filterFileName);
  templates.destroyFile('test/unit/filters/' + subdirectories + filterSpecFileName);
  templates.destroyDirectoryIfEmpty('app/filters/' + subdirectories);
  templates.destroyDirectoryIfEmpty('test/unit/filters/' + subdirectories);
  console.log('');
};