'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name, noController, abstract) {
  name = Format.checkName('state', name);

  const stateList = name.split('/');
  const rootState = Format.toFolderName(stateList.shift());

  if (!Utils.exists('app/config/routes/' + Format.toJSFileName(rootState))) {
    Utils.createFile('app/config/routes/' + Format.toJSFileName(rootState), templates.stateRoute({
      stateName: rootState
    }));
    Utils.createFile('app/assets/stylesheets/' + Format.toSCSSFileName(rootState), templates.stateStylesheet());
    Utils.appendToFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    Utils.prependToFile('app/config/routes/routes.js', "import { " + rootState + "Routes } from './" + Format.toFolderName(rootState) + "';\n");
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

    if (Utils.exists('app/states/' + statePath + Format.toHTMLFileName(stateName))) { return; }

    Utils.createDirectory('app/states/' + statePath);
    Utils.createFile('app/states/' + statePath + Format.toHTMLFileName(stateName),
      templates.stateView({
        stateName: stateName,
        stateControllerName: stateControllerName
      })
    );

    if (!noController) {
      Utils.createFile('app/states/' + statePath + Format.toJSFileName(stateName),
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
      Utils.modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [{
        find: ".state('" + Format.parentState(parents) + "', {",
        replace: ".state('" + Format.parentState(parents) + "', {\n      abstract: true,"
      }])
    }

    Utils.modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [{
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
      Utils.createFile('test/unit/controllers/' + statePath + Format.toJSFileName(stateName + '.spec'),
        templates.testControllerUnit({
          controllerName: Format.toControllerName(stateControllerName),
          controllerVarName: Format.toControllerVarName(stateControllerName)
        })
      );
    }

    Logger.blankLine();
  }
};
