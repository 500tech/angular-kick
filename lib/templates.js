"use strict";

var fs      = require('fs-extra');
var logger  = require('./logger');
var utils   = require('./utils');
var getPath = require('./template_paths');

module.exports = {
  directive: function (locals) {
    return utils.replaceInFile(getPath('directive'), {
      directiveName: locals.directiveName
    })
  },

  directiveWithTemplate: function (locals) {
    return utils.replaceInFile(getPath('directiveWithTemplate'), {
      directiveName: locals.directiveName,
      directiveTemplateUrl: locals.directiveTemplateUrl
    })
  },

  directiveTemplate: function (locals) {
    return utils.replaceInFile(getPath('directiveTemplate'), {
      directiveName: locals.directiveName
    })
  },

  filter: function (locals) {
    return utils.replaceInFile(getPath('filter'), {
      filterName: locals.filterName
    })
  },

  partial: function (locals) {
    return utils.replaceInFile(getPath('partial'), {
      partialPath: 'states/' + locals.partialPath
    })
  },

  partialWithController: function (locals) {
    return utils.replaceInFile(getPath('partialWithController'), {
      partialPath: 'states/' + locals.partialPath,
      partialName: locals.partialName,
      controllerName: locals.controllerName
    })
  },

  controller: function (locals) {
    return utils.replaceInFile(getPath('controller'), {
      controllerName: locals.controllerName,
      controllerVariable: locals.controllerVariable
    })
  },

  service: function (locals) {
    return utils.replaceInFile(getPath('service'), {
      serviceName: locals.serviceName
    })
  },

  model: function (locals) {
    return utils.replaceInFile(getPath('model'), {
      modelName: locals.modelName
    })
  },

  stateView: function (locals) {
    return utils.replaceInFile(getPath('stateView'), {
      stateControllerName: locals.stateControllerName
    })
  },

  stateController: function (locals) {
    return utils.replaceInFile(getPath('stateController'), {
      stateName: locals.stateName,
      stateControllerName: locals.stateControllerName
    })
  },

  stateRoute: function (locals) {
    return utils.replaceInFile(getPath('stateRoute'), {
      stateName: locals.stateName
    })
  },

  stateStylesheet: function () {
    return utils.replaceInFile(getPath('stateStylesheet'), {});
  },

  nestedRoute: function (locals) {
    var routeFile = utils.replaceInFile(getPath('nestedRoute'), {
      fullStateName: locals.fullStateName,
      stateURL: locals.stateURL,
      statePath: locals.statePath,
      stateControllerName: locals.stateControllerName
    });
    if (!locals.abstract) { routeFile = routeFile.replace('abstract: true,\n      ', ''); }
    if (locals.noController) { routeFile = routeFile.replace(/,\n\s*controller:.*\n/, '\n'); }
    return routeFile;
  },

  testMock: function () {
    return utils.replaceInFile(getPath('testMock'), {});
  },

  testControllerUnit: function (locals) {
    return utils.replaceInFile(getPath('testControllerUnit'), {
      controllerName: locals.controllerName,
      controllerVarName: locals.controllerVarName
    })
  },

  testDirectiveUnit: function (locals) {
    return utils.replaceInFile(getPath('testDirectiveUnit'), {
      directiveName: locals.directiveName,
      directiveTagName: locals.directiveTagName
    })
  },

  testFilterUnit: function (locals) {
    return utils.replaceInFile(getPath('testFilterUnit'), {
      filterName: locals.filterName
    })
  },

  testServiceUnit: function (locals) {
    return utils.replaceInFile(getPath('testServiceUnit'), {
      serviceName: locals.serviceName
    })
  },

  testModelUnit: function (locals) {
    return utils.replaceInFile(getPath('testModelUnit'), {
      modelName: locals.modelName
    })
  },

  config: function () {
    return utils.replaceInFile(getPath('config'), {})
  }
};
