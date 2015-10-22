'use strict';

const Format    = require('../format');
const Logger    = require('../logger');
const Utils     = require('../utils');
const Templates = require('../templates');

module.exports = function (name) {
  name = Format.checkName('state', name);

  const parentStates  = name.split('/');
  const rootState     = Format.toFolderName(parentStates.shift());

  if (!parentStates.length) {
    Utils.destroyFile('app/config/routes/' + Format.toJSFileName(rootState));
    Utils.destroyFile('app/assets/stylesheets/' + Format.toSCSSFileName(rootState));
    Utils.removeFromFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    Utils.removeFromFile('app/config/routes/routes.js', "import { " + rootState + "Routes } from './" + Format.toFolderName(rootState) + "';\n");
    Utils.modifyFile('app/config/routes/routes.js', [{
      find: "  .config(" + rootState + "Routes)\n",
      replace: ""
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
    const stateControllerName = Format.toConstName(stateName);
    stateName               = Format.toFolderName(parents.pop());
    const statePath           = Format.parentPath(parents) + stateName + '/';
    let fullStateName       = stateName;
    let stateURL            = '/' + stateName;

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

    Utils.destroyFile('app/states/' + statePath + Format.toHTMLFileName(stateName));
    Utils.destroyFile('app/states/' + statePath + Format.toJSFileName(stateName));

    const state = new RegExp("\\s*\\.state\\('" + fullStateName + "', \\{(?:\\s|.)*\\}\\);\\n");

    Utils.modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [{
      find: state,
      replace: '\n'
    }]);
    Utils.modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [{
      find: '})\n',
      replace: '});\n'
    }]);
    Utils.removeFromFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");
    Utils.modifyFile('app/states/states.js', [{
      find: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);",
      replace: ");"
    }]);

    Utils.destroyFile('test/unit/controllers/' + statePath + Format.toJSFileName(stateName + '.spec'));
    Utils.destroyDirectoryIfEmpty('app/states/' + statePath);
    Utils.destroyDirectoryIfEmpty('test/unit/controllers/' + statePath);

    Logger.blankLine();
  }
};
