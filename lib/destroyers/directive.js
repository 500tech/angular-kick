"use strict";
var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');

module.exports = function (name) {
  name = format.checkName('directive', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var directiveName         = format.toDirectiveName(name);
  var directiveTemplateName = format.toHTMLFileName(directiveName);
  var directiveFileName     = format.toJSFileName(directiveName);
  var directiveSpecFileName = format.toJSFileName(directiveName + '.spec');

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
  logger.blankLine();
};
