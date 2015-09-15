var helpers       = require('../support/helpers');
var utils         = require('../../lib/utils');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick destroy', function () {

  beforeAll(helpers.createApp);
  afterAll(helpers.cleanup);

  it('should ask what to destroy', function () {
    var process = child_process.execSync(kick + 'destroy');

    expect(process).toMatch("What do you want to destroy?");
  });

  it('should destroy config', function () {
    child_process.execSync(kick + 'generate config example');
    child_process.execSync(kick + 'destroy config example');

    expect(utils.isFileExist('app/config/example.js')).toBeFalsy();
  });

  it('should destroy directive', function () {
    child_process.execSync(kick + 'generate directive example');
    child_process.execSync(kick + 'destroy directive example');

    expect(utils.isFileExist('app/directives/example.js')).toBeFalsy();
    expect(utils.isFileExist('test/unit/directives/example.spec.js')).toBeFalsy();
  });

  it('should destroy directive with template', function () {
    child_process.execSync(kick + 'generate directive example --template');
    child_process.execSync(kick + 'destroy directive example');

    expect(utils.isFileExist('app/directives/example.js')).toBeFalsy();
    expect(utils.isFileExist('app/directives/example.html')).toBeFalsy();
    expect(utils.isFileExist('test/unit/directives/example.spec.js')).toBeFalsy();
  });

  it('should destroy environment', function () {
    child_process.execSync(kick + 'generate environment example');
    child_process.execSync(kick + 'destroy environment example');
    var file = helpers.getFile('environments.json');

    expect(file).not.toMatch('"ENV": "example"');
  });

  it('should destroy filter', function () {
    child_process.execSync(kick + 'generate filter example');
    child_process.execSync(kick + 'destroy filter example');

    expect(utils.isFileExist('app/filters/example.js')).toBeFalsy();
    expect(utils.isFileExist('test/unit/filters/example.spec.js')).toBeFalsy();
  });

  it('should destroy model', function () {
    child_process.execSync(kick + 'generate model example');
    child_process.execSync(kick + 'destroy model example');

    expect(utils.isFileExist('app/models/example.js')).toBeFalsy();
    expect(utils.isFileExist('test/unit/models/example.spec.js')).toBeFalsy();
  });

  it('should destroy partial', function () {
    child_process.execSync(kick + 'generate partial example');
    child_process.execSync(kick + 'destroy partial example');

    expect(utils.isFileExist('app/layouts/shared/_example.html')).toBeFalsy();
  });

  it('should destroy partial with controller', function () {
    child_process.execSync(kick + 'generate partial example_2 --controller');
    child_process.execSync(kick + 'destroy partial example_2');

    expect(utils.isFileExist('app/layouts/shared/_example_2.html')).toBeFalsy();
    expect(utils.isFileExist('app/layouts/shared/_example_2.js')).toBeFalsy();
    expect(utils.isFileExist('test/units/controllers/shared/_example_2.spec.js')).toBeFalsy();
  });

  it('should destroy service', function () {
    child_process.execSync(kick + 'generate service example');
    child_process.execSync(kick + 'destroy service example');

    expect(utils.isFileExist('app/services/example.js')).toBeFalsy();
    expect(utils.isFileExist('test/unit/services/example.spec.js')).toBeFalsy();
  });

  it('should destroy state', function () {
    child_process.execSync(kick + 'generate state example');
    child_process.execSync(kick + 'destroy state example');
    var mainStyle = helpers.getFile('app/assets/stylesheets/application.scss');

    expect(utils.isFileExist('app/config/routes/example.js')).toBeFalsy();
    expect(utils.isFileExist('app/assets/stylesheets/example.scss')).toBeFalsy();
    expect(mainStyle).not.toMatch('@import "example";');
    expect(utils.isFileExist('app/states/example/example.html')).toBeFalsy();
    expect(utils.isFileExist('app/states/example/example.js')).toBeFalsy();
    expect(utils.isFileExist('test/unit/controllers/example/example.spec.js')).toBeFalsy();
  });

  it('should destroy style', function () {
    child_process.execSync(kick + 'generate style example');
    child_process.execSync(kick + 'destroy style example');
    var mainFile = helpers.getFile('app/assets/stylesheets/application.scss');

    expect(utils.isFileExist('app/assets/stylesheets/example.scss')).toBeFalsy();
    expect(mainFile).not.toMatch('@import "example";');
  });
});
