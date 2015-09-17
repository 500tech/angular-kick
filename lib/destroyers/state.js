'use strict';

const format    = require('../formatters');
const Logger    = require('../logger');
const Utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('state', name);

  const parentStates  = name.split('/');
  const rootState     = format.toFolderName(parentStates.shift());

  if (!parentStates.length) {
    Utils.destroyFile('app/config/routes/' + format.toJSFileName(rootState));
    Utils.destroyFile('app/assets/stylesheets/' + format.toSCSSFileName(rootState));
    Utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    Utils.removeFromFile('app/config/routes/routes.js', "import { " + rootState + "Routes } from './" + format.toFolderName(rootState) + "';\n");
    Utils.modifyFile('app/config/routes/routes.js', [{
      find: "\n  .config(" + rootState + "Routes);\n",
      replace: ";"
    }]);
    destroyState(rootState);
  }

  if (!parentStates.length) return;

  let fullState = rootState;
  parentStates.forEach(function (state) {
    destroyState(fullState += '.' + state);
  });

  function destroyState (stateName) {
    const parents             = stateName.split('.');
    const stateControllerName = format.toConstName(stateName);
    stateName               = format.toFolderName(parents.pop());
    const statePath           = format.parentPath(parents) + stateName + '/';
    let fullStateName       = stateName;
    let stateURL            = '/' + stateName;

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

    Utils.destroyFile('app/states/' + statePath + format.toHTMLFileName(stateName));
    Utils.destroyFile('app/states/' + statePath + format.toJSFileName(stateName));

    const state = new RegExp("\\s*\\.state\\('" + fullStateName + "', \\{(?:\\s|.)*\\}\\)\\n");

    Utils.modifyFile('app/config/routes/' + format.toJSFileName(rootState), [{
      find: state,
      replace: '\n'
    }]);
    Utils.removeFromFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");
    Utils.modifyFile('app/states/states.js', [{
      find: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);",
      replace: ");"
    }]);

    Utils.destroyFile('test/unit/controllers/' + statePath + format.toJSFileName(stateName + '.spec'));
    Utils.destroyDirectoryIfEmpty('app/states/' + statePath);
    Utils.destroyDirectoryIfEmpty('test/unit/controllers/' + statePath);

    Logger.blankLine();
  }
};
