"use strict";

const Utils         = require('./utils');
const TemplatePaths = require('./template_paths');
const fs            = require('fs-extra');

module.exports = class Templates {

  static directive(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('directive'), {
      directiveName: locals.directiveName
    })
  }

  static directiveWithTemplate(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('directiveWithTemplate'), {
      directiveName: locals.directiveName,
      directiveTemplateUrl: locals.directiveTemplateUrl
    })
  }

  static directiveTemplate(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('directiveTemplate'), {
      directiveName: locals.directiveName
    })
  }

  static filter(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('filter'), {
      filterName: locals.filterName
    })
  }

  static partial(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('partial'), {
      partialPath: 'states/' + locals.partialPath
    })
  }

  static partialWithController(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('partialWithController'), {
      partialPath: 'states/' + locals.partialPath,
      partialName: locals.partialName,
      controllerName: locals.controllerName
    })
  }

  static controller(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('controller'), {
      controllerName: locals.controllerName,
      controllerVariable: locals.controllerVariable
    })
  }

  static service(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('service'), {
      serviceName: locals.serviceName
    })
  }

  static model(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('model'), {
      modelName: locals.modelName
    })
  }

  static stateView(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('stateView'), {
      stateControllerName: locals.stateControllerName
    })
  }

  static stateController(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('stateController'), {
      stateName: locals.stateName,
      stateControllerName: locals.stateControllerName
    })
  }

  static stateRoute(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('stateRoute'), {
      stateName: locals.stateName
    })
  }

  static stateStylesheet() {
    return Utils.replaceInFile(TemplatePaths.angular('stateStylesheet'), {});
  }

  static nestedRoute(locals) {
    let routeFile = Utils.replaceInFile(TemplatePaths.angular('nestedRoute'), {
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
    return Utils.replaceInFile(TemplatePaths.angular('testMock'), {});
  }

  static testControllerUnit(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('testControllerUnit'), {
      controllerName: locals.controllerName,
      controllerVarName: locals.controllerVarName
    })
  }

  static testDirectiveUnit(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('testDirectiveUnit'), {
      directiveName: locals.directiveName,
      directiveTagName: locals.directiveTagName
    })
  }

  static testFilterUnit(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('testFilterUnit'), {
      filterName: locals.filterName
    })
  }

  static testServiceUnit(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('testServiceUnit'), {
      serviceName: locals.serviceName
    })
  }

  static testModelUnit(locals) {
    return Utils.replaceInFile(TemplatePaths.angular('testModelUnit'), {
      modelName: locals.modelName
    })
  }

  static config() {
    return Utils.replaceInFile(TemplatePaths.angular('config'), {})
  }
};
