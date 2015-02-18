"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name, controller) {
  name = format.checkName('partial', name);

  var parentStates = name.split('/');
  var partialDirectory;
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('layouts', 'shared'); }

  if (parentStates[0] === 'layouts') {
    parentStates.splice(0,1);
    partialDirectory = 'layouts/';
  } else {
    partialDirectory = 'states/';
  }

  var parentPath  = format.parentPath(parentStates);
  var partialPath = parentPath + format.toPartialName(name);

  templates.createDirectory('app/' + partialDirectory + parentPath);
  if (controller) {
    templates.createFile('app/' + partialDirectory + partialPath,
      templates.partialWithController({
        partialPath: partialPath,
        partialName: format.toConstName(name),
        controllerName: format.toControllerName(name)
      })
    );
    templates.createFile('app/' + partialDirectory + parentPath + format.toPartialControllerName(name),
      templates.controller({
        controllerName: format.toControllerName(name),
        controllerVariable: format.toConstName(name)
      })
    );
    templates.createDirectory('test/unit/controllers/' + parentPath);
    templates.createFile('test/unit/controllers/' + parentPath + format.toPartialControllerSpecName(name),
      templates.testControllerUnit({
        controllerName: format.toControllerName(name),
        controllerVarName: format.toControllerVarName(name)
      })
    );
  } else {
    templates.createFile('app/' + partialDirectory + partialPath,
      templates.partial({ partialPath: partialPath })
    );
  }
  logger.blankLine();
};
