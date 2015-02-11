"use strict";

var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('model', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var modelName         = format.toServiceName(name);
  var modelFileName     = format.toJSFileName(modelName);
  var modelSpecFileName = format.toJSFileName(modelName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/models/' + subdirectories + modelFileName);
  templates.destroyFile('test/unit/models/' + modelSpecFileName);
  templates.destroyDirectoryIfEmpty('app/models/' + subdirectories);
  templates.destroyDirectoryIfEmpty('test/unit/models/' + subdirectories);
  console.log('');
};
