"use strict";

const Utils         = require('./utils');
const TemplatePaths = require('./template_paths');
const fs            = require('fs-extra');

function angularTemplate(type, locals) {
  return Utils.replaceInFile(TemplatePaths.angular(type), locals);
}

module.exports = class Templates {

  static directive(locals /* { directiveName } */) {
    return angularTemplate('directive', locals);
  }

  static directiveWithTemplate(locals /* { directiveName, directiveTemplateUrl } */) {
    return angularTemplate('directiveWithTemplate', locals);
  }

  static directiveTemplate(locals /* { directiveName } */) {
    return angularTemplate('directiveTemplate', locals);
  }

  static component(locals /* { componentName } */) {
    return angularTemplate('component', locals);
  }

  static componentTemplate(locals /* { componentName } */) {
    return angularTemplate('componentTemplate', locals);
  }

  static filter(locals /* { filterName } */) {
    return angularTemplate('filter', locals);
  }

  static partial(locals /* { partialPath } */) {
    locals.partialPath = 'states/' + locals.partialPath;

    return angularTemplate('partial', locals);
  }

  static partialWithController(locals /* { partialPath, partialName, controllerName } */) {
    locals.partialPath = 'states/' + locals.partialPath;

    return angularTemplate('partialWithController', locals);
  }

  static controller(locals /* { controllerName, controllerVariable } */) {
    return angularTemplate('controller', locals);
  }

  static service(locals /* { serviceName } */) {
    return angularTemplate('service', locals);
  }

  static model(locals /* { modelName } */) {
    return angularTemplate('model', locals);
  }

  static stateView(locals /* { stateControllerName } */) {
    return angularTemplate('stateView', locals);
  }

  static stateController(locals /* { stateName, stateControllerName } */) {
    return angularTemplate('stateController', locals);
  }

  static stateRoute(locals /* { stateName } */) {
    return angularTemplate('stateRoute', locals);
  }

  static stateStylesheet() {
    return angularTemplate('stateStylesheet', {});
  }

  static nestedRoute(locals) {
    let routeFile = angularTemplate('nestedRoute', {
      fullStateName: locals.fullStateName,
      stateURL: locals.stateURL,
      statePath: locals.statePath,
      stateControllerName: locals.stateControllerName
    });

    if (!locals.abstract) { routeFile = routeFile.replace('abstract: true,\n      ', ''); }
    if (locals.noController) { routeFile = routeFile.replace(/,\n\s*controller:.*\n/, '\n'); }

    return routeFile;
  }

  static testMock() {
    return angularTemplate('testMock', {});
  }

  static testControllerUnit(locals /* { controllerName, controllerVarName } */) {
    return angularTemplate('testControllerUnit', locals);
  }

  static testDirectiveUnit(locals /* { directiveName, directiveTagName } */) {
    return angularTemplate('testDirectiveUnit', locals);
  }

  static testComponentUnit(locals /* { componentName } */) {
    return angularTemplate('testComponentUnit', locals);
  }

  static testFilterUnit(locals /* { filterName } */) {
    return angularTemplate('testFilterUnit', locals);
  }

  static testServiceUnit(locals /* { serviceName } */) {
    return angularTemplate('testServiceUnit', locals);
  }

  static testModelUnit(locals /* { modelName } */) {
    return angularTemplate('testModelUnit', locals);
  }

  static config() {
    return angularTemplate('config', {});
  }
};
