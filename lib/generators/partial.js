'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

module.exports = function (name, controller) {
  name = Format.checkName('partial', name);

  let parentStates = name.split('/');
  let partialDirectory;
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('layouts', 'shared'); }

  if (parentStates[0] === 'layouts') {
    parentStates.splice(0,1);
    partialDirectory = 'layouts/';
  } else {
    partialDirectory = 'states/';
  }

  const parentPath  = Format.parentPath(parentStates);
  const partialPath = parentPath + Format.toPartialName(name);

  Utils.createDirectory('app/' + partialDirectory + parentPath);
  if (controller) {
    Utils.createFile('app/' + partialDirectory + partialPath,
      Templates.partialWithController({
        partialPath: partialPath,
        partialName: Format.toConstName(name),
        controllerName: Format.toControllerName(name)
      })
    );
    Utils.createFile('app/' + partialDirectory + parentPath + Format.toPartialControllerName(name),
      Templates.controller({
        controllerName: Format.toControllerName(name),
        controllerVariable: Format.toConstName(name)
      })
    );
    Utils.createDirectory('test/unit/controllers/' + parentPath);
    Utils.createFile('test/unit/controllers/' + parentPath + Format.toPartialControllerSpecName(name),
      Templates.testControllerUnit({
        controllerName: Format.toControllerName(name),
        controllerVarName: Format.toControllerVarName(name)
      })
    );
  } else {
    Utils.createFile('app/' + partialDirectory + partialPath,
      Templates.partial({ partialPath: partialPath })
    );
  }

  Logger.blankLine();
};
