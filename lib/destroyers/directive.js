'use strict';

const Format = require('../format');
const Logger = require('../logger');
const Utils  = require('../utils');

module.exports = function (name) {
  name = Format.checkName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = Format.toDirectiveName(name);
  const directiveTemplateName = Format.toHTMLFileName(directiveName);
  const directiveFileName     = Format.toJSFileName(directiveName);
  const directiveSpecFileName = Format.toJSFileName(directiveName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

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
