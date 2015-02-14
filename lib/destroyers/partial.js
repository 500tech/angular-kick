"use strict";

var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('partial', name);

  var parentStates = name.split('/');
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('layouts', 'shared'); }

  if (parentStates[0] === 'layouts') {
    parentStates.splice(0,1);
  }

  var parentPath  = format.parentPath(parentStates);
  var partialPath = parentPath + format.toPartialName(name);

  templates.destroyFile('app/layouts/' + partialPath);
  templates.destroyFile('app/layouts/' + parentPath + format.toPartialControllerName(name));
  templates.destroyDirectoryIfEmpty('app/layouts/' + parentPath);

  templates.destroyFile('test/unit/controllers/' + parentPath + format.toPartialControllerSpecName(name));
  templates.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);
  console.log('');
};
