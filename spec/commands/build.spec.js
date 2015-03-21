var fs            = require('fs-extra');
var child_process = require('child_process');
var kick          = 'node ' + __dirname + '/../../bin/kick ';

describe('$ kick build', function () {

  beforeAll(function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  afterAll(function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });

  it('should not run without packages', function () {
    var output = child_process.execSync(kick + 'build').toString();

    expect(output).toMatch("Can't start server with missing packages");
  });

  it('should run gulp build task', function () {
    fs.ensureDirSync('node_modules');
    fs.ensureDirSync('jspm_packages');
    var output = child_process.execSync(kick + 'build', { timeout: 5000 }).toString();

    expect(output).toMatch("Building application");
  });
});
