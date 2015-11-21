'use strict';

const Format    = require('lib/format');
const Logger    = require('lib/logger');
const Utils     = require('lib/utils');
const FSUtils   = require('lib/fs-utils');
const Templates = require('lib/templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = FSUtils.createDirectory;
const createFile      = FSUtils.createFile;
const modifyFile      = FSUtils.modifyFile;
const prependToFile   = FSUtils.prependToFile;

module.exports = function (name, options) {
  name = Utils.ensureName('model', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const modelName         = Format.toServiceName(name);
  const modelFileName     = Format.toJSFileName(modelName);
  const modelSpecFileName = Format.toJSFileName(modelName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  if (options.factory) {
    createDirectory('app/models/' + subdirectories);
    createFile('app/models/' + subdirectories + modelFileName,
      Templates.modelFactory({ modelName })
    );

    prependToFile('app/models/models.js', "import { " + modelName + "Factory } from './" + subdirectories + Format.toFolderName(modelName) + "';\n");
    modifyFile('app/models/models.js', [{
      find: ');',
      replace: ")\n  .factory('" + modelName + "', " + modelName + "Factory);"
    }]);
  } else {
    createDirectory('app/models/' + subdirectories);
    createFile('app/models/' + subdirectories + modelFileName,
      Templates.model({ modelName })
    );

    prependToFile('app/models/models.js', "import { " + modelName + " } from './" + subdirectories + Format.toFolderName(modelName) + "';\n");
    modifyFile('app/models/models.js', [{
      find: ');',
      replace: ")\n  .service('" + modelName + "', " + modelName + ");"
    }]);
  }



  createDirectory('test/unit/models/' + subdirectories);
  createFile('test/unit/models/' + modelSpecFileName,
    Templates.testModelUnit({ modelName })
  );

  Logger.blankLine();
};
