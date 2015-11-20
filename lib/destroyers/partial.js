'use strict';

const Format = require('lib/format');
const Logger = require('lib/logger');
const Utils  = require('lib/utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = Utils.destroyFile;
const destroyDirectoryIfEmpty = Utils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('partial', name);

  let parentStates = name.split('/');
  name = parentStates.pop();

  if (parentStates[0] === 'partials') {
    parentStates.splice(0,1);
  }

  const parentPath  = Format.parentPath(parentStates);
  const partialPath = parentPath + Format.toPartialName(name);

  destroyFile('app/partials/' + partialPath);
  destroyFile('app/partials/' + parentPath + Format.toPartialControllerName(name));
  destroyDirectoryIfEmpty('app/partials/' + parentPath);

  destroyFile('test/unit/controllers/' + parentPath + Format.toPartialControllerSpecName(name));
  destroyDirectoryIfEmpty('test/unit/controllers/' + parentPath);

  Logger.blankLine();
};
