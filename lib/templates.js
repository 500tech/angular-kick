"use strict";

var fs      = require('fs-extra');
var logger  = require('./logger');
var utils   = require('./utils');
var ROOT    = __dirname + '/..';

module.exports = {
  directive: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/directive.js', {
      directiveName: locals.directiveName
    })
  },

  directiveWithTemplate: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/directive_with_template.js', {
      directiveName: locals.directiveName,
      directiveTemplateUrl: locals.directiveTemplateUrl
    })
  },

  directiveTemplate: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/directive_template.html', {
      directiveName: locals.directiveName
    })
  },

  filter: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/filter.js', {
      filterName: locals.filterName
    })
  },

  partial: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/partial.html', {
      partialPath: 'states/' + locals.partialPath
    })
  },

  partialWithController: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/partial_with_controller.html', {
      partialPath: 'states/' + locals.partialPath,
      partialName: locals.partialName,
      controllerName: locals.controllerName
    })
  },

  controller: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/controller.js', {
      controllerName: locals.controllerName,
      controllerVariable: locals.controllerVariable
    })
  },

  service: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/service.js', {
      serviceName: locals.serviceName
    })
  },

  model: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/model.js', {
      modelName: locals.modelName
    })
  },

  stateView: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/state/state.html', {
      stateControllerName: locals.stateControllerName
    })
  },

  stateController: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/state/state_controller.js', {
      stateName: locals.stateName,
      stateControllerName: locals.stateControllerName
    })
  },

  stateRoute: function () {
    return utils.replaceInFile(ROOT + '/templates/state/route.js', {})
  },

  stateStylesheet: function () {
    return utils.replaceInFile(ROOT + '/templates/state/stylesheet.scss', {});
  },

  nestedRoute: function (locals) {
    var routeFile = utils.replaceInFile(ROOT + '/templates/state/nested_route.js', {
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
    return utils.replaceInFile(ROOT + '/templates/test/mock.js', {});
  },

  testControllerUnit: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/test/controller_unit_spec.js', {
      controllerName: locals.controllerName,
      controllerVarName: locals.controllerVarName
    })
  },

  testDirectiveUnit: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/test/directive_unit_spec.js', {
      directiveName: locals.directiveName,
      directiveTagName: locals.directiveTagName
    })
  },

  testFilterUnit: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/test/filter_unit_spec.js', {
      filterName: locals.filterName
    })
  },

  testServiceUnit: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/test/service_unit_spec.js', {
      serviceName: locals.serviceName
    })
  },

  testModelUnit: function (locals) {
    return utils.replaceInFile(ROOT + '/templates/test/model_unit_spec.js', {
      modelName: locals.modelName
    })
  },

  config: function () {
    return utils.replaceInFile(ROOT + '/templates/config.js', {})
  },


  createFile: function (filename, template) {
    logger.create(filename);
    return fs.writeFileSync(filename, template);
  },

  appendToFile: function (filename, string) {
    logger.modify(filename);
    if (fs.readFileSync(filename, 'utf-8').match(/\n$/)) {
      return fs.appendFileSync(filename, string);
    } else {
      return fs.appendFileSync(filename, '\n' + string);
    }
  },

  modifyFile: function (filename, pattern, template) {
    if (!fs.existsSync(filename)) { return; }
    logger.modify(filename);
    return fs.writeFileSync(filename,
      fs.readFileSync(filename, 'utf8').replace(pattern, template)
    );
  },

  createDirectory: function (name) {
    if (!fs.existsSync(name)) { logger.mkdir(name); }
    return fs.ensureDirSync(name);
  },

  destroyFile: function (filename) {
    if (fs.existsSync(filename)) { logger.destroy(filename); }
    return fs.deleteSync(filename);
  },

  destroyDirectoryIfEmpty: function (name) {
    if (name.match(/app\/[^\/]*\/$/)) { return; }
    if (name.match(/test\/unit\/[^\/]*\/$/)) { return; }
    if (name.match(/test\/mock\/[^\/]*\/$/)) { return; }
    if (fs.existsSync(name) && utils.isEmptyDir(name)) {
      logger.rmdir(name);
      return fs.deleteSync(name);
    }
  }
};
