'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = Utils.createDirectory;
const createFile      = Utils.createFile;
const modifyFile      = Utils.modifyFile;
const prependToFile   = Utils.prependToFile;

module.exports = function (name) {
  name = Utils.ensureName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = Format.toServiceName(name);
  const modelFileName     = Format.toJSFileName(modelName);
  const modelSpecFileName = Format.toJSFileName(modelName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  createDirectory('app/models/' + subdirectories);
  createFile('app/models/' + subdirectories + modelFileName, Templates.model({
    modelName: modelName
  }));

  createDirectory('test/unit/models/' + subdirectories);
  createFile('test/unit/models/' + modelSpecFileName, Templates.testModelUnit({
    modelName: modelName
  }));

  prependToFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + Format.toFolderName(modelName) + "';\n");
  modifyFile('app/models/models.js', [{
    find: ');',
    replace: ")\n  .service('" + modelName + "', " + modelName + ");"
  }]);

  Logger.blankLine();
};
