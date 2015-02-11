"use strict";

var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('directive', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var directiveName         = format.toDirectiveName(name);
  var directiveFileName     = format.toJSFileName(directiveName);
  var directiveSpecFileName = format.toJSFileName(directiveName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.destroyFile('app/directives/' + subdirectories + directiveFileName);
  templates.destroyFile('test/unit/directives/' + subdirectories + directiveSpecFileName);
  templates.destroyDirectoryIfEmpty('app/directives/' + subdirectories);
  templates.destroyDirectoryIfEmpty('test/unit/directives/' + subdirectories);
  console.log('');
};