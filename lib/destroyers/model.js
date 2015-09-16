'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = format.toServiceName(name);
  const modelFileName     = format.toJSFileName(modelName);
  const modelSpecFileName = format.toJSFileName(modelName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.destroyFile('app/models/' + subdirectories + modelFileName);
  Utils.destroyFile('test/unit/models/' + modelSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/models/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/models/' + subdirectories);
  Utils.removeFromFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + format.toFolderName(modelName) + "';\n");
  Utils.modifyFile('app/models/models.js', [{
    find: ")\n  .service('" + modelName + "', " + modelName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
