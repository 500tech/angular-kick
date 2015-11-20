'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

// TODO: Replace with object destructuring once available in nodejs
const createDirectory = Utils.createDirectory;
const createFile      = Utils.createFile;
const modifyFile      = Utils.modifyFile;
const prependToFile   = Utils.prependToFile;

module.exports = function (name) {
  name = Utils.ensureName('component', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const componentName         = Format.toComponentName(name);
  const componentTemplateName = Format.toHTMLFileName(componentName);
  const componentFileName     = Format.toJSFileName(componentName);
  const componentSpecFileName = Format.toJSFileName(componentName + '.spec');

  subdirectories = Format.parentPath(subdirectories) + `${componentFileName.replace('.js', '')}/`;

  createDirectory('app/components/' + subdirectories);
  
  createFile('app/components/' + subdirectories + componentFileName,
    Templates.component({
      componentName: componentName,
      componentTemplateUrl: 'components/' + subdirectories + componentTemplateName
    })
  );
  createFile('app/components/' + subdirectories + componentTemplateName,
    Templates.componentTemplate({ componentName: componentName })
  );

  createDirectory('test/unit/components/' + subdirectories);
  createFile('test/unit/components/' + subdirectories + componentSpecFileName,
    Templates.testComponentUnit({
      componentName: componentName,
      componentTagName: Format.toComponentTagName(componentName)
    })
  );

  prependToFile('app/components/components.js', "import { " + componentName + " } from './"+ subdirectories + componentFileName.replace('.js', '') + "';\n");
  modifyFile('app/components/components.js', [{
    find: ');',
    replace: ")\n  .directive('" + componentName + "', " + componentName + ");"
  }]);

  Logger.blankLine();
};
