"use strict";

var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('partial', name);

  var parentStates = name.split('/');
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('shared'); }

  var parentPath  = format.parentPath(parentStates);
  var partialPath = parentPath + format.toPartialName(name);

  templates.destroyFile('app/layouts/' + partialPath);
  templates.destroyFile('app/layouts/' + parentPath + format.toPartialControllerName(name));
  templates.destroyDirectoryIfEmpty('app/layouts/' + parentPath);

  templates.destroyFile('test/unit/controllers/' + parentPath + format.toPartialControllerName(name));
  templates.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);
  console.log('');
};
