'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

module.exports = function (name, template) {
  name = Format.checkName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = Format.toDirectiveName(name);
  const directiveTemplateName = Format.toHTMLFileName(directiveName);
  const directiveFileName     = Format.toJSFileName(directiveName);
  const directiveSpecFileName = Format.toJSFileName(directiveName + '.spec');

  subdirectories = Format.parentPath(subdirectories);

  Utils.createDirectory('app/directives/' + subdirectories);

  if (template) {
    Utils.createFile('app/directives/' + subdirectories + directiveFileName,
      Templates.directiveWithTemplate({
        directiveName: directiveName,
        directiveTemplateUrl: 'directives/' + subdirectories + directiveTemplateName
      })
    );
    Utils.createFile('app/directives/' + subdirectories + directiveTemplateName,
      Templates.directiveTemplate({ directiveName: directiveName })
    );
  } else {
    Utils.createFile('app/directives/' + subdirectories + directiveFileName,
      Templates.directive({ directiveName: directiveName })
    );
  }

  Utils.createDirectory('test/unit/directives/' + subdirectories);
  Utils.createFile('test/unit/directives/' + subdirectories + directiveSpecFileName,
    Templates.testDirectiveUnit({
      directiveName: directiveName,
      directiveTagName: Format.toDirectiveTagName(directiveName)
    })
  );

  Utils.prependToFile('app/directives/directives.js', "import { " + directiveName + " } from './"+ subdirectories + directiveFileName.replace('.js', '') + "';\n");
  Utils.modifyFile('app/directives/directives.js', [{
    find: ');',
    replace: ")\n  .directive('" + directiveName + "', " + directiveName + ");"
  }]);

  Logger.blankLine();
};
