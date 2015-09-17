'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = Format.toServiceName(name);
  const serviceFileName     = Format.toJSFileName(serviceName);
  const serviceSpecFileName = Format.toJSFileName(serviceName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  Utils.createDirectory('app/services/' + subdirectories);
  Utils.createFile('app/services/' + subdirectories + serviceFileName, templates.service({
    serviceName: serviceName
  }));

  Utils.createDirectory('test/unit/services/' + subdirectories);
  Utils.createFile('test/unit/services/' + serviceSpecFileName, templates.testServiceUnit({
    serviceName: serviceName
  }));

  Utils.prependToFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + Format.toFolderName(serviceName) + "';\n");
  Utils.modifyFile('app/services/services.js', [{
    find: ');',
    replace: ")\n  .service('" + serviceName + "', " + serviceName + ");"
  }]);

  Logger.blankLine();
};
