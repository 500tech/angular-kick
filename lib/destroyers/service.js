'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = Utils.destroyFile;
const modifyFile              = Utils.modifyFile;
const removeFromFile          = Utils.removeFromFile;
const destroyDirectoryIfEmpty = Utils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = Format.toServiceName(name);
  const serviceFileName     = Format.toJSFileName(serviceName);
  const serviceSpecFileName = Format.toJSFileName(serviceName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/services/' + subdirectories + serviceFileName);
  destroyFile('test/unit/services/' + serviceSpecFileName);
  destroyDirectoryIfEmpty('app/services/' + subdirectories);
  destroyDirectoryIfEmpty('test/unit/services/' + subdirectories);
  removeFromFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + Format.toFolderName(serviceName) + "';\n");
  modifyFile('app/services/services.js', [{
    find: ")\n  .service('" + serviceName + "', " + serviceName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
