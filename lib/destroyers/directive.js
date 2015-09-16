'use strict';

const format = require('../formatters');
const Logger = require('../logger');
const utils  = require('../utils');

module.exports = function (name) {
  name = format.checkName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = format.toDirectiveName(name);
  const directiveTemplateName = format.toHTMLFileName(directiveName);
  const directiveFileName     = format.toJSFileName(directiveName);
  const directiveSpecFileName = format.toJSFileName(directiveName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  utils.destroyFile('app/directives/' + subdirectories + directiveFileName);
  utils.destroyFile('app/directives/' + subdirectories + directiveTemplateName);
  utils.destroyFile('test/unit/directives/' + subdirectories + directiveSpecFileName);
  utils.destroyDirectoryIfEmpty('app/directives/' + subdirectories);
  utils.destroyDirectoryIfEmpty('test/unit/directives/' + subdirectories);
  utils.removeFromFile('app/directives/directives.js', "import { " + directiveName + " } from './" + subdirectories + directiveFileName.replace('.js', '') + "';\n");
  utils.modifyFile('app/directives/directives.js', [{
    find: ")\n  .directive('" + directiveName + "', " + directiveName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
