'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name, template) {
  name = format.checkName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = format.toDirectiveName(name);
  const directiveTemplateName = format.toHTMLFileName(directiveName);
  const directiveFileName     = format.toJSFileName(directiveName);
  const directiveSpecFileName = format.toJSFileName(directiveName + '.spec');

  subdirectories = format.parentPath(subdirectories);

  Utils.createDirectory('app/directives/' + subdirectories);

  if (template) {
    Utils.createFile('app/directives/' + subdirectories + directiveFileName,
      templates.directiveWithTemplate({
        directiveName: directiveName,
        directiveTemplateUrl: 'directives/' + subdirectories + directiveTemplateName
      })
    );
    Utils.createFile('app/directives/' + subdirectories + directiveTemplateName,
      templates.directiveTemplate({ directiveName: directiveName })
    );
  } else {
    Utils.createFile('app/directives/' + subdirectories + directiveFileName,
      templates.directive({ directiveName: directiveName })
    );
  }

  Utils.createDirectory('test/unit/directives/' + subdirectories);
  Utils.createFile('test/unit/directives/' + subdirectories + directiveSpecFileName,
    templates.testDirectiveUnit({
      directiveName: directiveName,
      directiveTagName: format.toDirectiveTagName(directiveName)
    })
  );

  Utils.prependToFile('app/directives/directives.js', "import { " + directiveName + " } from './"+ subdirectories + directiveFileName.replace('.js', '') + "';\n");
  Utils.modifyFile('app/directives/directives.js', [{
    find: ');',
    replace: ")\n  .directive('" + directiveName + "', " + directiveName + ");"
  }]);

  Logger.blankLine();
};
