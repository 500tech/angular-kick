'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('component', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const componentName         = Format.toComponentName(name);
  const componentTemplateName = Format.toHTMLFileName(componentName);
  const componentFileName     = Format.toJSFileName(componentName);
  const componentSpecFileName = Format.toJSFileName(componentName + '.spec');

  subdirectories = Format.parentPath(subdirectories) + `${componentFileName.replace('.js', '')}/`;

  Utils.destroyFile('app/components/' + subdirectories + componentFileName);
  Utils.destroyFile('app/components/' + subdirectories + componentTemplateName);
  Utils.destroyFile('test/unit/components/' + subdirectories + componentSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/components/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/components/' + subdirectories);
  Utils.removeFromFile('app/components/components.js', "import { " + componentName + " } from './" + subdirectories + componentFileName.replace('.js', '') + "';\n");
  Utils.modifyFile('app/components/components.js', [{
    find: ")\n  .directive('" + componentName + "', " + componentName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
