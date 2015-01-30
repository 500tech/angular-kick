"use strict";

var fs        = require('fs-extra');
var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name, controller) {
  name = format.checkName('partial', name);
  if (!name) return;

  var parentStates = name.split('/');
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('shared'); }

  var parentPath  = format.parentPath(parentStates);
  var partialPath = parentPath + format.toPartialName(name);

  templates.createDirectory('app/states/' + parentPath);
  if (controller) {
    templates.createFile('app/states/' + partialPath,
      templates.partialWithController({
        partialPath: partialPath,
        partialName: format.toConstName(name),
        controllerName: format.toControllerName(name)
      })
    );
    templates.createFile('app/states/' + parentPath + format.toPartialControllerName(name),
      templates.controller({ controllerName: format.toControllerName(name) })
    );
    templates.createDirectory('test/unit/controllers/' + parentPath);
    templates.createFile('test/unit/controllers/' + parentPath + format.toPartialControllerName(name),
      templates.testControllerUnit({
        controllerName: format.toControllerName(name),
        controllerVarName: format.toControllerVarName(name)
      })
    );
  } else {
    templates.createFile('app/states/' + partialPath,
      templates.partial({ partialPath: partialPath })
    );
  }
  console.log('');
};