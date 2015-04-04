"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var utils     = require('../utils');

module.exports = function (name) {
  name = format.checkName('model', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var modelName         = format.toServiceName(name);
  var modelFileName     = format.toJSFileName(modelName);
  var modelSpecFileName = format.toJSFileName(modelName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/models/' + subdirectories + modelFileName);
  utils.destroyFile('test/unit/models/' + modelSpecFileName);
  utils.destroyDirectoryIfEmpty('app/models/' + subdirectories);
  utils.destroyDirectoryIfEmpty('test/unit/models/' + subdirectories);
  utils.modifyFile('app/models/models.js', "require('./" + subdirectories + modelFileName.replace('.js', '') + "');\n", '');
  logger.blankLine();
};
