"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');

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

  utils.destroyFile('app/layouts/' + partialPath);
  utils.destroyFile('app/layouts/' + parentPath + format.toPartialControllerName(name));
  utils.destroyDirectoryIfEmpty('app/layouts/' + parentPath);

  utils.destroyFile('test/unit/controllers/' + parentPath + format.toPartialControllerSpecName(name));
  utils.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);
  logger.blankLine();
};
