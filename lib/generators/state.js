'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name, noController, abstract) {
  name = format.checkName('state', name);

  const stateList = name.split('/');
  const rootState = format.toFolderName(stateList.shift());

  if (!Utils.exists('app/config/routes/' + format.toJSFileName(rootState))) {
    Utils.createFile('app/config/routes/' + format.toJSFileName(rootState), templates.stateRoute({
      stateName: rootState
    }));
    Utils.createFile('app/assets/stylesheets/' + format.toSCSSFileName(rootState), templates.stateStylesheet());
    Utils.appendToFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    Utils.prependToFile('app/config/routes/routes.js', "import { " + rootState + "Routes } from './" + format.toFolderName(rootState) + "';\n");
    Utils.modifyFile('app/config/routes/routes.js', [{
      find: ");",
      replace: ")\n  .config(" + rootState + "Routes);\n"
    }]);
    generateState(rootState);
  }

  if (!stateList.length) { return; }

  let fullState = rootState;
  stateList.forEach(function (state) {
    generateState(fullState += '.' + state);
  });

  function generateState (stateName) {
    const parents             = stateName.split('.');
    const stateControllerName = format.toConstName(stateName);
    stateName                 = format.toFolderName(parents.pop());
    const statePath           = format.parentPath(parents) + stateName + '/';
    let fullStateName         = stateName;
    let stateURL              = '/' + stateName;

    if (parents.length) {
      fullStateName = format.parentState(parents) + '.' + stateName;
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

    if (Utils.exists('app/states/' + statePath + format.toHTMLFileName(stateName))) { return; }

    Utils.createDirectory('app/states/' + statePath);
    Utils.createFile('app/states/' + statePath + format.toHTMLFileName(stateName),
      templates.stateView({
        stateName: stateName,
        stateControllerName: stateControllerName
      })
    );

    if (!noController) {
      Utils.createFile('app/states/' + statePath + format.toJSFileName(stateName),
        templates.stateController({
          stateName: stateName,
          stateControllerName: stateControllerName
        })
      );
      Utils.prependToFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");
      Utils.modifyFile('app/states/states.js', [{
        find: ');',
        replace: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);"
      }]);
    }

    if (stateName === 'list') {
      Utils.modifyFile('app/config/routes/' + format.toJSFileName(rootState), [{
        find: ".state('" + format.parentState(parents) + "', {",
        replace: ".state('" + format.parentState(parents) + "', {\n      abstract: true,"
      }])
    }

    Utils.modifyFile('app/config/routes/' + format.toJSFileName(rootState), [{
      find: /}\n/,
      replace: templates.nestedRoute({
        fullStateName: fullStateName,
        stateURL: stateURL,
        statePath: statePath + stateName,
        stateControllerName: stateControllerName,
        noController: noController,
        abstract: abstract
      })
    }]);

    if (!noController) {
      Utils.createDirectory('test/unit/controllers/' + statePath);
      Utils.createFile('test/unit/controllers/' + statePath + format.toJSFileName(stateName + '.spec'),
        templates.testControllerUnit({
          controllerName: format.toControllerName(stateControllerName),
          controllerVarName: format.toControllerVarName(stateControllerName)
        })
      );
    }

    Logger.blankLine();
  }
};
