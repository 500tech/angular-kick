'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = Format.toServiceName(name);
  const serviceFileName     = Format.toJSFileName(serviceName);
  const serviceSpecFileName = Format.toJSFileName(serviceName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  Utils.destroyFile('app/services/' + subdirectories + serviceFileName);
  Utils.destroyFile('test/unit/services/' + serviceSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/services/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/services/' + subdirectories);
  Utils.removeFromFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + Format.toFolderName(serviceName) + "';\n");
  Utils.modifyFile('app/services/services.js', [{
    find: ")\n  .service('" + serviceName + "', " + serviceName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
