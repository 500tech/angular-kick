'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = format.toServiceName(name);
  const modelFileName     = format.toJSFileName(modelName);
  const modelSpecFileName = format.toJSFileName(modelName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.createDirectory('app/models/' + subdirectories);
  Utils.createFile('app/models/' + subdirectories + modelFileName, templates.model({
    modelName: modelName
  }));

  Utils.createDirectory('test/unit/models/' + subdirectories);
  Utils.createFile('test/unit/models/' + modelSpecFileName, templates.testModelUnit({
    modelName: modelName
  }));

  Utils.prependToFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + format.toFolderName(modelName) + "';\n");
  Utils.modifyFile('app/models/models.js', [{
    find: ');',
    replace: ")\n  .service('" + modelName + "', " + modelName + ");"
  }]);

  Logger.blankLine();
};
