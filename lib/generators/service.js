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
  name = Format.checkName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = Format.toServiceName(name);
  const serviceFileName     = Format.toJSFileName(serviceName);
  const serviceSpecFileName = Format.toJSFileName(serviceName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  createDirectory('app/services/' + subdirectories);
  createFile('app/services/' + subdirectories + serviceFileName, Templates.service({
    serviceName: serviceName
  }));

  createDirectory('test/unit/services/' + subdirectories);
  createFile('test/unit/services/' + serviceSpecFileName, Templates.testServiceUnit({
    serviceName: serviceName
  }));

  prependToFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + Format.toFolderName(serviceName) + "';\n");
  modifyFile('app/services/services.js', [{
    find: ');',
    replace: ")\n  .service('" + serviceName + "', " + serviceName + ");"
  }]);

  Logger.blankLine();
};
