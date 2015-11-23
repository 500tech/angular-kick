'use strict';

const Format  = require('../format');
const Logger  = require('../logger');
const Utils   = require('../utils');
const FSUtils = require('../fs-utils');

// TODO: Replace with object destructuring once available in nodejs
const destroyFile             = FSUtils.destroyFile;
const modifyFile              = FSUtils.modifyFile;
const removeFromFile          = FSUtils.removeFromFile;
const destroyDirectoryIfEmpty = FSUtils.destroyDirectoryIfEmpty;

module.exports = function (name) {
  name = Utils.ensureName('state', name);

  const parentStates  = name.split('/');
  const rootState     = Format.toFolderName(parentStates.shift());
  const stateName     = Format.toStateName(rootState);

  if (!parentStates.length) {
    destroyFile('app/config/routes/' + Format.toJSFileName(rootState));
    destroyFile('app/assets/stylesheets/' + Format.toSCSSFileName(rootState));
    removeFromFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    removeFromFile('app/config/routes/routes.js', "import { " + stateName + "Routes } from './" + Format.toFolderName(rootState) + "';\n");
    modifyFile('app/config/routes/routes.js', [{
      find: "  .config(" + stateName + "Routes)\n",
      replace: ""
    }]);
    destroyState(rootState);
  }

  if (!parentStates.length) return;

  let fullState = rootState;
  parentStates.forEach((state) => destroyState(fullState += '.' + state));

  function destroyState (stateName) {
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

    destroyFile('app/states/' + statePath + Format.toHTMLFileName(stateName));
    destroyFile('app/states/' + statePath + Format.toJSFileName(stateName));

    const state = new RegExp("\\s*\\.state\\('" + fullStateName + "', \\{(?:\\s|.)*\\}\\);\\n");

    modifyFile('app/config/routes/' + Format.toJSFileName(rootState), [
      {
        find: state,
        replace: '\n'
      },
      {
        find: '})\n',
        replace: '});\n'
      }
    ]);

    removeFromFile('app/states/states.js', "import { " + stateControllerName + "Controller } from './" + statePath + stateName + "';\n");

    modifyFile('app/states/states.js', [{
      find: ")\n  .controller('" + stateControllerName + "Controller', " + stateControllerName + "Controller);",
      replace: ");"
    }]);

    destroyFile('test/unit/controllers/' + statePath + Format.toJSFileName(stateName + '.spec'));

    destroyDirectoryIfEmpty('app/states/' + statePath);
    destroyDirectoryIfEmpty('test/unit/controllers/' + statePath);

    Logger.blankLine();
  }
};
