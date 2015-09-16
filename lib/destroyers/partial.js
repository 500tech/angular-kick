'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const utils  = require('../utils');

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

  utils.destroyFile('app/layouts/' + partialPath);
  utils.destroyFile('app/layouts/' + parentPath + format.toPartialControllerName(name));
  utils.destroyDirectoryIfEmpty('app/layouts/' + parentPath);

  utils.destroyFile('test/unit/controllers/' + parentPath + format.toPartialControllerSpecName(name));
  utils.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);

  Logger.blankLine();
};
