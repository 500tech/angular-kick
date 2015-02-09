"use strict";

var fs        = require('fs-extra');
var format    = require('./../formatters');
var templates = require('../templates');

module.exports = function (name, noController, abstract) {
  name = format.checkName('state', name);
  if (!name) return;

  var parentStates  = name.split('/');
  var rootState     = format.toFolderName(parentStates.shift());

  if (!fs.existsSync('app/config/routes/' + format.toJSFileName(rootState))) {
    templates.createFile('app/config/routes/' + format.toJSFileName(rootState), templates.stateRoute());
    templates.createFile('app/assets/stylesheets/' + format.toSCSSFileName(rootState), templates.stateStylesheet());
    templates.appendToFile('app/assets/stylesheets/application.scss', '@import "' + rootState + '";\n');
    generateState(rootState);
  }

  if (!parentStates.length) return;

  var fullState = rootState;
  parentStates.forEach(function (state) {
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

    if (fs.existsSync('app/states/' + statePath + format.toHTMLFileName(stateName))) return;

    templates.createDirectory('app/states/' + statePath);
    templates.createFile('app/states/' + statePath + format.toHTMLFileName(stateName),
      templates.stateView({
        stateControllerName: stateControllerName
      })
    );

    if (!noController) {
      templates.createFile('app/states/' + statePath + format.toJSFileName(stateName + '.controller'),
        templates.stateController({
          stateName: stateName,
          stateControllerName: stateControllerName
        })
      );
    }

    templates.modifyFile('app/config/routes/' + format.toJSFileName(rootState), '});',
      templates.nestedRoute({
        fullStateName: fullStateName,
        stateURL: stateURL,
        statePath: statePath + stateName,
        stateControllerName: stateControllerName,
        noController: noController,
        abstract: abstract
      })
    );

    if (!noController) {
      templates.createDirectory('test/unit/controllers/' + statePath);
      templates.createFile('test/unit/controllers/' + statePath + format.toJSFileName(stateName + '.controller.spec'),
        templates.testControllerUnit({
          controllerName: format.toControllerName(stateControllerName),
          controllerVarName: format.toControllerVarName(stateControllerName)
        })
      );
    }
    console.log('');
  }
};
