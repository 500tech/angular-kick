'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = format.toServiceName(name);
  const modelFileName     = format.toJSFileName(modelName);
  const modelSpecFileName = format.toJSFileName(modelName + '.spec');

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

  Logger.blankLine();
};
