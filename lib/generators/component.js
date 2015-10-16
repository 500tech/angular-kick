'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('component', name);

  let subdirectories = name.split('/');
  name = subdirectories.pop();

  const componentName         = Format.toComponentName(name);
  const componentTemplateName = Format.toHTMLFileName(componentName);
  const componentFileName     = Format.toJSFileName(componentName);
  const componentSpecFileName = Format.toJSFileName(componentName + '.spec');

  subdirectories = Format.parentPath(subdirectories) + `${componentFileName.replace('.js', '')}/`;

  Utils.createDirectory('app/components/' + subdirectories);
  
  Utils.createFile('app/components/' + subdirectories + componentFileName,
    Templates.component({
      componentName: componentName,
      componentTemplateUrl: 'components/' + subdirectories + componentTemplateName
    })
  );
  Utils.createFile('app/components/' + subdirectories + componentTemplateName,
    Templates.componentTemplate({ componentName: componentName })
  );

  Utils.createDirectory('test/unit/components/' + subdirectories);
  Utils.createFile('test/unit/components/' + subdirectories + componentSpecFileName,
    Templates.testComponentUnit({
      componentName: componentName,
      componentTagName: Format.toComponentTagName(componentName)
    })
  );

  Utils.prependToFile('app/components/components.js', "import { " + componentName + " } from './"+ subdirectories + componentFileName.replace('.js', '') + "';\n");
  Utils.modifyFile('app/components/components.js', [{
    find: ');',
    replace: ")\n  .directive('" + componentName + "', " + componentName + ");"
  }]);

  Logger.blankLine();
};
