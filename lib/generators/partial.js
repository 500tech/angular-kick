'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const FSUtils   = require('../fs-utils');
const Templates = require('../templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = FSUtils.createDirectory;
const createFile      = FSUtils.createFile;

module.exports = function (name, controller) {
  name = Utils.ensureName('partial', name);

  let parentStates = name.split('/');
  name = parentStates.pop();

  if (parentStates[0] === 'partials') {
    parentStates.splice(0, 1);
  }

  const parentPath         = Format.parentPath(parentStates);
  const partialPath        = parentPath + Format.toPartialName(name);
  const partialName        = Format.toConstName(name);
  const controllerName     = Format.toControllerName(name);
  const controllerVariable = Format.toConstName(name);
  const controllerVarName  = Format.toControllerVarName(name);

  createDirectory('app/partials/' + parentPath);

  if (controller) {
    // TODO: Deprecated
    Logger.warn('Partials with controllers are deprecated.');
    Logger.warn('The functionality will be removed in future versions');
    Logger.warn('Please use "kick generate component" instead.');
    Logger.blankLine();

    createFile('app/partials/' + partialPath,
      Templates.partialWithController({ partialPath, partialName, controllerName })
    );

    createFile('app/partials/' + parentPath + Format.toPartialControllerName(name),
      Templates.controller({ controllerName, controllerVariable })
    );

    createDirectory('test/unit/controllers/' + parentPath);
    createFile('test/unit/controllers/' + parentPath + Format.toPartialControllerSpecName(name),
      Templates.testControllerUnit({ controllerName, controllerVarName })
    );
  } else {
    createFile('app/partials/' + partialPath,
      Templates.partial({ partialPath })
    );
  }

  Logger.blankLine();
};
