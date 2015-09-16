'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('partial', name);

  let parentStates = name.split('/');
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('layouts', 'shared'); }

  if (parentStates[0] === 'layouts') {
    parentStates.splice(0,1);
  }

  const parentPath  = format.parentPath(parentStates);
  const partialPath = parentPath + format.toPartialName(name);

  Utils.destroyFile('app/layouts/' + partialPath);
  Utils.destroyFile('app/layouts/' + parentPath + format.toPartialControllerName(name));
  Utils.destroyDirectoryIfEmpty('app/layouts/' + parentPath);

  Utils.destroyFile('test/unit/controllers/' + parentPath + format.toPartialControllerSpecName(name));
  Utils.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);

  Logger.blankLine();
};
