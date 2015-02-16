var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = __dirname + '/../../bin/kick ';

describe('$ kick destroy', function () {

  it('SETUP', function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  it('should ask what to destroy', function () {
    var process = child_process.execSync(kick + 'destroy');

    expect(process).toMatch("What do you want to destroy?");
  });

  it('should destroy config', function () {
    child_process.execSync(kick + 'generate config example');
    child_process.execSync(kick + 'destroy config example');

    expect(fs.existsSync('app/config/example.js')).toBeFalsy();
  });

  it('should destroy directive', function () {
    child_process.execSync(kick + 'generate directive example');
    child_process.execSync(kick + 'destroy directive example');

    expect(fs.existsSync('app/directives/example.js')).toBeFalsy();
    expect(fs.existsSync('test/unit/directives/example.spec.js')).toBeFalsy();
  });

  it('should destroy directive with template', function () {
    child_process.execSync(kick + 'generate directive example --template');
    child_process.execSync(kick + 'destroy directive example');

    expect(fs.existsSync('app/directives/example.js')).toBeFalsy();
    expect(fs.existsSync('app/directives/example.html')).toBeFalsy();
    expect(fs.existsSync('test/unit/directives/example.spec.js')).toBeFalsy();
  });

  it('should destroy environment', function () {
    child_process.execSync(kick + 'generate environment example');
    child_process.execSync(kick + 'destroy environment example');
    var file = fs.readFileSync('environments.json').toString();

    expect(file).not.toMatch('"ENV": "example"');
  });

  it('should destroy filter', function () {
    child_process.execSync(kick + 'generate filter example');
    child_process.execSync(kick + 'destroy filter example');

    expect(fs.existsSync('app/filters/example.js')).toBeFalsy();
    expect(fs.existsSync('test/unit/filters/example.spec.js')).toBeFalsy();
  });

  it('should destroy model', function () {
    child_process.execSync(kick + 'generate model example');
    child_process.execSync(kick + 'destroy model example');

    expect(fs.existsSync('app/models/example.js')).toBeFalsy();
    expect(fs.existsSync('test/unit/models/example.spec.js')).toBeFalsy();
  });

  it('should destroy partial', function () {
    child_process.execSync(kick + 'generate partial example');
    child_process.execSync(kick + 'destroy partial example');

    expect(fs.existsSync('app/layouts/shared/_example.html')).toBeFalsy();
  });

  it('should destroy partial with controller', function () {
    child_process.execSync(kick + 'generate partial example_2 --controller');
    child_process.execSync(kick + 'destroy partial example_2');

    expect(fs.existsSync('app/layouts/shared/_example_2.html')).toBeFalsy();
    expect(fs.existsSync('app/layouts/shared/_example_2.controller.js')).toBeFalsy();
    expect(fs.existsSync('test/units/controllers/shared/_example_2.controller.spec.js')).toBeFalsy();
  });

  it('should destroy service', function () {
    child_process.execSync(kick + 'generate service example');
    child_process.execSync(kick + 'destroy service example');

    expect(fs.existsSync('app/services/example.js')).toBeFalsy();
    expect(fs.existsSync('test/unit/services/example.spec.js')).toBeFalsy();
  });

  it('should destroy state', function () {
    child_process.execSync(kick + 'generate state example');
    child_process.execSync(kick + 'destroy state example');
    var mainStyle = fs.readFileSync('app/assets/stylesheets/application.scss').toString();

    expect(fs.existsSync('app/config/routes/example.js')).toBeFalsy();
    expect(fs.existsSync('app/assets/stylesheets/example.scss')).toBeFalsy();
    expect(mainStyle).not.toMatch('//= include example.scss');
    expect(fs.existsSync('app/states/example/example.html')).toBeFalsy();
    expect(fs.existsSync('app/states/example/example.controller.js')).toBeFalsy();
    expect(fs.existsSync('test/unit/controllers/example/example.controller.spec.js')).toBeFalsy();
  });

  it('should destroy style', function () {
    child_process.execSync(kick + 'generate style example');
    child_process.execSync(kick + 'destroy style example');
    var mainFile = fs.readFileSync('app/assets/stylesheets/application.scss').toString();

    expect(fs.existsSync('app/assets/stylesheets/example.scss')).toBeFalsy();
    expect(mainFile).not.toMatch('//= include example.scss');
  });

  it('TEARDOWN', function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });
});
