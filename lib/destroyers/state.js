"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var utils     = require('../utils');
var templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('state', name);

  var parentStates  = name.split('/');
  var rootState     = format.toFolderName(parentStates.shift());

  if (!parentStates.length) {
    utils.destroyFile('app/config/routes/' + format.toJSFileName(rootState));
    utils.destroyFile('app/assets/stylesheets/' + format.toSCSSFileName(rootState));
    utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    utils.removeFromFile('app/config/routes/routes.js', "import { " + rootState + "Routes } from './" + format.toFolderName(rootState) + "';\n");
    utils.modifyFile('app/config/routes/routes.js', [{
      find: "\n  .config(" + rootState + "Routes);\n",
      replace: ";"
    }]);
    destroyState(rootState);
  }

  if (!parentStates.length) return;

  var fullState = rootState;
  parentStates.forEach(function (state) {
    destroyState(fullState += '.' + state);
  });

  function destroyState (stateName) {
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

    utils.destroyFile('app/states/' + statePath + format.toHTMLFileName(stateName));
    utils.destroyFile('app/states/' + statePath + format.toJSFileName(stateName));
    var state = new RegExp("\\s*\\.state\\('" + fullStateName + "', \\{(?:\\s|.)*\\}\\)\\n");
    utils.modifyFile('app/config/routes/' + format.toJSFileName(rootState), [{
      find: state,
      replace: '\n'
    }]);
    utils.removeFromFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");
    utils.modifyFile('app/states/states.js', [{
      find: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);",
      replace: ");"
    }]);

    utils.destroyFile('test/unit/controllers/' + statePath + format.toJSFileName(stateName + '.spec'));
    utils.destroyDirectoryIfEmpty('app/states/' + statePath);
    utils.destroyDirectoryIfEmpty('test/unit/controllers/' + statePath);
    logger.blankLine();
  }
};
