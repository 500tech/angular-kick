'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = Format.toServiceName(name);
  const modelFileName     = Format.toJSFileName(modelName);
  const modelSpecFileName = Format.toJSFileName(modelName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  Utils.destroyFile('app/models/' + subdirectories + modelFileName);
  Utils.destroyFile('test/unit/models/' + modelSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/models/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/models/' + subdirectories);
  Utils.removeFromFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + Format.toFolderName(modelName) + "';\n");
  Utils.modifyFile('app/models/models.js', [{
    find: ")\n  .service('" + modelName + "', " + modelName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
