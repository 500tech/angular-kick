'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name, controller) {
  name = format.checkName('partial', name);

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

  const parentPath  = format.parentPath(parentStates);
  const partialPath = parentPath + format.toPartialName(name);

  Utils.createDirectory('app/' + partialDirectory + parentPath);
  if (controller) {
    Utils.createFile('app/' + partialDirectory + partialPath,
      templates.partialWithController({
        partialPath: partialPath,
        partialName: format.toConstName(name),
        controllerName: format.toControllerName(name)
      })
    );
    Utils.createFile('app/' + partialDirectory + parentPath + format.toPartialControllerName(name),
      templates.controller({
        controllerName: format.toControllerName(name),
        controllerVariable: format.toConstName(name)
      })
    );
    Utils.createDirectory('test/unit/controllers/' + parentPath);
    Utils.createFile('test/unit/controllers/' + parentPath + format.toPartialControllerSpecName(name),
      templates.testControllerUnit({
        controllerName: format.toControllerName(name),
        controllerVarName: format.toControllerVarName(name)
      })
    );
  } else {
    Utils.createFile('app/' + partialDirectory + partialPath,
      templates.partial({ partialPath: partialPath })
    );
  }

  Logger.blankLine();
};
