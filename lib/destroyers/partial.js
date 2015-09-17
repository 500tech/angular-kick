'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('partial', name);

  let parentStates = name.split('/');
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('layouts', 'shared'); }

  if (parentStates[0] === 'layouts') {
    parentStates.splice(0,1);
  }

  const parentPath  = Format.parentPath(parentStates);
  const partialPath = parentPath + Format.toPartialName(name);

  Utils.destroyFile('app/layouts/' + partialPath);
  Utils.destroyFile('app/layouts/' + parentPath + Format.toPartialControllerName(name));
  Utils.destroyDirectoryIfEmpty('app/layouts/' + parentPath);

  Utils.destroyFile('test/unit/controllers/' + parentPath + Format.toPartialControllerSpecName(name));
  Utils.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);

  Logger.blankLine();
};
