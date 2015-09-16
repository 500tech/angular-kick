'use strict';

const format = require('../formatters');
const logger = require('../logger');
const utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = format.toServiceName(name);
  const serviceFileName     = format.toJSFileName(serviceName);
  const serviceSpecFileName = format.toJSFileName(serviceName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/services/' + subdirectories + serviceFileName);
  utils.destroyFile('test/unit/services/' + serviceSpecFileName);
  utils.destroyDirectoryIfEmpty('app/services/' + subdirectories);
  utils.destroyDirectoryIfEmpty('test/unit/services/' + subdirectories);
  utils.removeFromFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + format.toFolderName(serviceName) + "';\n");
  utils.modifyFile('app/services/services.js', [{
    find: ")\n  .service('" + serviceName + "', " + serviceName + ");",
    replace: ");"
  }]);

  logger.blankLine();
};
