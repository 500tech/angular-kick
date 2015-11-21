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
  name = Utils.ensureName('service', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const serviceName         = Format.toServiceName(name);
  const serviceFileName     = Format.toJSFileName(serviceName);
  const serviceSpecFileName = Format.toJSFileName(serviceName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  if (options.factory) {
    createDirectory('app/services/' + subdirectories);
    createFile('app/services/' + subdirectories + serviceFileName,
      Templates.serviceFactory({ serviceName })
    );

    prependToFile('app/services/services.js', "import { " + serviceName + "Factory } from './" + subdirectories + Format.toFolderName(serviceName) + "';\n");
    modifyFile('app/services/services.js', [{
      find: ');',
      replace: ")\n  .factory('" + serviceName + "', " + serviceName + "Factory);"
    }]);
  } else {
    createDirectory('app/services/' + subdirectories);
    createFile('app/services/' + subdirectories + serviceFileName,
      Templates.service({ serviceName })
    );

    prependToFile('app/services/services.js', "import { " + serviceName + " } from './" + subdirectories + Format.toFolderName(serviceName) + "';\n");
    modifyFile('app/services/services.js', [{
      find: ');',
      replace: ")\n  .service('" + serviceName + "', " + serviceName + ");"
    }]);
  }

  createDirectory('test/unit/services/' + subdirectories);
  createFile('test/unit/services/' + serviceSpecFileName,
    Templates.testServiceUnit({ serviceName })
  );

  Logger.blankLine();
};
