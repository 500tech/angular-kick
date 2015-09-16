'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = format.toDirectiveName(name);
  const directiveTemplateName = format.toHTMLFileName(directiveName);
  const directiveFileName     = format.toJSFileName(directiveName);
  const directiveSpecFileName = format.toJSFileName(directiveName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.destroyFile('app/directives/' + subdirectories + directiveFileName);
  Utils.destroyFile('app/directives/' + subdirectories + directiveTemplateName);
  Utils.destroyFile('test/unit/directives/' + subdirectories + directiveSpecFileName);
  Utils.destroyDirectoryIfEmpty('app/directives/' + subdirectories);
  Utils.destroyDirectoryIfEmpty('test/unit/directives/' + subdirectories);
  Utils.removeFromFile('app/directives/directives.js', "import { " + directiveName + " } from './" + subdirectories + directiveFileName.replace('.js', '') + "';\n");
  Utils.modifyFile('app/directives/directives.js', [{
    find: ")\n  .directive('" + directiveName + "', " + directiveName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
