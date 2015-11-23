'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const FSUtils   = require('../fs-utils');
const Templates = require('../templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = FSUtils.createDirectory;
const createFile      = FSUtils.createFile;
const modifyFile      = FSUtils.modifyFile;
const prependToFile   = FSUtils.prependToFile;

module.exports = function (name, template) {
  name = Utils.ensureName('directive', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const directiveName         = Format.toDirectiveName(name);
  const directiveTemplateName = Format.toHTMLFileName(directiveName);
  const directiveFileName     = Format.toJSFileName(directiveName);
  const directiveSpecFileName = Format.toJSFileName(directiveName + '.spec');
  const directiveTagName      = Format.toDirectiveTagName(directiveName);
  const directiveTemplateUrl  = 'directives/' + subdirectories + directiveTemplateName;

  subdirectories = Format.parentPath(subdirectories);

  createDirectory('app/directives/' + subdirectories);

  if (template) {
    // TODO: Deprecated
    Logger.warn('Directives with templates are deprecated.');
    Logger.warn('The functionality will be removed in future versions');
    Logger.warn('Please use "kick generate component" instead.');
    Logger.blankLine();

    createFile('app/directives/' + subdirectories + directiveFileName,
      Templates.directiveWithTemplate({ directiveName, directiveTemplateUrl })
    );
    createFile('app/directives/' + subdirectories + directiveTemplateName,
      Templates.directiveTemplate({ directiveName })
    );
  } else {
    createFile('app/directives/' + subdirectories + directiveFileName,
      Templates.directive({ directiveName })
    );
  }

  createDirectory('test/unit/directives/' + subdirectories);
  createFile('test/unit/directives/' + subdirectories + directiveSpecFileName,
    Templates.testDirectiveUnit({ directiveName, directiveTagName })
  );

  prependToFile('app/directives/directives.js', "import { " + directiveName + " } from './"+ subdirectories + directiveFileName.replace('.js', '') + "';\n");
  modifyFile('app/directives/directives.js', [{
    find: ');',
    replace: ")\n  .directive('" + directiveName + "', " + directiveName + ");"
  }]);

  Logger.blankLine();
};
