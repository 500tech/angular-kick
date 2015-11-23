'use strict';

const FSUtils     = require('../../lib/fs-utils');
const TestHelpers = require('../support/helpers');

const child_process = require('child_process');
const kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick destroy', () => {

  beforeAll(TestHelpers.createApp);
  afterAll(TestHelpers.cleanup);

  it('should ask what to destroy', () => {
    const process = child_process.execSync(kick + 'destroy');

    expect(process).toMatch("What do you want to destroy?");
  });

  it('should destroy config', () => {
    child_process.execSync(kick + 'generate config example');
    child_process.execSync(kick + 'destroy config example');

    expect(FSUtils.exists('app/config/example.js')).toBeFalsy();
  });

  it('should destroy directive', () => {
    child_process.execSync(kick + 'generate directive example');
    child_process.execSync(kick + 'destroy directive example');

    expect(FSUtils.exists('app/directives/example.js')).toBeFalsy();
    expect(FSUtils.exists('test/unit/directives/example.spec.js')).toBeFalsy();
  });

  it('should destroy directive with template', () => {
    child_process.execSync(kick + 'generate directive example --template');
    child_process.execSync(kick + 'destroy directive example');

    expect(FSUtils.exists('app/directives/example.js')).toBeFalsy();
    expect(FSUtils.exists('app/directives/example.html')).toBeFalsy();
    expect(FSUtils.exists('test/unit/directives/example.spec.js')).toBeFalsy();
  });

  it('should destroy component', () => {
    child_process.execSync(kick + 'generate component example --template');
    child_process.execSync(kick + 'destroy component example');

    expect(FSUtils.exists('app/components/example/example.js')).toBeFalsy();
    expect(FSUtils.exists('app/components/example/example.html')).toBeFalsy();
    expect(FSUtils.exists('test/unit/components/example/example.spec.js')).toBeFalsy();
  });

  it('should destroy environment', () => {
    child_process.execSync(kick + 'generate environment example');
    child_process.execSync(kick + 'destroy environment example');
    const file = TestHelpers.getFile('environments.json');

    expect(file).not.toMatch('"ENV": "example"');
  });

  it('should destroy filter', () => {
    child_process.execSync(kick + 'generate filter example');
    child_process.execSync(kick + 'destroy filter example');

    expect(FSUtils.exists('app/filters/example.js')).toBeFalsy();
    expect(FSUtils.exists('test/unit/filters/example.spec.js')).toBeFalsy();
  });

  it('should destroy model', () => {
    child_process.execSync(kick + 'generate model example');
    child_process.execSync(kick + 'destroy model example');

    expect(FSUtils.exists('app/models/example.js')).toBeFalsy();
    expect(FSUtils.exists('test/unit/models/example.spec.js')).toBeFalsy();
  });

  it('should destroy partial', () => {
    child_process.execSync(kick + 'generate partial example');
    child_process.execSync(kick + 'destroy partial example');

    expect(FSUtils.exists('app/partials/_example.html')).toBeFalsy();
  });

  it('should destroy partial with controller', () => {
    child_process.execSync(kick + 'generate partial example_2 --controller');
    child_process.execSync(kick + 'destroy partial example_2');

    expect(FSUtils.exists('app/partials/_example-2.html')).toBeFalsy();
    expect(FSUtils.exists('app/partials/_example-2.js')).toBeFalsy();
    expect(FSUtils.exists('test/units/controllers/_example-2.spec.js')).toBeFalsy();
  });

  it('should destroy service', () => {
    child_process.execSync(kick + 'generate service example');
    child_process.execSync(kick + 'destroy service example');

    expect(FSUtils.exists('app/services/example.js')).toBeFalsy();
    expect(FSUtils.exists('test/unit/services/example.spec.js')).toBeFalsy();
  });

  it('should destroy state', () => {
    child_process.execSync(kick + 'generate state example');
    child_process.execSync(kick + 'destroy state example');
    const mainStyle = TestHelpers.getFile('app/assets/stylesheets/application.scss');

    expect(FSUtils.exists('app/config/routes/example.js')).toBeFalsy();
    expect(FSUtils.exists('app/assets/stylesheets/example.scss')).toBeFalsy();
    expect(mainStyle).not.toMatch('@import "example";');
    expect(FSUtils.exists('app/states/example/example.html')).toBeFalsy();
    expect(FSUtils.exists('app/states/example/example.js')).toBeFalsy();
    expect(FSUtils.exists('test/unit/controllers/example/example.spec.js')).toBeFalsy();
  });

  it('should destroy style', () => {
    child_process.execSync(kick + 'generate style example');
    child_process.execSync(kick + 'destroy style example');
    const mainFile = TestHelpers.getFile('app/assets/stylesheets/application.scss');

    expect(FSUtils.exists('app/assets/stylesheets/example.scss')).toBeFalsy();
    expect(mainFile).not.toMatch('@import "example";');
  });
});
