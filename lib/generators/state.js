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
const appendToFile    = FSUtils.appendToFile;

module.exports = function (name, noController, abstract) {
  name = Utils.ensureName('state', name);

  const stateList = name.split('/');
  const rootState = Format.toFolderName(stateList.shift());
  const stateName = Format.toStateName(rootState);

  if (!FSUtils.exists('app/config/routes/' + Format.toJSFileName(rootState))) {
    createFile('app/config/routes/' + Format.toJSFileName(rootState),
      Templates.stateRoute({ stateName })
    );

    createFile('app/assets/stylesheets/' + Format.toSCSSFileName(rootState), Templates.stateStylesheet());
    appendToFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    prependToFile('app/config/routes/routes.js', "import { " + stateName + "Routes } from './" + Format.toFolderName(rootState) + "';\n");
    modifyFile('app/config/routes/routes.js', [{
      find: "])",
      replace: "])\n  .config(" + stateName + "Routes)"
    }]);
    generateState(rootState);
  }

  if (!stateList.length) { return; }

  let fullState = rootState;
  stateList.forEach((state) => generateState(fullState += '.' + state));

  function generateState (stateName) {
    const parents             = stateName.split('.');
    const stateControllerName = Format.toConstName(stateName);
    stateName                 = Format.toFolderName(parents.pop());
    const statePath           = Format.parentPath(parents) + stateName + '/';
    let fullStateName         = stateName;
    let stateURL              = '/' + stateName;

    if (parents.length) {
      fullStateName = Format.parentState(parents) + '.' + stateName;
      switch (stateName) {
        case 'list':
          stateURL = '';
          break;
        case 'show':
          stateURL = '/:id';
          break;
        case 'edit':
          stateURL = '/:id/edit';
          break;
        default:
          stateURL = '/' + stateName;
      }
    }

    if (FSUtils.exists('app/states/' + statePath + Format.toHTMLFileName(stateName))) { return; }

    createDirectory('app/states/' + statePath);
    createFile('app/states/' + statePath + Format.toHTMLFileName(stateName),
      Templates.stateView({ stateName, stateControllerName })
    );

    if (!noController) {
      createFile('app/states/' + statePath + Format.toJSFileName(stateName),
        Templates.stateController({ stateName, stateControllerName })
      );
      prependToFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");
      modifyFile('app/states/states.js', [{
        find: ');',
        replace: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);"
      }]);
    }

    if (stateName === 'list') {
      modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [{
        find: ".state('" + Format.parentState(parents) + "', {",
        replace: ".state('" + Format.parentState(parents) + "', {\n      abstract: true,"
      }])
    }

    modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [
      {
        find: "});",
        replace: "})"
      },
      {
        find: /}\n/,
        replace: Templates.nestedRoute({
          fullStateName,
          stateURL,
          statePath: statePath + stateName,
          stateControllerName,
          noController,
          abstract
        })
      }
    ]);

    if (!noController) {
      createDirectory('test/unit/controllers/' + statePath);
      createFile('test/unit/controllers/' + statePath + Format.toJSFileName(stateName + '.spec'),
        Templates.testControllerUnit({
          controllerName: Format.toControllerName(stateControllerName),
          controllerVarName: Format.toControllerVarName(stateControllerName)
        })
      );
    }

    Logger.blankLine();
  }
};
