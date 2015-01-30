"use strict";

var fs        = require('fs-extra');
var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('directive', name);
  if (!name) return;

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var directiveName         = format.toDirectiveName(name);
  var directiveFileName     = format.toJSFileName(directiveName);
  var directiveSpecFileName = format.toJSFileName(directiveName + '_spec');


  subdirectories = format.parentPath(subdirectories);

  templates.createDirectory('app/directives/' + subdirectories);
  templates.createFile('app/directives/' + subdirectories + directiveFileName,
    templates.directive({ directiveName: directiveName })
  );

  templates.createDirectory('test/unit/directives/' + subdirectories);
  templates.createFile('test/unit/directives/' + subdirectories + directiveSpecFileName,
    templates.testDirectiveUnit({
      directiveName: directiveName,
      directiveTagName: format.toDirectiveTagName(directiveName)
    })
  );
  console.log('');
};