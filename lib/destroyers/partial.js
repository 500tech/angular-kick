'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('partial', name);

  let parentStates = name.split('/');
  name = parentStates.pop();

  if (!parentStates.length) { parentStates.push('partials', 'shared'); }

  if (parentStates[0] === 'partials') {
    parentStates.splice(0,1);
  }

  const parentPath  = Format.parentPath(parentStates);
  const partialPath = parentPath + Format.toPartialName(name);

  Utils.destroyFile('app/partials/' + partialPath);
  Utils.destroyFile('app/partials/' + parentPath + Format.toPartialControllerName(name));
  Utils.destroyDirectoryIfEmpty('app/partials/' + parentPath);

  Utils.destroyFile('test/unit/controllers/' + parentPath + Format.toPartialControllerSpecName(name));
  Utils.destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);

  Logger.blankLine();
};
