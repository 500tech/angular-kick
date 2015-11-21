'use strict';

// This file defines the paths to templates used by generators

const ROOT = __dirname + '/../templates';

const ANGULAR_PATHS = {
  directive: '/directive.js',
  directiveWithTemplate: '/directive-with-template.js',
  directiveTemplate: '/directive-template.html',
  component: '/component.js',
  componentTemplate: '/component-template.html',
  filter: '/filter.js',
  partial: '/partial.html',
  partialWithController: '/partial-with-controller.html',
  controller: '/controller.js',
  service: '/service.js',
  serviceFactory: '/service-factory.js',
  model: '/model.js',
  modelFactory: '/model-factory.js',
  stateView: '/state/state.html',
  stateController: '/state/state-controller.js',
  stateRoute: '/state/route.js',
  stateStylesheet: '/state/stylesheet.scss',
  nestedRoute: '/state/nested-route.js',
  testMock: '/test/mock.js',
  testControllerUnit: '/test/controller-unit-spec.js',
  testDirectiveUnit: '/test/directive-unit-spec.js',
  testComponentUnit: '/test/component-unit-spec.js',
  testFilterUnit: '/test/filter-unit-spec.js',
  testServiceUnit: '/test/service-unit-spec.js',
  testServiceFactoryUnit: '/test/service-factory-unit-spec.js',
  testModelUnit: '/test/model-unit-spec.js',
  testModelFactoryUnit: '/test/model-factory-unit-spec.js',
  config: '/config.js'
};

// TODO: Kick will have an option to support other frameworks later
module.exports = class TemplatePaths {

  static angular(template) {
    return `${ROOT}/angular${ANGULAR_PATHS[template]}`;
  }

};
