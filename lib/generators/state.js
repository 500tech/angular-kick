"use strict";

var format    = require('../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name, noController, abstract) {
  name = format.checkName('state', name);

  var stateList = name.split('/');
  var rootState = format.toFolderName(stateList.shift());

  if (!utils.exists('app/config/routes/' + format.toJSFileName(rootState))) {
    utils.createFile('app/config/routes/' + format.toJSFileName(rootState), templates.stateRoute({
      stateName: rootState
    }));
    utils.createFile('app/assets/stylesheets/' + format.toSCSSFileName(rootState), templates.stateStylesheet());
    utils.appendToFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    utils.prependToFile('app/config/routes/routes.js', "import { " + rootState + "Routes } from './" + format.toFolderName(rootState) + "';\n");
    utils.modifyFile('app/config/routes/routes.js', [{
      find: ");",
      replace: ")\n  .config(" + rootState + "Routes);\n"
    }]);
    generateState(rootState);
  }

  if (!stateList.length) { return; }

  var fullState = rootState;
  stateList.forEach(function (state) {
    generateState(fullState += '.' + state);
  });

  function generateState (stateName) {
    var parents             = stateName.split('.');
    var stateControllerName = format.toConstName(stateName);
    stateName               = format.toFolderName(parents.pop());
    var statePath           = format.parentPath(parents) + stateName + '/';
    var fullStateName       = stateName;
    var stateURL            = '/' + stateName;

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

    if (utils.exists('app/states/' + statePath + format.toHTMLFileName(stateName))) { return; }

    utils.createDirectory('app/states/' + statePath);
    utils.createFile('app/states/' + statePath + format.toHTMLFileName(stateName),
      templates.stateView({
        stateName: stateName,
        stateControllerName: stateControllerName
      })
    );

    if (!noController) {
      utils.createFile('app/states/' + statePath + format.toJSFileName(stateName),
        templates.stateController({
          stateName: stateName,
          stateControllerName: stateControllerName
        })
      );
      utils.prependToFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");
      utils.modifyFile('app/states/states.js', [{
        find: ');',
        replace: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);"
      }]);
    }

    if (stateName === 'list') {
      utils.modifyFile('app/config/routes/' + format.toJSFileName(rootState), [{
        find: ".state('" + format.parentState(parents) + "', {",
        replace: ".state('" + format.parentState(parents) + "', {\n      abstract: true,"
      }])
    }

    utils.modifyFile('app/config/routes/' + format.toJSFileName(rootState), [{
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
      utils.createDirectory('test/unit/controllers/' + statePath);
      utils.createFile('test/unit/controllers/' + statePath + format.toJSFileName(stateName + '.spec'),
        templates.testControllerUnit({
          controllerName: format.toControllerName(stateControllerName),
          controllerVarName: format.toControllerVarName(stateControllerName)
        })
      );
    }
    logger.blankLine();
  }
};
