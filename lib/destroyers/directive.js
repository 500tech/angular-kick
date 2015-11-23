'use strict';

const Format  = require('../format');
const Logger  = require('../logger');
const Utils   = require('../utils');
const FSUtils = require('../fs-utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = FSUtils.destroyFile;
const modifyFile              = FSUtils.modifyFile;
const removeFromFile          = FSUtils.removeFromFile;
const destroyDirectoryIfEmpty = FSUtils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = Format.toDirectiveName(name);
  const directiveTemplateName = Format.toHTMLFileName(directiveName);
  const directiveFileName     = Format.toJSFileName(directiveName);
  const directiveSpecFileName = Format.toJSFileName(directiveName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  destroyFile('app/directives/' + subdirectories + directiveFileName);
  destroyFile('app/directives/' + subdirectories + directiveTemplateName);
  destroyFile('test/unit/directives/' + subdirectories + directiveSpecFileName);
  destroyDirectoryIfEmpty('app/directives/' + subdirectories);
  destroyDirectoryIfEmpty('test/unit/directives/' + subdirectories);
  removeFromFile('app/directives/directives.js', "import { " + directiveName + " } from './" + subdirectories + directiveFileName.replace('.js', '') + "';\n");
  modifyFile('app/directives/directives.js', [{
    find: ")\n  .directive('" + directiveName + "', " + directiveName + ");",
    replace: ");"
  }]);

  Logger.blankLine();
};
