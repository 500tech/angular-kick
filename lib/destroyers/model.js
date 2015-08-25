"use strict";

var format    = require('../formatters');
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
  utils.removeFromFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + format.toFolderName(modelName) + "';\n");
  utils.modifyFile('app/models/models.js', [{
    find: ")\n  .service('" + modelName + "', " + modelName + ");",
    replace: ");"
  }]);
  logger.blankLine();
};
