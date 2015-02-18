"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name, template) {
  name = format.checkName('directive', name);

  var subdirectories = name.split('/');
  name = subdirectories.pop();

  var directiveName         = format.toDirectiveName(name);
  var directiveTemplateName = format.toHTMLFileName(directiveName);
  var directiveFileName     = format.toJSFileName(directiveName);
  var directiveSpecFileName = format.toJSFileName(directiveName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  templates.createDirectory('app/directives/' + subdirectories);

  if (template) {
    templates.createFile('app/directives/' + subdirectories + directiveFileName,
      templates.directiveWithTemplate({
        directiveName: directiveName,
        directiveTemplateUrl: 'directives/' + subdirectories + directiveTemplateName,
      })
    );
    templates.createFile('app/directives/' + subdirectories + directiveTemplateName,
      templates.directiveTemplate({ directiveName: directiveName })
    );
  } else {
    templates.createFile('app/directives/' + subdirectories + directiveFileName,
      templates.directive({ directiveName: directiveName })
    );
  }

  templates.createDirectory('test/unit/directives/' + subdirectories);
  templates.createFile('test/unit/directives/' + subdirectories + directiveSpecFileName,
    templates.testDirectiveUnit({
      directiveName: directiveName,
      directiveTagName: format.toDirectiveTagName(directiveName)
    })
  );
  logger.log('');
};
