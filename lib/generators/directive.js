"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
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

  utils.createDirectory('app/directives/' + subdirectories);

  if (template) {
    utils.createFile('app/directives/' + subdirectories + directiveFileName,
      templates.directiveWithTemplate({
        directiveName: directiveName,
        directiveTemplateUrl: 'directives/' + subdirectories + directiveTemplateName,
      })
    );
    utils.createFile('app/directives/' + subdirectories + directiveTemplateName,
      templates.directiveTemplate({ directiveName: directiveName })
    );
  } else {
    utils.createFile('app/directives/' + subdirectories + directiveFileName,
      templates.directive({ directiveName: directiveName })
    );
  }

  utils.createDirectory('test/unit/directives/' + subdirectories);
  utils.createFile('test/unit/directives/' + subdirectories + directiveSpecFileName,
    templates.testDirectiveUnit({
      directiveName: directiveName,
      directiveTagName: format.toDirectiveTagName(directiveName)
    })
  );

  utils.appendToFile('app/directives/directives.js', "require('./" + subdirectories + directiveFileName.replace('.js', '') + "');\n");
  logger.blankLine();
};
