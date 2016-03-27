'use strict';

const FSUtils     = require('../../lib/fs-utils');
const TestHelpers = require('../support/helpers');

const fs            = require('fs-extra');
const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick generate', () => {

  beforeEach(TestHelpers.createApp);
  afterEach(TestHelpers.cleanup);

  it('should ask what to generate', () => {
    const output = child_process.execSync(kick + 'generate');

    expect(output).toMatch("What do you want to generate?");
  });

  it('should generate config', () => {
    child_process.execSync(kick + 'generate config example');
    const configFile = TestHelpers.getFile('app/config/example.js');

    expect(configFile).toMatch('NpmTest.config');
  });

  it('should generate directive', () => {
    child_process.execSync(kick + 'generate directive example');
    const file = TestHelpers.getFile('app/directives/example.js');
    const specFile = TestHelpers.getFile('test/unit/directives/example.spec.js');

    expect(file).toMatch("export function example");
    expect(specFile).toMatch("describe\\('example Directive'");
  });

  it('should generate directive with template', () => {
    child_process.execSync(kick + 'generate directive example --template');
    const file = TestHelpers.getFile('app/directives/example.js');
    const template = TestHelpers.getFile('app/directives/example.html');
    const directivesFile = TestHelpers.getFile('app/directives/directives.js');
    const specFile = TestHelpers.getFile('test/unit/directives/example.spec.js');

    expect(file).toMatch("export function example");
    expect(file).toMatch("templateUrl: '\/directives\/example\\.html',");
    expect(template).toMatch("<div>example Directive</div>");
    expect(directivesFile).toMatch(".directive\\('example', example\\);");
    expect(specFile).toMatch("describe\\('example Directive'");
  });

  it('should generate component', () => {
    child_process.execSync(kick + 'generate component example --template');
    const file = TestHelpers.getFile('app/components/example/example.js');
    const template = TestHelpers.getFile('app/components/example/example.html');
    const componentsFile  = TestHelpers.getFile('app/components/components.js');
    const specFile = TestHelpers.getFile('test/unit/components/example/example.spec.js');

    expect(file).toMatch("export const example");
    expect(file).toMatch("templateUrl: '/components/example/example\\.html',");
    expect(template).toMatch("<div>example Component</div>");
    expect(componentsFile).toMatch(".component\\('example', example\\);");
    expect(specFile).toMatch("describe\\('example Component'");
  });

  it('should generate environment', () => {
    child_process.execSync(kick + 'generate environment example');
    const environments = JSON.parse(TestHelpers.getFile('environments.json'));

    expect(environments.example.ENV).toBe("example");
  });

  it('should generate filter', () => {
    child_process.execSync(kick + 'generate filter example');
    const file = TestHelpers.getFile('app/filters/example.js');
    const filters  = TestHelpers.getFile('app/filters/filters.js');
    const specFile = TestHelpers.getFile('test/unit/filters/example.spec.js');

    expect(file).toMatch("export \\/\\* @ngInject \\*\\/ function example\\(\\)");
    expect(filters).toMatch("import { example } from './example'");
    expect(filters).toMatch("\\.filter\\('example', example\\)");
    expect(specFile).toMatch("describe\\('example Filter'");
  });

  it('should generate model', () => {
    child_process.execSync(kick + 'generate model example');
    const file = TestHelpers.getFile('app/models/example.js');
    const models   = TestHelpers.getFile('app/models/models.js');
    const specFile = TestHelpers.getFile('test/unit/models/example.spec.js');

    expect(file).toMatch("class Example");
    expect(models).toMatch("import { Example } from './example'");
    expect(models).toMatch("\\.service\\('Example', Example\\)");
    expect(specFile).toMatch("describe\\('Example Model'");
  });

  it('should generate partial', () => {
    child_process.execSync(kick + 'generate partial example');
    const file = TestHelpers.getFile('app/partials/_example.html');

    expect(file).toMatch("<div>states/_example.html</div>");
  });

  it('should generate partial with controller', () => {
    child_process.execSync(kick + 'generate partial example_2 --controller');
    const controller = TestHelpers.getFile('app/partials/_example-2.js');

    expect(controller).toMatch("class Example2Controller");
  });

  it('should generate service', () => {
    child_process.execSync(kick + 'generate service example');
    const file = TestHelpers.getFile('app/services/example.js');
    const services = TestHelpers.getFile('app/services/services.js');
    const specFile = TestHelpers.getFile('test/unit/services/example.spec.js');

    expect(file).toMatch("class Example");
    expect(services).toMatch("import { Example } from './example'");
    expect(services).toMatch("\\.service\\('Example', Example\\)");
    expect(specFile).toMatch("describe\\('Example Service'");
  });

  it('should generate state', () => {
    child_process.execSync(kick + 'generate state example');
    const route       = TestHelpers.getFile('app/config/routes/example.js');
    const routesFile  = TestHelpers.getFile('app/config/routes/routes.js');
    const statesFile  = TestHelpers.getFile('app/states/states.js');
    const style       = FSUtils.exists('app/assets/stylesheets/example.scss');
    const mainStyle   = TestHelpers.getFile('app/assets/stylesheets/application.scss');
    const view        = TestHelpers.getFile('app/states/example/example.html');
    const controller  = TestHelpers.getFile('app/states/example/example.js');
    const spec        = TestHelpers.getFile('test/unit/controllers/example/example.spec.js');

    expect(route).toMatch("controller: 'ExampleController'");
    expect(route).toMatch("controllerAs: 'Example'");
    expect(routesFile).toMatch("import { exampleRoutes } from './example';");
    expect(routesFile).toMatch("\\.config\\(exampleRoutes\\)");
    expect(statesFile).toMatch("import { ExampleController } from './example/example");
    expect(statesFile).toMatch(".controller\\('ExampleController', ExampleController\\);");
    expect(style).toBeTruthy();
    expect(mainStyle).toMatch('@import "example";');
    expect(view).toMatch("<ui-view></ui-view>");
    expect(controller).toMatch("class ExampleController");
    expect(spec).toMatch("describe\\('ExampleController'");
  });

  it('should generate abstract state', () => {
    child_process.execSync(kick + 'generate state example_2 --abstract');
    const route = TestHelpers.getFile('app/config/routes/example-2.js');

    expect(route).toMatch("abstract: true");
  });

  it('should generate state without controller', () => {
    child_process.execSync(kick + 'generate state abs_example_3 --no-controller');
    const route = TestHelpers.getFile('app/config/routes/abs-example-3.js');

    expect(route).not.toMatch("controller: 'ExampleController as Example'");
  });

  it('should generate style', () => {
    child_process.execSync(kick + 'generate style example');
    const file = FSUtils.exists('app/assets/stylesheets/example.scss');
    const mainFile = TestHelpers.getFile('app/assets/stylesheets/application.scss');

    expect(file).toBeTruthy();
    expect(mainFile).toMatch('@import "example";');
  });
});

