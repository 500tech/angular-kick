'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = Utils.destroyFile;
const modifyFile              = Utils.modifyFile;
const removeFromFile          = Utils.removeFromFile;
const destroyDirectoryIfEmpty = Utils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Format.checkName('component', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const componentName         = Format.toComponentName(name);
  const componentTemplateName = Format.toHTMLFileName(componentName);
  const componentFileName     = Format.toJSFileName(componentName);
  const componentSpecFileName = Format.toJSFileName(componentName + '.spec');

  subdirectories = Format.parentPath(subdirectories) + `${componentFileName.replace('.js', '')}/`;

  destroyFile('app/components/' + subdirectories + componentFileName);
  destroyFile('app/components/' + subdirectories + componentTemplateName);
  destroyFile('test/unit/components/' + subdirectories + componentSpecFileName);
  destroyDirectoryIfEmpty('app/components/' + subdirectories);
  destroyDirectoryIfEmpty('test/unit/components/' + subdirectories);
  removeFromFile('app/components/components.js', "import { " + componentName + " } from './" + subdirectories + componentFileName.replace('.js', '') + "';\n");
  modifyFile('app/components/components.js', [{
    find: ")\n  .directive('" + componentName + "', " + componentName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
