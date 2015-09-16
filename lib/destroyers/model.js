'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = format.toServiceName(name);
  const modelFileName     = format.toJSFileName(modelName);
  const modelSpecFileName = format.toJSFileName(modelName + '.spec');

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

  Logger.blankLine();
};
