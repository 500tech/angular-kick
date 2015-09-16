'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = format.toServiceName(name);
  const serviceFileName     = format.toJSFileName(serviceName);
  const serviceSpecFileName = format.toJSFileName(serviceName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.destroyFile('app/services/' + subdirectories + serviceFileName);
  Utils.destroyFile('test/unit/services/' + serviceSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/services/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/services/' + subdirectories);
  Utils.removeFromFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + format.toFolderName(serviceName) + "';\n");
  Utils.modifyFile('app/services/services.js', [{
    find: ")\n  .service('" + serviceName + "', " + serviceName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
