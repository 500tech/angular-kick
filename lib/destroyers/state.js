'use strict';

const format    = require('../formatters');
const logger    = require('../logger');
const utils     = require('../utils');
const templates = require('../templates');

module.exports = function (name) {
  name = format.checkName('state', name);

  const parentStates  = name.split('/');
  const rootState     = format.toFolderName(parentStates.shift());

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

    utils.destroyFile('app/states/' + statePath + format.toHTMLFileName(stateName));
    utils.destroyFile('app/states/' + statePath + format.toJSFileName(stateName));

    const state = new RegExp("\\s*\\.state\\('" + fullStateName + "', \\{(?:\\s|.)*\\}\\)\\n");

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
