var helpers       = require('../support/helpers');
var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick generate', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should ask what to generate', function () {
    var output = child_process.execSync(kick + 'generate');

    expect(output).toMatch("What do you want to generate?");
  });

  it('should generate config', function () {
    child_process.execSync(kick + 'generate config example');
    var configFile = helpers.getFile('app/config/example.js');

    expect(configFile).toMatch('NpmTest.config');
  });

  it('should generate directive', function () {
    child_process.execSync(kick + 'generate directive example');
    var file = helpers.getFile('app/directives/example.js');
    var specFile = helpers.getFile('test/unit/directives/example.spec.js');

    expect(file).toMatch("export function example");
    expect(specFile).toMatch("describe\\('example Directive'");
  });

  it('should generate directive with template', function () {
    child_process.execSync(kick + 'generate directive example --template');
    var file = helpers.getFile('app/directives/example.js');
    var template = helpers.getFile('app/directives/example.html');
    var specFile = helpers.getFile('test/unit/directives/example.spec.js');

    expect(file).toMatch("export function example");
    expect(file).toMatch("templateUrl: require\\('directives/example\\.html'\\)");
    expect(template).toMatch("<div>example Directive</div>");
    expect(specFile).toMatch("describe\\('example Directive'");
  });
  
  it('should generate environment', function () {
    child_process.execSync(kick + 'generate environment example');
    var file = helpers.getFile('environments.json');

    expect(file).toMatch('"ENV":"example"');
  });
   
  it('should generate filter', function () {
    child_process.execSync(kick + 'generate filter example');
    var file = helpers.getFile('app/filters/example.js');
    var filters  = helpers.getFile('app/filters/filters.js');
    var specFile = helpers.getFile('test/unit/filters/example.spec.js');

    expect(file).toMatch("export function example\\(input\\)");
    expect(filters).toMatch("import { example } from './example'");
    expect(filters).toMatch("\\.filter\\('example', example\\)");
    expect(specFile).toMatch("describe\\('example Filter'");
  });

  it('should generate model', function () {
    child_process.execSync(kick + 'generate model example');
    var file = helpers.getFile('app/models/example.js');
    var models   = helpers.getFile('app/models/models.js');
    var specFile = helpers.getFile('test/unit/models/example.spec.js');

    expect(file).toMatch("class Example");
    expect(models).toMatch("import { Example } from './example'");
    expect(models).toMatch("\\.service\\('Example', Example\\)");
    expect(specFile).toMatch("describe\\('Example Model'");
  });

  it('should generate partial', function () {
    child_process.execSync(kick + 'generate partial example');
    var file = helpers.getFile('app/layouts/shared/_example.html');

    expect(file).toMatch("<div>states/shared/_example.html</div>");
  });

  it('should generate partial with controller', function () {
    child_process.execSync(kick + 'generate partial example_2 --controller');
    var controller = helpers.getFile('app/layouts/shared/_example_2.js');

    expect(controller).toMatch("class Example2Controller");
  });

  it('should generate service', function () {
    child_process.execSync(kick + 'generate service example');
    var file = helpers.getFile('app/services/example.js');
    var services = helpers.getFile('app/services/services.js');
    var specFile = helpers.getFile('test/unit/services/example.spec.js');

    expect(file).toMatch("class Example");
    expect(services).toMatch("import { Example } from './example'");
    expect(services).toMatch("\\.service\\('Example', Example\\)");
    expect(specFile).toMatch("describe\\('Example Service'");
  });

  it('should generate state', function () {
    child_process.execSync(kick + 'generate state example');
    var route       = helpers.getFile('app/config/routes/example.js');
    var routesFile  = helpers.getFile('app/config/routes/routes.js');
    var statesFile  = helpers.getFile('app/states/states.js');
    var style       = fs.existsSync('app/assets/stylesheets/example.scss');
    var mainStyle   = helpers.getFile('app/assets/stylesheets/application.scss');
    var view        = helpers.getFile('app/states/example/example.html');
    var controller  = helpers.getFile('app/states/example/example.js');
    var spec        = helpers.getFile('test/unit/controllers/example/example.spec.js');

    expect(route).toMatch("controller: 'ExampleController'");
    expect(route).toMatch("controllerAs: 'Example'");
    expect(routesFile).toMatch("import { exampleRoutes } from './example';");
    expect(routesFile).toMatch("\\.config\\(exampleRoutes\\);");
    expect(statesFile).toMatch("import { ExampleController } from './example/example");
    expect(statesFile).toMatch(".controller\\('ExampleController', ExampleController\\);");
    expect(style).toBeTruthy();
    expect(mainStyle).toMatch('@import "example";');
    expect(view).toMatch("<ui-view></ui-view>");
    expect(controller).toMatch("class ExampleController");
    expect(spec).toMatch("describe\\('ExampleController'");
  });

  it('should generate abstract state', function () {
    child_process.execSync(kick + 'generate state example_2 --abstract');
    var route = helpers.getFile('app/config/routes/example_2.js');

    expect(route).toMatch("abstract: true");
  });

  it('should generate state without controller', function () {
    child_process.execSync(kick + 'generate state abs_example_3 --no-controller');
    var route = helpers.getFile('app/config/routes/abs_example_3.js');

    expect(route).not.toMatch("controller: 'ExampleController as Example'");
  });

  it('should generate style', function () {
    child_process.execSync(kick + 'generate style example');
    var file = fs.existsSync('app/assets/stylesheets/example.scss');
    var mainFile = helpers.getFile('app/assets/stylesheets/application.scss');

    expect(file).toBeTruthy();
    expect(mainFile).toMatch('@import "example";');
  });
});
  
