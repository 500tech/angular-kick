'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = Format.toServiceName(name);
  const modelFileName     = Format.toJSFileName(modelName);
  const modelSpecFileName = Format.toJSFileName(modelName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  Utils.createDirectory('app/models/' + subdirectories);
  Utils.createFile('app/models/' + subdirectories + modelFileName, Templates.model({
    modelName: modelName
  }));

  Utils.createDirectory('test/unit/models/' + subdirectories);
  Utils.createFile('test/unit/models/' + modelSpecFileName, Templates.testModelUnit({
    modelName: modelName
  }));

  Utils.prependToFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + Format.toFolderName(modelName) + "';\n");
  Utils.modifyFile('app/models/models.js', [{
    find: ');',
    replace: ")\n  .service('" + modelName + "', " + modelName + ");"
  }]);

  Logger.blankLine();
};
