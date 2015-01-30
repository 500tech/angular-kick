"use strict";

var fs      = require('fs-extra');
var logger  = require('./logger');
var ROOT    = require('app-root-path');
var isEmpty = require('empty-dir');
var appName;

if (fs.existsSync('package.json')) {
  appName = JSON.parse(fs.readFileSync('package.json', 'utf8'))['name'];
} else {
  appName = '';
}

module.exports = {
  directive: function (locals) {
    return fs.readFileSync(ROOT + '/templates/directive.js', 'utf8')
      .replace(/%DIRECTIVE_NAME%/g, locals.directiveName)
      .replace(/%APP_NAME%/g, appName);
  },

  filter: function (locals) {
    return fs.readFileSync(ROOT + '/templates/filter.js', 'utf8')
      .replace(/%FILTER_NAME%/g, locals.filterName)
      .replace(/%APP_NAME%/g, appName);
  },

  partial: function (locals) {
    return fs.readFileSync(ROOT + '/templates/partial.html', 'utf8')
      .replace(/%PARTIAL_PATH%/g, 'states/' + locals.partialPath);
  },

  partialWithController: function (locals) {
    return fs.readFileSync(ROOT + '/templates/partial_with_controller.html', 'utf8')
      .replace(/%PARTIAL_PATH%/g, 'states/' + locals.partialPath)
      .replace(/%PARTIAL_NAME%/g, locals.partialName)
      .replace(/%CONTROLLER_NAME%/g, locals.controllerName);
  },

  controller: function (locals) {
    return fs.readFileSync(ROOT + '/templates/controller.js', 'utf8')
      .replace(/%CONTROLLER_NAME%/g, locals.controllerName)
      .replace(/%APP_NAME%/g, appName);
  },

  service: function (locals) {
    return fs.readFileSync(ROOT + '/templates/service.js', 'utf8')
      .replace(/%SERVICE_NAME%/g, locals.serviceName)
      .replace(/%APP_NAME%/g, appName);
  },

  stateView: function (locals) {
    return fs.readFileSync(ROOT + '/templates/state/state.html', 'utf8')
      .replace(/%STATE_CONTROLLER_NAME%/g, locals.stateControllerName);
  },

  stateController: function (locals) {
    return fs.readFileSync(ROOT + '/templates/state/state_controller.js', 'utf8')
      .replace(/%STATE_NAME%/g,             locals.stateName)
      .replace(/%STATE_CONTROLLER_NAME%/g,  locals.stateControllerName)
      .replace(/%APP_NAME%/,                appName);
  },

  stateRoute: function () {
    return fs.readFileSync(ROOT + '/templates/state/route.js', 'utf8')
      .replace(/%APP_NAME%/, appName);
  },

  stateStylesheet: function () {
    return fs.readFileSync(ROOT + '/templates/state/stylesheet.scss', 'utf8');
  },

  nestedRoute: function (locals) {
    var routeFile = fs.readFileSync(ROOT + '/templates/state/nested_route.js', 'utf8')
      .replace(/%FULL_STATE_NAME%/g,        locals.fullStateName)
      .replace(/%STATE_URL%/g,              locals.stateURL)
      .replace(/%STATE_PATH%/g,             locals.statePath)
      .replace(/%STATE_CONTROLLER_NAME%/g,  locals.stateControllerName);
    if (!locals.abstract) { routeFile = routeFile.replace('abstract: true,\n      ', ''); }
    if (locals.noController) { routeFile = routeFile.replace(/,\n\s*controller:.*\n/, '\n'); }
    return routeFile;
  },

  testMock: function () {
    return fs.readFileSync(ROOT + '/templates/test/mock.js', 'utf8');
  },

  testControllerUnit: function (locals) {
    return fs.readFileSync(ROOT + '/templates/test/controller_unit_spec.js', 'utf8')
      .replace(/%CONTROLLER_NAME%/g, locals.controllerName)
      .replace(/%CONTROLLER_VAR_NAME%/g, locals.controllerVarName)
      .replace(/%APP_NAME%/g, appName);
  },

  testDirectiveUnit: function (locals) {
    return fs.readFileSync(ROOT + '/templates/test/directive_unit_spec.js', 'utf8')
      .replace(/%DIRECTIVE_NAME%/g, locals.directiveName)
      .replace(/%DIRECTIVE_TAG_NAME%/g, locals.directiveTagName)
      .replace(/%APP_NAME%/g, appName);
  },

  testFilterUnit: function (locals) {
    return fs.readFileSync(ROOT + '/templates/test/filter_unit_spec.js', 'utf8')
      .replace(/%FILTER_NAME%/g, locals.filterName)
      .replace(/%APP_NAME%/g, appName);
  },

  testServiceUnit: function (locals) {
    return fs.readFileSync(ROOT + '/templates/test/service_unit_spec.js', 'utf8')
      .replace(/%SERVICE_NAME%/g, locals.serviceName)
      .replace(/%APP_NAME%/g, appName);
  },

  config: function (locals) {
    return fs.readFileSync(ROOT + '/templates/config.js', 'utf8')
      .replace(/%APP_NAME%/g, appName);
  },


  createFile: function (filename, template) {
    logger.create(filename);
    return fs.writeFileSync(filename, template);
  },

  appendToFile: function (filename, string) {
    logger.modify(filename);
    if (fs.readFileSync(filename, 'utf-8').match(/\n/)) {
      return fs.appendFileSync(filename, string);
    } else {
      return fs.appendFileSync(filename, '\n' + string);
    }
  },

  modifyFile: function (filename, pattern, template) {
    if (!fs.existsSync(filename)) return;
    logger.modify(filename);
    return fs.writeFileSync(filename,
      fs.readFileSync(filename, 'utf8')
        .replace(pattern, template));
  },

  createDirectory: function (name) {
    if (!fs.existsSync(name)) logger.mkdir(name);
    return fs.ensureDirSync(name);
  },

  destroyFile: function (filename) {
    if (fs.existsSync(filename)) logger.destroy(filename);
    return fs.deleteSync(filename);
  },

  destroyDirectoryIfEmpty: function (name) {
    if (isEmpty.sync(name)) {
      logger.rmdir(name);
      return fs.deleteSync(name);
    }
  }
};
