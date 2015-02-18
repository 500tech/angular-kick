"use strict";

var format    = require('./../formatters');
var logger    = require('../logger');
var templates = require('../templates');

module.exports = function (name, noController, abstract) {
  name = format.checkName('state', name);

  var parentStates  = name.split('/');
  var rootState     = format.toFolderName(parentStates.shift());

  if (!parentStates.length) {
    templates.destroyFile('app/config/routes/' + format.toJSFileName(rootState), templates.stateRoute());
    templates.destroyFile('app/assets/stylesheets/' + format.toSCSSFileName(rootState), templates.stateStylesheet());
    templates.modifyFile('app/assets/stylesheets/application.scss', '//= include ' + rootState + '.scss\n', '');
    destroyState(rootState);
  }

  if (!parentStates.length) return;

  var fullState = rootState;
  parentStates.forEach(function (state) {
    destroyState(fullState += '.' + state);
  });

  function destroyState (stateName) {
    var parents             = stateName.split('.');
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

    templates.destroyFile('app/states/' + statePath + format.toHTMLFileName(stateName));
    templates.destroyFile('app/states/' + statePath + format.toJSFileName(stateName + '.controller'));
    var state = new RegExp("\\s*\\.state\\('" + fullStateName + "', \\{(?:\\s|.)*\\}\\)\\n");
    templates.modifyFile('app/config/routes/' + format.toJSFileName(rootState), state, '\n');
    templates.destroyFile('test/unit/controllers/' + statePath + format.toJSFileName(stateName + '.controller.spec'));
    templates.destroyDirectoryIfEmpty('app/states/' + statePath);
    templates.destroyDirectoryIfEmpty('test/unit/controllers/' + statePath);
    logger.log('');
  }
};
