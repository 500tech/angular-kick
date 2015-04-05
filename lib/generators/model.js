"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('model', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var modelName         = format.toServiceName(name);
  var modelFileName     = format.toJSFileName(modelName);
  var modelSpecFileName = format.toJSFileName(modelName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.createDirectory('app/models/' + subdirectories);
  utils.createFile('app/models/' + subdirectories + modelFileName, templates.model({
    modelName: modelName
  }));

  utils.createDirectory('test/unit/models/' + subdirectories);
  utils.createFile('test/unit/models/' + modelSpecFileName, templates.testModelUnit({
    modelName: modelName
  }));

  utils.prependToFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + format.toFolderName(modelName) + "';\n");
  utils.modifyFile('app/models/models.js', [{
    find: ');',
    replace: ")\n  .service('" + modelName + "', " + modelName + ");"
  }]);
  logger.blankLine();
};
