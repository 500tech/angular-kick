"use strict";

var format    = require('../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('filter', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var filterName          = format.toFilterName(name);
  var filterFileName      = format.toJSFileName(filterName);
  var filterSpecFileName  = format.toJSFileName(filterName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.createDirectory('app/filters/' + subdirectories);
  templates.createFile('app/filters/' + subdirectories + filterFileName,
    templates.filter({ filterName: filterName })
  );

  templates.createDirectory('test/unit/filters/' + subdirectories);
  templates.createFile('test/unit/filters/' + subdirectories + filterSpecFileName,
    templates.testFilterUnit({
      filterName: filterName
    })
  );
  console.log('');
};