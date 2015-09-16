'use strict';

const format    = require('../formatters');
const logger    = require('../logger');
const utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = format.toServiceName(name);
  const serviceFileName     = format.toJSFileName(serviceName);
  const serviceSpecFileName = format.toJSFileName(serviceName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.createDirectory('app/services/' + subdirectories);
  utils.createFile('app/services/' + subdirectories + serviceFileName, templates.service({
    serviceName: serviceName
  }));

  utils.createDirectory('test/unit/services/' + subdirectories);
  utils.createFile('test/unit/services/' + serviceSpecFileName, templates.testServiceUnit({
    serviceName: serviceName
  }));

  utils.prependToFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + format.toFolderName(serviceName) + "';\n");
  utils.modifyFile('app/services/services.js', [{
    find: ');',
    replace: ")\n  .service('" + serviceName + "', " + serviceName + ");"
  }]);

  logger.blankLine();
};
