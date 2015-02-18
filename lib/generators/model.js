"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('model', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var modelName         = format.toServiceName(name);
  var modelFileName     = format.toJSFileName(modelName);
  var modelSpecFileName = format.toJSFileName(modelName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.createDirectory('app/models/' + subdirectories);
  templates.createFile('app/models/' + subdirectories + modelFileName, templates.model({
    modelName: modelName
  }));

  templates.createDirectory('test/unit/models/' + subdirectories);
  templates.createFile('test/unit/models/' + modelSpecFileName, templates.testModelUnit({
    modelName: modelName
  }));
  logger.log('');
};
