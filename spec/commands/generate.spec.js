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
    var configFile = fs.readFileSync('app/config/example.js').toString();

    expect(configFile).toMatch('NpmTest.config');
  });

  it('should generate directive', function () {
    child_process.execSync(kick + 'generate directive example');
    var file = fs.readFileSync('app/directives/example.js').toString();
    var specFile = fs.readFileSync('test/unit/directives/example.spec.js').toString();

    expect(file).toMatch("export function example");
    expect(specFile).toMatch("describe\\('example Directive'");
  });

  it('should generate directive with template', function () {
    child_process.execSync(kick + 'generate directive example --template');
    var file = fs.readFileSync('app/directives/example.js').toString();
    var template = fs.readFileSync('app/directives/example.html').toString();
    var specFile = fs.readFileSync('test/unit/directives/example.spec.js').toString();

    expect(file).toMatch("export function example");
    expect(file).toMatch("templateUrl: require\\('directives/example\\.html'\\)");
    expect(template).toMatch("<div>example Directive</div>");
    expect(specFile).toMatch("describe\\('example Directive'");
  });
  
  it('should generate environment', function () {
    child_process.execSync(kick + 'generate environment example');
    var file = fs.readFileSync('environments.json').toString();

    expect(file).toMatch('"ENV":"example"');
  });
   
  it('should generate filter', function () {
    child_process.execSync(kick + 'generate filter example');
    var file = fs.readFileSync('app/filters/example.js').toString();
    var filters  = fs.readFileSync('app/filters/filters.js').toString();
    var specFile = fs.readFileSync('test/unit/filters/example.spec.js').toString();

    expect(file).toMatch("export function example\\(input\\)");
    expect(filters).toMatch("import { example } from './example'");
    expect(filters).toMatch("\\.filter\\('example', example\\)");
    expect(specFile).toMatch("describe\\('example Filter'");
  });

  it('should generate model', function () {
    child_process.execSync(kick + 'generate model example');
    var file = fs.readFileSync('app/models/example.js').toString();
    var models   = fs.readFileSync('app/models/models.js').toString();
    var specFile = fs.readFileSync('test/unit/models/example.spec.js').toString();

    expect(file).toMatch("class Example");
    expect(models).toMatch("import { Example } from './example'");
    expect(models).toMatch("\\.service\\('Example', Example\\)");
    expect(specFile).toMatch("describe\\('Example Model'");
  });

  it('should generate partial', function () {
    child_process.execSync(kick + 'generate partial example');
    var file = fs.readFileSync('app/layouts/shared/_example.html').toString();

    expect(file).toMatch("<div>states/shared/_example.html</div>");
  });

  it('should generate partial with controller', function () {
    child_process.execSync(kick + 'generate partial example_2 --controller');
    var controller = fs.readFileSync('app/layouts/shared/_example_2.js').toString();

    expect(controller).toMatch("class Example2Controller");
  });

  it('should generate service', function () {
    child_process.execSync(kick + 'generate service example');
    var file = fs.readFileSync('app/services/example.js').toString();
    var services = fs.readFileSync('app/services/services.js').toString();
    var specFile = fs.readFileSync('test/unit/services/example.spec.js').toString();

    expect(file).toMatch("class Example");
    expect(services).toMatch("import { Example } from './example'");
    expect(services).toMatch("\\.service\\('Example', Example\\)");
    expect(specFile).toMatch("describe\\('Example Service'");
  });

  it('should generate state', function () {
    child_process.execSync(kick + 'generate state example');
    var route       = fs.readFileSync('app/config/routes/example.js').toString();
    var routesFile  = fs.readFileSync('app/config/routes/routes.js').toString();
    var statesFile  = fs.readFileSync('app/states/states.js').toString();
    var style       = fs.existsSync('app/assets/stylesheets/example.scss');
    var mainStyle   = fs.readFileSync('app/assets/stylesheets/application.scss').toString();
    var view        = fs.readFileSync('app/states/example/example.html').toString();
    var controller  = fs.readFileSync('app/states/example/example.js').toString();
    var spec        = fs.readFileSync('test/unit/controllers/example/example.spec.js').toString();

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
    var route = fs.readFileSync('app/config/routes/example_2.js').toString();

    expect(route).toMatch("abstract: true");
  });

  it('should generate state without controller', function () {
    child_process.execSync(kick + 'generate state abs_example_3 --no-controller');
    var route = fs.readFileSync('app/config/routes/abs_example_3.js').toString();

    expect(route).not.toMatch("controller: 'ExampleController as Example'");
  });

  it('should generate style', function () {
    child_process.execSync(kick + 'generate style example');
    var file = fs.existsSync('app/assets/stylesheets/example.scss');
    var mainFile = fs.readFileSync('app/assets/stylesheets/application.scss').toString();

    expect(file).toBeTruthy();
    expect(mainFile).toMatch('@import "example";');
  });
});
  
