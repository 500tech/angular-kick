'use strict';

const Format    = require('lib/format');
const Logger    = require('lib/logger');
const Utils     = require('lib/utils');
const FSUtils   = require('lib/fs-utils');
const Templates = require('lib/templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = FSUtils.createDirectory;
const createFile      = FSUtils.createFile;
const modifyFile      = FSUtils.modifyFile;
const prependToFile   = FSUtils.prependToFile;

module.exports = function (name) {
  name = Utils.ensureName('component', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const componentName         = Format.toComponentName(name);
  const componentTemplateName = Format.toHTMLFileName(componentName);
  const componentFileName     = Format.toJSFileName(componentName);
  const componentSpecFileName = Format.toJSFileName(componentName + '.spec');
  const componentTagName      = Format.toComponentTagName(componentName);

  subdirectories = Format.parentPath(subdirectories) + `${componentFileName.replace('.js', '')}/`;

  const componentTemplateUrl  = 'components/' + subdirectories + componentTemplateName;

  createDirectory('app/components/' + subdirectories);
  
  createFile('app/components/' + subdirectories + componentFileName,
    Templates.component({ componentName, componentTemplateUrl })
  );

  createFile('app/components/' + subdirectories + componentTemplateName,
    Templates.componentTemplate({ componentName })
  );

  createDirectory('test/unit/components/' + subdirectories);
  createFile('test/unit/components/' + subdirectories + componentSpecFileName,
    Templates.testComponentUnit({ componentName, componentTagName })
  );

  prependToFile('app/components/components.js', "import { " + componentName + " } from './"+ subdirectories + componentFileName.replace('.js', '') + "';\n");
  modifyFile('app/components/components.js', [{
    find: ');',
    replace: ")\n  .directive('" + componentName + "', " + componentName + ");"
  }]);

  Logger.blankLine();
};
