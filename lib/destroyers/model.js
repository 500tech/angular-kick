'use strict';

const Format = require('lib/format');
const Logger = require('lib/logger');
const Utils  = require('lib/utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = Utils.destroyFile;
const modifyFile              = Utils.modifyFile;
const removeFromFile          = Utils.removeFromFile;
const destroyDirectoryIfEmpty = Utils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = Format.toServiceName(name);
  const modelFileName     = Format.toJSFileName(modelName);
  const modelSpecFileName = Format.toJSFileName(modelName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/models/' + subdirectories + modelFileName);
  destroyFile('test/unit/models/' + modelSpecFileName);
  destroyDirectoryIfEmpty('app/models/' + subdirectories);
  destroyDirectoryIfEmpty('test/unit/models/' + subdirectories);
  removeFromFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + Format.toFolderName(modelName) + "';\n");
  modifyFile('app/models/models.js', [{
    find: ")\n  .service('" + modelName + "', " + modelName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
